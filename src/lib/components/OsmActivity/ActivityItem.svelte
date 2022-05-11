<script lang="ts">
	import type { Changeset } from '$lib/@types/osm';
	import { DateTime } from 'luxon';
	import { locale } from '$lib/i18n';
	import { t } from '$lib/i18n';

	export let changeset: Changeset;

	$: date = DateTime.fromISO(String(changeset['@_created_at'])).toRelative({
		locale: $locale
	});
</script>

<div>
	<span>{date}</span>

	<h3>{changeset.parsedTags.comment}</h3>
	<p>
		{@html $t('OsmActivity.defaultText', {
			id: changeset['@_id'],
			editor: changeset.parsedTags.created_by.name,
			version: changeset.parsedTags.created_by.version
		})}
	</p>
</div>

<style lang="scss">
	div {
		@apply pb-4;

		span {
			@apply text-xs text-gray-700 dark:text-gray-300 mb-[-0.1rem] block;
		}

		h3 {
			@apply text-xl whitespace-nowrap overflow-hidden text-ellipsis w-full block;
		}

		p {
			@apply text-sm whitespace-nowrap overflow-hidden text-ellipsis w-full block;
		}

		:global(a) {
			@apply text-sky-700 gdark:text-blue-200 hover:text-blue-700 gdark:hover:text-sky-600 transition-colors;
		}
	}
</style>
