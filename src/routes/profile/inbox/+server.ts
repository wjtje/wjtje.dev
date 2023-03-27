import type { RequestHandler } from './$types';
import type { OrderedCollection } from '$lib/@types/activitypub';

export const GET: RequestHandler = async ({ url }) => {
	const activitystreams: OrderedCollection = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		id: url.href,
		type: 'OrderedCollection',
		totalItems: 0,
		items: []
	};

	return new Response(JSON.stringify(activitystreams), {
		headers: {
			'content-type': 'application/json'
		}
	});
};
