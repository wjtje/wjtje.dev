import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const page = await prisma.page.findUniqueOrThrow({
		where: {
			slug_language: {
				slug: params.project,
				language: 'EN'
			}
		}
	});

	return {
		...page,
		createdAt: page.createdAt.toISOString(),
		body: atob(page.body)
	};
};
