import type { RequestHandler } from './$types';
import type { Collection } from '$lib/@types/activitypub';

export const GET: RequestHandler = async ({ url }) => {
	const activitystreams: Collection = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		id: url.href,
		type: 'Collection',
		totalItems: 0,
		items: []
	};

	return new Response(JSON.stringify(activitystreams), {
		headers: {
			'content-type': 'application/json'
		}
	});
};
