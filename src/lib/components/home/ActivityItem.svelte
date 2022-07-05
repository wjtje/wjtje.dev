<script lang="ts">
	import { t } from '$lib/i18n';
	import MiniPost from '$lib/components/common/MiniPost.svelte';
	import type { RemoteData } from '$lib/api/helper';

	export let event: RemoteData;

	const generateMainTitle = (t: (key: string, payload?: Record<string, unknown>) => string) => {
		if (typeof event.mainTitle == 'string') {
			return event.mainTitle;
		}

		switch (event.mainTitle.id) {
			// Custom option for MapComplete
			case 'OsmActivity.editor.MapComplete.mainText':
				return t('OsmActivity.editor.MapComplete.mainText', {
					count: event.mainTitle.data?.count,
					theme: t(`OsmActivity.editor.MapComplete.themes.${event.mainTitle.data?.theme}`, {
						host: event.mainTitle.data?.host,
						default: t(`OsmActivity.editor.MapComplete.themes.default`)
					})
				});
			default:
				return t(event.mainTitle.id, event.mainTitle.data ?? {});
		}
	};

	$: title = generateMainTitle($t);

	$: subtitle =
		event.subTitle == null
			? null
			: typeof event.subTitle == 'string'
			? event.subTitle
			: $t(event.subTitle.id, event.subTitle.data ?? {});
</script>

<MiniPost date={event.date} {title} {subtitle} />
