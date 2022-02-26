<script lang="ts">
	import { t } from '$lib/i18n';
</script>

<section>
	<img
		src="https://www.gravatar.com/avatar/{process.env.GRAVATAR_HASH}?s=200&d=mp"
		alt="headshot"
	/>

	<section>
		<h1>{$t('profile.name')}</h1>

		<p>{$t('profile.about')}</p>
	</section>
</section>

<style lang="scss">
	section {
		@apply flex gap-4;

		img {
			@apply rounded-full aspect-square h-32;
		}

		section {
			@apply flex-col flex-grow justify-center gap-4;

			h1 {
				@apply text-4xl;
			}
		}
	}
</style>
