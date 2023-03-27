import type { RequestHandler } from './$types';
import type { Activity, OrderedCollection, OrderedCollectionPage } from '$lib/@types/activitypub';
import { prisma } from '$lib/prisma';

export const GET: RequestHandler = async ({ url }) => {
	// Determine total amount of items
	const postCount = await prisma.page.count({
		where: {
			pageType: 'BLOG',
			visible: true
		}
	});
	const pageSize = 10;
	const lastPage = Math.ceil(postCount / pageSize);

	if (url.searchParams.get('page') !== null) {
		// Return some page
		const page =
			url.searchParams.get('page') === 'true' ? 1 : parseInt(url.searchParams.get('page'));

		// Basic boilerplate
		const activitystreams: OrderedCollectionPage = {
			'@context': 'https://www.w3.org/ns/activitystreams',
			id: url.href,
			type: 'OrderedCollectionPage',
			totalItems: postCount,
			startIndex: (page - 1) * pageSize,
			next: `${url.protocol}//${url.host}/profile/outbox?page=${page + 1}`,
			prev: `${url.protocol}//${url.host}/profile/outbox?page=${page - 1}`,
			partof: `${url.protocol}//${url.host}/profile/outbox`,
			items: []
		};

		// Get the posts for the correct page
		const posts = await prisma.page.findMany({
			skip: (page - 1) * pageSize,
			take: pageSize,
			where: {
				visible: true,
				pageType: 'BLOG'
			},
			orderBy: {
				createdAt: 'desc'
			},
			select: {
				slug: true,
				body: true,
				language: true,
				createdAt: true,
				owner: {
					select: {
						name: true
					}
				}
			}
		});

		// Add the posts to the activitystreams
		const activity: Activity[] = posts.map((post) => {
			return {
				'@context': 'https://www.w3.org/ns/activitystreams',
				id: `${url.protocol}//${url.host}/${post.language.toLowerCase()}/blog/post/${post.slug}`,
				type: 'Create',
				actor: {
					'@context': 'https://www.w3.org/ns/activitystreams',
					type: 'Person',
					id: `${url.protocol}//${url.host}/profile`
				},
				object: {
					'@context': 'https://www.w3.org/ns/activitystreams',
					type: 'Note',
					id: `${url.protocol}//${url.host}/${post.language.toLowerCase()}/blog/post/${post.slug}`,
					content: atob(post.body),
					contentMap: {
						[post.language.toLowerCase()]: atob(post.body)
					},
					published: post.createdAt.toISOString(),
					mediaType: 'text/markdown'
				},
				to: 'https://www.w3.org/ns/activitystreams#Public'
			};
		});
		activitystreams.items = activity;

		return new Response(JSON.stringify(activitystreams), {
			headers: {
				'content-type': 'application/json'
			}
		});
	} else {
		// Return index
		const result: OrderedCollection = {
			'@context': 'https://www.w3.org/ns/activitystreams',
			id: url.href,
			type: 'OrderedCollection',
			totalItems: postCount,
			first: `${url.href}?page=true`,
			last: `${url.href}?page=${lastPage}`,
			current: `${url.href}?page=true`
		};

		return new Response(JSON.stringify(result), {
			headers: {
				'content-type': 'application/json'
			}
		});
	}
};
