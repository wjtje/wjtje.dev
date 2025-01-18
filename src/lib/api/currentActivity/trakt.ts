import type ActivitySource from '.';

export default class Trakt implements ActivitySource {
	id = 'trakt';
	name = 'Trakt';

	async getActivities() {
		return [];
	}
}
