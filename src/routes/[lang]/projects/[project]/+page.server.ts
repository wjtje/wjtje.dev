import type { RequestHandler } from './__types/[project]';

export const GET: RequestHandler = ({ params }) => {
	return {
		body: {
			title: params.project
		}
	};
};
