<script context="module">
	/** @type {import('./')).Load} */
	export async function load({ fetch }) {
		const url = `https://api.github.com/users/wjtje/events/public?per_page=10`;
		const response = await fetch(url);
		const json = await response.json();

		return {
			props: {
				github_status: response.status,
				github: json
			}
		};
	}
</script>

<script lang="ts">
	import { GithubActivity } from '$lib/components/GithubActivity';
	import Profile from '$lib/components/Profile.svelte';
	import { t } from '$lib/i18n';

	export let github;
	export let github_status;
</script>

<svelte:head>
	<title>{$t('common.title')}</title>
	<meta name="description" content={$t('common.description')} />
</svelte:head>

<Profile />

<GithubActivity githubEvent={github} githubStatus={github_status} />

<style lang="scss">
	:global(section) {
		@apply pb-8;

		&:last-child {
			@apply pb-0;
		}
	}
</style>
