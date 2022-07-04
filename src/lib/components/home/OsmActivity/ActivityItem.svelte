<script lang="ts">
	import type { Changeset } from '$lib/@types/osm';
	import MiniPost from '$lib/components/common/MiniPost.svelte';
	import { t } from '$lib/i18n';
	import { getStreetCompleteDetails } from '$lib/components/home/OsmActivity/getStreetcompleteDetails';

	export let changeset: Changeset;

	// Generate the title
	$: title = ((): string => {
		switch (changeset.parsedTags.created_by.name) {
			case 'MapComplete':
				return $t('OsmActivity.editor.MapComplete.mainText', {
					count: changeset.parsedTags.answer,
					theme: $t(`OsmActivity.editor.MapComplete.themes.${changeset.parsedTags.theme}`, {
						host: changeset.parsedTags.host,
						default: $t(`OsmActivity.editor.MapComplete.themes.default`)
					})
				});
			default:
				return changeset.parsedTags.comment;
		}
	})();

	// Generate the subtitle
	$: subtitle = ((): string => {
		switch (changeset.parsedTags.created_by.name) {
			case 'MapComplete':
				return $t('OsmActivity.editor.MapComplete.subText', {
					id: changeset['@_id'],
					version: changeset.parsedTags.created_by.version
				});
			case 'StreetComplete':
				return $t('OsmActivity.editor.StreetComplete.subText', {
					id: changeset['@_id'],
					version: changeset.parsedTags.created_by.version
				});
			default:
				return $t('OsmActivity.defaultText', {
					id: changeset['@_id'],
					editor: changeset.parsedTags.created_by.name,
					version: changeset.parsedTags.created_by.version
				});
		}
	})();

	$: image = ((): string | undefined => {
		switch (changeset.parsedTags.created_by.name) {
			case 'StreetComplete':
				return getStreetCompleteDetails(changeset.parsedTags['StreetComplete:quest_type']);
			default:
				return undefined;
		}
	})();
</script>

<MiniPost date={changeset['@_created_at']} {title} {subtitle} {image} />
