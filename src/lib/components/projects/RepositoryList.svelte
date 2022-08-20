<script lang="ts">
	import { goto } from '$app/navigation';

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
	import RepositoryCard from './RepositoryCard.svelte';
	import { GitHubUsername } from '$lib/common';

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
		<div
			in:scale={{ duration: 400, delay: i * 50 }}
			class="project"
			on:click={() => {
				goto(`/${$locale}/projects/${encodeURI(repo.name)}`);
			}}
		>
			<!-- <RepositoryCard {...repo} /> -->
			<MiniPost subTitle={repo.description}>
				<svelte:fragment slot="mainTitle">
					{#if repo.owner == GitHubUsername}
						{repo.name}
					{:else}
						{repo.owner}/{repo.name}
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
		</div>
	{/each}
{:catch error}
	<h3>{$t('home.dataLoadingFailed', { status: error.message })}</h3>
{/await}

<style lang="scss">
	div.project {
		@apply w-full md:w-[60%] lg:w-[50%] cursor-pointer;

		div.indicators {
			@apply flex gap-2;
		}
	}
</style>
