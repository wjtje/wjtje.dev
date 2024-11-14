<script lang="ts">
	import { t } from '$lib/i18n';
	import { env } from '$env/dynamic/public';
</script>

<section>
	<div class="main">
		<div class="layout">
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
		</div>
	</div>
</section>

<style lang="scss">
	section {
		background-image: url('https://cdn.wjtje.dev/21d46a4a-78ce-43d8-80c9-e7c0cf673eec.jpeg');
		background-size: cover;
		background-position: center;
	}

	div.layout {
		@apply grid grid-cols-[8rem_1fr] grid-rows-[8rem_1fr] md:grid-rows-2 gap-4 items-center md:items-start;

		img {
			@apply rounded-full aspect-square h-32 md:row-span-2;
		}

		h1 {
			@apply md:self-end pb-0 text-white;
		}

		p {
			@apply text-zinc-100 col-span-2 md:col-span-1;
		}
	}
</style>
