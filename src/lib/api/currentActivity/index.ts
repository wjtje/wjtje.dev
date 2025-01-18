import Traewelling from './traewelling';
import Steam from './steam';
import Trakt from './trakt';
import type { RemoteI18nData } from '../helper';
import type { CurrentActivity as CurrentActivityPrisma } from '@prisma/client';
import { t } from '$lib/i18n';

/**
 * Provider of activity items
 */
export default interface ActivitySource {
	/**
	 * Unique identifier of the source
	 */
	id: string;

	/**
	 * Human readable name of the source
	 */
	name: string;

	getActivities(): Promise<CurrentActivityPrisma[]>;
}

export interface CurrentActivity {
	title: string;
	titleUrl: string | null;
	subtitle: string | RemoteI18nData | null;
	image: string | null;
	imageAlt: string | null;
	imageRounded?: boolean;
	start: string | null;
	end: string | null;
}

export const activitySources: ActivitySource[] = [new Traewelling(), new Steam(), new Trakt()];

export function translateActivities(activities: CurrentActivityPrisma[]): CurrentActivity[] {
	return activities.map((activity) => {
		let subTitle = null;
		try {
			subTitle = JSON.parse(activity.subtitle);
		} catch (error) {
			subTitle = activity.subtitle;
		}

		return {
			...activity,
			start: activity.start as unknown as string,
			end: activity.end as unknown as string,
			subtitle:
				subTitle == null
					? null
					: typeof subTitle == 'string'
						? subTitle
						: t.get(subTitle.id, subTitle.data ?? {})
		};
	});
}
