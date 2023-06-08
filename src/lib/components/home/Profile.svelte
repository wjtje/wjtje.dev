<script lang="ts">
	import { t } from '$lib/i18n';
	import { env } from '$env/dynamic/public';
</script>

<section>
	<img
		src="https://www.gravatar.com/avatar/1741643deaafad86bd0bf2a4fb481366?s=200&d=mp"
		alt="headshot"
	/>

	<h1>{$t('home.name')}</h1>

	<p>
		{$t('home.about', {
			birthday: env.PUBLIC_BIRTHDAY
		})}
	</p>
</section>

<style lang="scss">
	section {
		@apply grid grid-cols-[8rem_1fr] grid-rows-[8rem_1fr] md:grid-rows-2 gap-4 items-center md:items-start;

		img {
			@apply rounded-full aspect-square h-32 md:row-span-2;
		}

		h1 {
			@apply md:self-end pb-0;
		}

		p {
			@apply text-zinc-900 dark:text-zinc-100 col-span-2 md:col-span-1;
		}
	}
</style>
