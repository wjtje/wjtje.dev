import { prisma } from '$lib/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const page = await prisma.page.findUnique({
		where: {
			slug_language: {
				slug: `${params.owner}/${params.project}`,
				language: 'EN'
			}
		}
	});
	// Check whether the page exists, if not return a 404 error
	if (!page) {
		console.log(
			`[projects/[owner]/[project]/+page.server.ts]: Page ${params.project} does not exist`
		);
		throw error(404, 'Page not found');
	} else {
		return {
			...page,
			createdAt: page.createdAt.toISOString(),
			body: atob(page.body),
			repo: {
				name: params.project,
				owner: params.owner
			}
		};
	}
};
