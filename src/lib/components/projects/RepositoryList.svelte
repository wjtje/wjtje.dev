<script lang="ts">
	import { locale, t } from '$lib/i18n';
	import { scale } from 'svelte/transition';
	import MiniPostLoader from '../common/MiniPostLoader.svelte';
	import RepositoryCard from './RepositoryCard.svelte';

	const getDataFromServer = async (lang: string) => {
		const response = await fetch(`/api/projects.json?lang=${locale.get()}`);
		return await response.json();
	};

	$: response = getDataFromServer($locale);
</script>

{#await response}
	<MiniPostLoader />
{:then repos}
	{#each repos as repo, i}
		<div in:scale={{ duration: 400, delay: i * 50 }}>
			<RepositoryCard {...repo} />
		</div>
	{/each}
{:catch error}
	<h3>{$t('home.dataLoadingFailed', { status: error.message })}</h3>
{/await}
