import type { RequestHandler } from './$types';
import type { Person } from '$lib/@types/activitypub';

export const GET: RequestHandler = async ({ url }) => {
	const person: Person = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		id: url.href,
		type: 'Person',
		followers: `${url.href}/followers`,
		following: `${url.href}/following`,
		inbox: `${url.href}/inbox`,
		outbox: `${url.href}/outbox`,
		name: `${url.hostname} Blog`
	};

	return new Response(JSON.stringify(person), {
		headers: {
			'content-type': 'application/json'
		}
	});
};
