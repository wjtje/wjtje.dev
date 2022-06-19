import { locales } from '$lib/i18n';
import { prisma } from '$lib/prisma';
import type { Language } from '@prisma/client';
import type { RequestHandler } from './__types/index';

export const get: RequestHandler = async ({ url }) => {
	const { pathname } = url;
	const supportedLocales = locales.get();

	const locale = supportedLocales.find(
		(l) => l === `${pathname.match(/[^/]+?(?=\/|$)/)}`.toLowerCase()
	);

	// Get all the posts
	const posts = await prisma.post.findMany({
		take: 15,
		include: {
			author: true
		},
		where: {
			published: true,
			language: locale.toUpperCase() as Language
		}
	});

	return {
		status: 200,
		body: {
			posts: posts
		}
	};
};
