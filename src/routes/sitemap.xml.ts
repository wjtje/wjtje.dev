import { BaseURL } from '$lib/common';
import { locales, defaultLocale } from '$lib/i18n';

interface page {
	loc: string;
	priority: string;
}

const pages: page[] = [
	{ loc: '/', priority: '1.0' },
	{ loc: '/projects', priority: '0.7' },
	{ loc: '/contact', priority: '0.5' },
	{ loc: '/notice', priority: '0.1' }
];

/**
 * This will return a map of all the different pages of this website with every locale defined
 */

/** @type {import(`./sitemap.xml`).RequestHandler} */
export async function get() {
	return {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		},
		body: `<?xml version="1.0" encoding="UTF-8" ?><urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="https://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml" xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="https://www.google.com/schemas/sitemap-image/1.1" xmlns:video="https://www.google.com/schemas/sitemap-video/1.1">${pages
			.map(
				(page) =>
					`<url><loc>${BaseURL}${defaultLocale}${page.loc}</loc><priority>${
						page.priority
					}</priority>${locales
						.get()
						.map(
							(locale) =>
								`<xhtml:link rel="alternate" hreflang="${locale}" href="${BaseURL}${locale}${page.loc}" />`
						)
						.join('')}</url>`
			)
			.join('')}</urlset>`
	};
}
