import { prisma } from '$lib/prisma';
import type { Language } from '@prisma/client';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const pageLength = 10;

	const totalItems = await prisma.page.count({
		where: {
			visible: true,
			pageType: 'BLOG',
			language: params.lang.toUpperCase() as Language
		}
	});

	const totalPages = Math.ceil(totalItems / pageLength);

	// If the page is out of range, throw a 404, unless it's the first page
	if (parseInt(params.page) > totalPages && parseInt(params.page) !== 1) {
		throw error(404, 'Page not found');
	}

	// Get all the posts
	const posts = await prisma.page.findMany({
		take: pageLength,
		skip: (parseInt(params.page) - 1) * pageLength,
		where: {
			visible: true,
			pageType: 'BLOG',
			language: params.lang.toUpperCase() as Language
		},
		orderBy: {
			createdAt: 'desc'
		},
		select: {
			title: true,
			createdAt: true,
			preview: true,
			slug: true
		}
	});

	// This changes the Date object to a String to keep svelte kit happy
	return {
		posts: posts.map((post) => ({
			...post,
			createdAt: post.createdAt.toISOString()
		})),
		totalPages,
		currentPage: parseInt(params.page)
	};
};
