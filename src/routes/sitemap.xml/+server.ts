import { locales, defaultLocale } from '$lib/i18n';
import type { RequestHandler } from './$types';

interface page {
	loc: string;
	priority: string;
}

const pages: page[] = [
	{ loc: '/', priority: '1.0' },
	{ loc: '/projects', priority: '0.7' },
	{ loc: '/blog', priority: '0.7' },
	{ loc: '/contact', priority: '0.5' },
	{ loc: '/notice', priority: '0.1' }
];

/**
 * This will return a map of all the different pages of this website with every locale defined
 */

export const GET: RequestHandler = async () => {
	return new Response(
		`<?xml version="1.0" encoding="UTF-8" ?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${pages
			.map(
				(page) =>
					`<url><loc>${process.env['BASE_URL']}${defaultLocale}${page.loc}</loc><priority>${
						page.priority
					}</priority>${locales
						.get()
						.map(
							(locale) =>
								`<xhtml:link rel="alternate" hreflang="${locale}" href="${process.env['BASE_URL']}${locale}${page.loc}" />`
						)
						.join('')}</url>`
			)
			.join('')}</urlset>`,
		{
			headers: {
				'Cache-Control': 'max-age=0, s-maxage=3600',
				'Content-Type': 'application/xml'
			}
		}
	);
};
