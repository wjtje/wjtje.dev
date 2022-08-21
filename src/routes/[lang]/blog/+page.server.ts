import { prisma } from '$lib/prisma';
import type { Language } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	// Get all the posts
	// TODO: Pagination
	const posts = await prisma.post.findMany({
		take: 10,
		where: {
			published: true,
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
		}))
	};
};
