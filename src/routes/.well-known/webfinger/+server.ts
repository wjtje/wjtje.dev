import type { RequestHandler } from './$types';
import type { WebFinger } from '$lib/@types/webfinger';

export const GET: RequestHandler = async ({ url }) => {
	if (url.searchParams.get('resource') === `blog@${url.hostname}`) {
		const webfingerObject: WebFinger = {
			subject: `blog@${url.hostname}`,
			aliases: [url.origin],
			links: [
				{
					rel: 'http://webfinger.net/rel/profile-page',
					type: 'text/html',
					href: url.origin
				},
				{
					rel: 'self',
					type: 'application/activity+json',
					href: `${url.origin}/profile`
				}
			]
		};
		return new Response(JSON.stringify(webfingerObject), {
			headers: {
				'content-type': 'application/json'
			}
		});
	} else {
		// TODO: Maybe forward request to Mastodon instance

		// Fetch the webfinger object from the Mastodon instance
		const mastodonWebFinger = await fetch(
			`https://social.wjtje.dev/.well-known/webfinger?resource=${url.searchParams.get('resource')}`
		);

		// Return the webfinger object
		return new Response(await mastodonWebFinger.text(), {
			headers: {
				'content-type': 'application/json'
			},
			status: mastodonWebFinger.status
		});
	}
};
