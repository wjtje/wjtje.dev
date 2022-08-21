import { prisma } from '$lib/prisma';
import type { Language } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
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
			errors: {
				error: 'Not Found'
			}
		};
	}

	return {
		post: {
			...post,
			createdAt: post.createdAt.toISOString(),
			body: atob(post.body)
		}
	};
};
