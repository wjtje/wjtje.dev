<script lang="ts">
	import { t } from '$lib/i18n';
</script>

<section>
	<img
		src="https://www.gravatar.com/avatar/1741643deaafad86bd0bf2a4fb481366?s=200&d=mp"
		alt="headshot"
	/>

	<section>
		<h1>{$t('profile.name')}</h1>

		<p>{$t('profile.about')}</p>
	</section>
</section>

<style lang="scss">
	section {
		@apply flex gap-4 justify-center;

		img {
			@apply rounded-full aspect-square h-32;
		}

		section {
			@apply flex-col flex-grow gap-4 mt-0;

			h1 {
				@apply text-4xl;
				@apply dark:text-white;
			}

			p {
				@apply text-gray-900 dark:text-gray-100;
			}
		}
	}
</style>
