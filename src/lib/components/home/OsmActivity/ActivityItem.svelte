<script lang="ts">
	import type { Changeset } from '$lib/@types/osm';
	import MiniPost from '$lib/components/common/MiniPost.svelte';
	import { t } from '$lib/i18n';

	export let changeset: Changeset;

	// Generate the title
	$: title = ((): string => {
		switch (changeset.parsedTags.created_by.name) {
			case 'MapComplete':
				return $t('OsmActivity.editor.MapComplete.mainText', {
					count: changeset['@_changes_count'],
					theme: changeset.parsedTags.theme,
					host: changeset.parsedTags.host
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
</script>

<MiniPost date={changeset['@_created_at']} {title} {subtitle} />
