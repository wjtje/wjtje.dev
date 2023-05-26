<script lang="ts">
	import ActivityList from '$lib/components/home/ActivityList.svelte';
	import Profile from '$lib/components/home/Profile.svelte';
	import { t } from '$lib/i18n';
</script>

<svelte:head>
	<title>{$t('common.title')}</title>
	<meta
		name="description"
		content={$t('common.description', {
			birthday: process.env.BIRTHDAY
		})}
	/>
</svelte:head>

<Profile />

<section class="activity">
	<section class="github">
		<h2>{$t('home.ghactivity')}</h2>

		<ActivityList activityName="github" />
	</section>

	<section class="osm">
		<h2>{$t('home.osmactivity')}</h2>

		<ActivityList activityName="osm" />
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
		@apply lg:w-[calc(50%-8px)] pb-8;

		h2 {
			@apply text-3xl pb-3;
		}
	}
</style>
