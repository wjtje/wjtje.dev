import { prisma } from '$lib/prisma';
import type { Language } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	// Get the post
	const post = await prisma.page.findUnique({
		include: {
			owner: true
		},
		where: {
			slug_language: {
				language: params.lang.toUpperCase() as Language,
				slug: params.slug
			}
		}
	});

	if (!post || !post.visable || post.pageType != 'BLOG') {
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
