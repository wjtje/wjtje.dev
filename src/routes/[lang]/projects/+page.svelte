<script lang="ts">
	import { locale, t } from '$lib/i18n';
	import type { PageData } from './$types';
	import { scale } from 'svelte/transition';
	import { GitHubUsername } from '$lib/common';
	import MiniPost from '$lib/components/common/MiniPost.svelte';
	import GoMarkGithub from 'svelte-icons/go/GoMarkGithub.svelte';
	import LanguageIndicator from './LanguageIndicator.svelte';
	import NumberIndicator from './NumberIndicator.svelte';
	import GoRepoForked from 'svelte-icons/go/GoRepoForked.svelte';
	import GoStar from 'svelte-icons/go/GoStar.svelte';
	import ForkIndicator from './ForkIndicator.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>{$t('common.title')} - {$t('projects.title')}</title>
	<meta name="description" content={$t('projects.temp')} />
</svelte:head>

<h1>{$t('projects.title')}</h1>

{#each data.repos as repo, i}
	<a
		in:scale={{ duration: 400, delay: i * 50 }}
		class="project"
		href={repo.detailPage
			? `/${$locale}/projects/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.name)}`
			: repo.url}
	>
		<MiniPost subTitle={repo.description}>
			<svelte:fragment slot="mainTitle">
				{#if repo.owner == GitHubUsername}
					{repo.name}
				{:else}
					{repo.owner}/{repo.name}
				{/if}
				{#if !repo.detailPage}
					<span class="github-readme">
						<GoMarkGithub />
					</span>
				{/if}
			</svelte:fragment>
			<div class="indicators" slot="tags">
				<LanguageIndicator language={repo.language} />
				<NumberIndicator count={repo.forksCount}>
					<GoRepoForked title="Number of forks" />
				</NumberIndicator>
				<NumberIndicator count={repo.stargazersCount}>
					<GoStar title="Number of stars" />
				</NumberIndicator>
				<ForkIndicator fork={repo.fork} parentName={repo.parentName} parentUrl={repo.parentUrl} />
			</div>
		</MiniPost>
	</a>
{/each}

<style lang="scss">
	a.project {
		@apply w-full md:w-[60%] lg:w-[50%] cursor-pointer block;

		div.indicators {
			@apply flex gap-2;
		}

		span.github-readme :global(svg) {
			@apply h-6 w-6 p-1 fill-white inline;
		}
	}
</style>
