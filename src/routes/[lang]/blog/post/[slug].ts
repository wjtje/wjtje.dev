import { prisma } from '$lib/prisma';
import type { Language } from '@prisma/client';
import type { RequestHandler } from './__types/[slug]';

export const GET: RequestHandler = async ({ params }) => {
	// Get the post
	const post = await prisma.post.findUnique({
		include: {
			author: true
		},
		where: {
			slug_language: {
				language: params.lang.toUpperCase() as Language,
				slug: params.slug
			}
		}
	});

	if (!post || !post.published) {
		return {
			status: 404,
			body: {
				error: 'Not Found'
			}
		};
	}

	return {
		status: 200,
		body: {
			post: {
				...post,
				body: atob(post.body)
			}
		}
	};
};
