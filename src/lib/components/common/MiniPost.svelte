<script lang="ts">
	import { locale } from '$lib/i18n';
	import { DateTime } from 'luxon';
	import Markdown from 'svelte-exmarkdown';
	import { scale } from 'svelte/transition';

	export let image: string = undefined;
	export let date: Date | string = undefined;
	export let mainTitle: string = undefined;
	export let subTitle: string = undefined;
	export let index: number = 0;
	export let url: string | undefined = undefined;

	// Remove images from the subtitle
	$: subtitleClean = String(subTitle).replaceAll(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g, '');

	$: dateString = DateTime.fromJSDate(new Date(date)).toRelative({
		locale: $locale
	});
</script>

<section in:scale={{ duration: 400, delay: index * 50 }}>
	<div class="text">
		<slot name="tags" />

		{#if date}
			<span aria-label="Date">{dateString}</span>
		{/if}

		<h3 aria-label="Main title">
			{#if mainTitle}
				<Markdown md={mainTitle} />
			{/if}
			<slot name="mainTitle" />
		</h3>

		<div class="subtitle" aria-label="Subtitle">
			{#if subTitle}
				<Markdown md={subtitleClean} />
			{/if}
			<slot name="subTitle" />
		</div>
	</div>

	{#if image}
		<img src={image} alt={mainTitle} />
	{/if}
</section>

<style lang="scss">
	section {
		@apply pb-4 flex flex-row;

		img {
			@apply h-16 ml-4 rounded-[50%] bg-white;
		}

		div.text {
			@apply w-full min-w-0;

			// The date above the title shown in a light gray
			span {
				@apply text-xs text-zinc-700 gdark:text-zinc-300 mb-[-0.1rem] mt-[0.1rem] block;
			}

			// The main title in large default color text with markdown support
			h3 {
				@apply text-xl truncate w-full;

				:global(p) {
					@apply truncate;
				}

				:global(a) {
					@apply text-sky-700 gdark:text-blue-200 hover:text-blue-700 gdark:hover:text-sky-600 transition-colors;
				}
			}

			// The subtitle is mid size default color text
			div.subtitle {
				@apply flex gap-2 max-h-5 w-full overflow-hidden;

				:global(*) {
					display: none;
				}

				:global(p) {
					@apply text-sm truncate inline;
				}

				:global(a) {
					@apply text-sm whitespace-nowrap text-sky-700 gdark:text-blue-200 hover:text-blue-700 gdark:hover:text-sky-600 transition-colors  inline;
				}
			}
		}
	}
</style>
