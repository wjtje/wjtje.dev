<script context="module">
	/** @type {import('./')).Load} */
	export async function load({ fetch }) {
		const url = `https://api.github.com/users/wjtje/events/public?per_page=10`;
		const response = await fetch(url);

		return {
			status: response.status,
			props: {
				github: response.ok && (await response.json())
			}
		};
	}
</script>

<script lang="ts">
	import { GithubActivity } from '$lib/components/GithubActivity';
	import Profile from '$lib/components/Profile.svelte';
	import { t } from '$lib/i18n';

	export let github;
</script>

<svelte:head>
	<title>{$t('common.title')}</title>
	<meta name="description" content={$t('common.description')} />
</svelte:head>

<Profile />

<GithubActivity githubEvent={github} />

<style lang="scss">
	:global(section) {
		@apply pb-8;

		&:last-child {
			@apply pb-0;
		}
	}
</style>
