import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const page = await prisma.page.findUnique({
		where: {
			slug_language: {
				slug: params.project,
				language: 'EN'
			}
		}
	});
	// Check whether the page exists, if not return an auto-generated description page
	if (!page) {
		console.log(`[projects/[project]/+page.server.ts]: Page ${params.project} does not exist`);

		// TODO: Won't work if a user has to repos with the same name, through editing rights
		const repo = await prisma.githubRepo.findFirstOrThrow({
			where: {
				name: params.project
			}
		});
		// Body is readme contents, description if empty, or a default message
		const body = repo.readMe || repo.description || 'No description available';
		return {
			title: repo.name,
			createdAt: repo.updatedAt.toISOString(),
			body
		};
	} else {
		return {
			...page,
			createdAt: page.createdAt.toISOString(),
			body: atob(page.body)
		};
	}
};
