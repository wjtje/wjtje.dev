import { defaultLocale, locales } from '$lib/i18n';
import type { Handle } from '@sveltejs/kit';

const routeRegex = new RegExp(/^\/[^.]*([?#].*)?$/);

export const handle: Handle = async ({ event, resolve }) => {
	const { url, request } = event;
	const { pathname } = url;

	// If this request is a route request
	if (routeRegex.test(pathname) && !pathname.startsWith('/api')) {
		// Get defined locales
		const supportedLocales = locales.get();

		// Try to get locale from `pathname`.
		let locale = supportedLocales.find(
			(l) => l === `${pathname.match(/[^/]+?(?=\/|$)/)}`.toLowerCase()
		);

		// If route locale is not supported
		if (!locale) {
			// Get user preferred locale
			locale = `${`${request.headers['accept-language']}`.match(
				/[a-zA-Z]+?(?=-|_|,|;)/
			)}`.toLowerCase();

			// Set default locale if user preferred locale does not match
			if (!supportedLocales.includes(locale)) locale = defaultLocale;

			// 301 redirect
			return new Response(undefined, {
				headers: { location: `/${locale}${pathname}` },
				status: 301
			});
		}

		// Redirect blog to first page
		if (pathname.endsWith('/blog') || pathname.endsWith('/blog/')) {
			return new Response(undefined, {
				headers: { location: `/${locale}/blog/1` },
				status: 301
			});
		}

		// Add html `lang` attribute
		const response = await resolve(event);
		const body = await response.text();

		if (!response || !body) {
			console.warn('[hooks.ts]: Empty response');
		} else {
			if (pathname.endsWith('/418')) {
				return new Response(body, {
					status: 418,
					headers: {
						...response.headers,
						'content-type': 'text/html'
					}
				});
			} else {
				return new Response(`${body}`.replace(/<html.*>/, `<html lang="${locale}">`), response);
			}
		}
	}

	return resolve(event);
};
