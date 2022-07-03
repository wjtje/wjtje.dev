<script lang="ts">
	import { locale } from '$lib/i18n';
	import { DateTime } from 'luxon';
	import Markdown from 'svelte-exmarkdown';

	export let image: string = undefined;
	export let date: Date | string = undefined;
	export let title: string;
	export let subtitle: string = undefined;

	$: dateString = DateTime.fromJSDate(new Date(date)).toRelative({
		locale: $locale
	});
</script>

<section>
	{#if image !== undefined}
		<img src={image} alt={title} height="75px" />
	{/if}

	{#if date !== undefined}
		<span aria-label="Date">{dateString}</span>
	{/if}

	<h3 aria-label="Main title">
		<Markdown md={title} />
	</h3>

	<div aria-label="Subtitle">
		<Markdown md={subtitle} />
		<slot />
	</div>
</section>

<style lang="scss">
	section {
		@apply pb-4;

		span {
			@apply text-xs text-gray-700 dark:text-gray-300 mb-[-0.1rem] block;
		}

		h3 {
			@apply text-xl truncate w-full block;

			:global(p) {
				@apply truncate;
			}

			:global(a) {
				@apply text-sky-700 gdark:text-blue-200 hover:text-blue-700 gdark:hover:text-sky-600 transition-colors;
			}
		}

		div {
			@apply flex gap-2;

			:global(p) {
				@apply text-sm truncate;
			}

			:global(a) {
				@apply text-sm whitespace-nowrap text-sky-700 gdark:text-blue-200 hover:text-blue-700 gdark:hover:text-sky-600 transition-colors;
			}

			:global(ul) {
				display: none;
			}
		}
	}
</style>
