<script lang="ts">
	import { t } from '$lib/i18n';
	import MiniPost from '$lib/components/common/MiniPost.svelte';
	import type { RemoteData } from '$lib/api/helper';

	export let event: RemoteData;

	$: title =
		typeof event.mainTitle == 'string'
			? event.mainTitle
			: $t(event.mainTitle.id, event.mainTitle.data ?? {});

	$: subtitle =
		event.subTitle == null
			? null
			: typeof event.subTitle == 'string'
			? event.subTitle
			: $t(event.subTitle.id, event.subTitle.data ?? {});

	// Custom option for MapComplete
	if (
		typeof event.mainTitle !== 'string' &&
		event.mainTitle.id == 'OsmActivity.editor.MapComplete.mainText'
	) {
		title = $t('OsmActivity.editor.MapComplete.mainText', {
			count: event.mainTitle.data?.count,
			theme: $t(`OsmActivity.editor.MapComplete.themes.${event.mainTitle.data?.theme}`, {
				host: event.mainTitle.data?.host,
				default: $t(`OsmActivity.editor.MapComplete.themes.default`)
			})
		});
	}
</script>

<MiniPost date={event.date} {title} {subtitle} />
