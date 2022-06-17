import { prisma } from '$lib/prisma';
import type { RequestHandler } from './__types/index';

export const get: RequestHandler = async () => {
	// Get all the posts
	const posts = await prisma.post.findMany({
		take: 15,
		include: {
			author: true
		}
	});

	return {
		status: 200,
		body: {
			posts: posts
		}
	};
};
