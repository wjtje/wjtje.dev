<script lang="ts">
	import { GithubActivity } from '$lib/components/GithubActivity';
	import Profile from '$lib/components/Profile.svelte';
	import { t } from '$lib/i18n';
</script>

<svelte:head>
	<title>{$t('common.title')}</title>
	<meta name="description" content={$t('common.description')} />
</svelte:head>

<Profile />

<GithubActivity />

<style lang="scss">
	:global(section) {
		@apply pb-8;

		&:last-child {
			@apply pb-0;
		}
	}
</style>
