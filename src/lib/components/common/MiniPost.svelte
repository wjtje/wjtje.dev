<script lang="ts">
	import { locale } from '$lib/i18n';
	import { DateTime } from 'luxon';
	import Markdown from 'svelte-exmarkdown';

	export let image: string = undefined;
	export let date: Date | string = undefined;
	export let title: string;
	export let subtitle: string = undefined;

	// Remove images from the subtitle
	$: subtitleClean = String(subtitle).replaceAll(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g, '');

	$: dateString = DateTime.fromJSDate(new Date(date)).toRelative({
		locale: $locale
	});
</script>

<section>
	<div class="text">
		{#if date}
			<span aria-label="Date">{dateString}</span>
		{/if}

		<h3 aria-label="Main title">
			<Markdown md={title} />
		</h3>

		<div class="subtitle" aria-label="Subtitle">
			{#if subtitle}
				<Markdown md={subtitleClean} />
			{/if}
			<slot />
		</div>
	</div>

	{#if image}
		<img src={image} alt={title} />
	{/if}
</section>

<style lang="scss">
	section {
		@apply pb-4 flex flex-row;

		img {
			@apply h-16 ml-4 rounded-[50%];
		}

		div.text {
			@apply w-full min-w-0;

			// The date above the title shown in a light gray
			span {
				@apply text-xs text-gray-700 dark:text-gray-300 mb-[-0.1rem] block;
			}

			// The main title in large default color text with markdown support
			h3 {
				@apply text-xl truncate w-full block;

				:global(p) {
					@apply truncate;
				}

				:global(a) {
					@apply text-sky-700 gdark:text-blue-200 hover:text-blue-700 gdark:hover:text-sky-600 transition-colors;
				}
			}

			// The subtitle is mid size default color text
			div.subtitle {
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
	}
</style>
