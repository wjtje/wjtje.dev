import { prisma } from '$lib/prisma';
import type { Language } from '@prisma/client';
import type { RequestHandler } from './__types/index';

export const GET: RequestHandler = async ({ params }) => {
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

	return {
		status: 200,
		body: {
			posts: posts
		}
	};
};
