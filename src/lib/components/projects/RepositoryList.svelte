<script lang="ts">
	import { locale, t } from '$lib/i18n';
	import type { GithubRepo } from '@prisma/client';
	import GoRepoForked from 'svelte-icons/go/GoRepoForked.svelte';
	import GoStar from 'svelte-icons/go/GoStar.svelte';
	import { scale } from 'svelte/transition';
	import MiniPost from '../common/MiniPost.svelte';
	import MiniPostLoader from '../common/MiniPostLoader.svelte';
	import ForkIndicator from './ForkIndicator.svelte';
	import LanguageIndicator from './LanguageIndicator.svelte';
	import NumberIndicator from './NumberIndicator.svelte';
	import { GitHubUsername } from '$lib/common';
	import GoMarkGithub from 'svelte-icons/go/GoMarkGithub.svelte';

	const getDataFromServer = async (lang: string) => {
		const response = await fetch(`/api/projects.json?lang=${locale.get()}`);
		return await response.json();
	};

	$: response = getDataFromServer($locale) as Promise<GithubRepo[]>;
</script>

{#await response}
	<MiniPostLoader />
{:then repos}
	{#each repos as repo, i}
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
					<ForkIndicator {...repo} />
				</div>
			</MiniPost>
		</a>
	{/each}
{:catch error}
	<h3>{$t('home.dataLoadingFailed', { status: error.message })}</h3>
{/await}

<style lang="scss">
	a.project {
		@apply w-full md:w-[60%] lg:w-[50%] cursor-pointer;

		div.indicators {
			@apply flex gap-2;
		}

		span.github-readme :global(svg) {
			@apply h-6 w-6 p-1 fill-white inline;
		}
	}
</style>
