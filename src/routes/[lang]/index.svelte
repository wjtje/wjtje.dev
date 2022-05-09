<script lang="ts">
	import GithubActivity from '$lib/components/GithubActivity/GithubActivity.svelte';
	import OsmActivity from '$lib/components/OsmActivity/OsmActivity.svelte';
	import Profile from '$lib/components/Profile.svelte';
	import { t } from '$lib/i18n';
</script>

<svelte:head>
	<title>{$t('common.title')}</title>
	<meta name="description" content={$t('common.description')} />
</svelte:head>

<Profile />

<section class="activity">
	<section class="github">
		<h2>{$t('home.ghactivity')}</h2>

		<GithubActivity />
	</section>

	<section class="osm">
		<h2>OpenStreetMap activity</h2>

		<OsmActivity />
	</section>
</section>

<style lang="scss">
	:global(section) {
		@apply pb-8;

		&:last-child {
			@apply pb-0;
		}
	}

	section.activity {
		@apply lg:flex lg:gap-4;
	}

	section.github,
	section.osm {
		@apply lg:w-[calc(50%-8px)];

		h2 {
			@apply text-3xl pb-3;
		}
	}
</style>
