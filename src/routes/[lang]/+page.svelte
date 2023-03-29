<script lang="ts">
	import ActivityList from '$lib/components/home/ActivityList.svelte';
	import Gallery from '$lib/components/home/Gallery.svelte';
	import Profile from '$lib/components/home/Profile.svelte';
	import { t } from '$lib/i18n';
</script>

<svelte:head>
	<title>{$t('common.title')}</title>
	<meta name="description" content={$t('common.description')} />
</svelte:head>

<Profile />

<section class="activity">
	<div>
		<h2>{$t('home.ghactivity')}</h2>

		<ActivityList activityName="github" />
	</div>

	<div>
		<h2>{$t('home.osmactivity')}</h2>

		<ActivityList activityName="osm" />
	</div>
</section>

<section class="gallery">
	<h2>{$t('home.gallery')}</h2>

	<Gallery />
</section>

<style lang="scss">
	section {
		@apply max-h-[30rem] overflow-hidden;

		-webkit-mask-image: linear-gradient(180deg, #000 70%, transparent);
		mask-image: linear-gradient(180deg, #000 70%, transparent);
	}

	section.activity {
		@apply lg:flex lg:gap-4 mb-6;

		div {
			@apply lg:w-[calc(50%-8px)];
		}
	}

	section.gallery {
		@apply mb-2;
	}
</style>
