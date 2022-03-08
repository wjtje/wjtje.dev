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
	import { GithubActivity } from '$lib/components/svelte-github-activity';
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

<section class="github">
	<h2>{$t('home.ghactivity')}</h2>

	<GithubActivity githubEvent={github} githubStatus={github_status} />
</section>

<style lang="scss">
	:global(section) {
		@apply pb-8;

		&:last-child {
			@apply pb-0;
		}
	}

	section.github {
		@apply lg:max-w-[80%];

		h2 {
			@apply text-3xl pb-3;
		}
	}
</style>
