<script lang="ts">
	import { locale } from '$lib/i18n';
	import { DateTime } from 'luxon';

	export let image: string = undefined;
	export let date: Date | string = undefined;
	export let mainTitle: string = undefined;
	export let subTitle: string = undefined;

	// Remove images from the subtitle
	$: dateString = DateTime.fromJSDate(new Date(date)).toRelative({
		locale: $locale
	});
</script>

<section>
	<div class="text">
		<slot name="tags" />

		{#if date}
			<span aria-label="Date">{dateString}</span>
		{/if}
	</div>
	<img src={image} alt={subTitle} />
</section>

<style lang="scss">
	section {
		@apply flex flex-col m-2;

		img {
			@apply h-64 w-auto;
		}

		div.text {
			@apply w-full min-w-0;

			// The date above the title shown in a light gray
			span {
				@apply text-xs text-zinc-700 dark:text-zinc-300 mb-[-0.1rem] mt-[0.1rem] block;
			}
		}
	}
</style>
