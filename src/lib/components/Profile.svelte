<script lang="ts">
	import { t } from '$lib/i18n';
</script>

<section>
	<img
		src="https://www.gravatar.com/avatar/1741643deaafad86bd0bf2a4fb481366?s=200&d=mp"
		alt="headshot"
	/>

	<h1>{$t('profile.name')}</h1>

	<p>{$t('profile.about')}</p>
</section>

<style lang="scss">
	section {
		// @apply flex gap-4 justify-center;
		@apply grid grid-cols-[8rem_1fr] grid-rows-[8rem_1fr] md:grid-rows-2 gap-4 items-center;

		img {
			@apply rounded-full aspect-square h-32 md:row-span-2;
		}

		h1 {
			@apply text-4xl;
			@apply dark:text-white;
		}

		p {
			@apply text-gray-900 dark:text-gray-100 col-span-2 md:col-span-1;
		}
	}
</style>
