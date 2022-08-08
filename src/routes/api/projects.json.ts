import { checkCacheState, updateCacheState } from '$lib/api/helper';
import { GitHubUsername } from '$lib/common';
import type { RequestHandler } from '@sveltejs/kit';
import { getCacheData } from '$lib/api/helper';
import type { GithubRepository } from '$lib/@types/github';
import { prisma } from '$lib/prisma';

export const GET: RequestHandler = async () => {
	// Get information about the cache
	const { id, cacheState } = await checkCacheState('github-repos');

	if (!cacheState) {
		console.log('[github-repos.json.ts]: Updating cache');

		// Get new JSON data from GitHub
		try {
			const response = await fetch(`https://api.github.com/users/${GitHubUsername}/repos`);

			const json: GithubRepository[] = await response.json();

			for (const repo of json) {
				// Check if the repository is a fork, then we need to find out the parent repository
				if (repo.fork) {
					const parent = await fetch(repo.url);

					const parentJson: GithubRepository = await parent.json();

					repo.parent = parentJson.parent;

					console.log(
						'[projects.json.ts] Found full name of parent ' + parentJson.parent.full_name
					);
				}
			}

			// Remove old cache
			await prisma.githubRepo.deleteMany();

			// Save the data in the cache
			await Promise.all(
				json.map(async (repo) => {
					console.log('[projects.json.ts]: Saving repo ' + repo.name);
					return prisma.githubRepo.create({
						data: {
							id: repo.id,
							description: repo.description,
							name: repo.name,
							url: repo.html_url,
							stargazersCount: repo.stargazers_count,
							fork: repo.fork,
							forksCount: repo.forks_count,
							language: repo.language,
							topics: JSON.stringify(repo.topics),
							parentUrl: repo.parent?.html_url,
							parentName: repo.parent?.full_name
						}
					});
				})
			);

			// Update the cache state
			await updateCacheState(id);
		} catch (error) {
			return {
				status: 500,
				...(await getCacheData(id))
			};
		}
	}

	return {
		body: await prisma.githubRepo.findMany()
	};
};
