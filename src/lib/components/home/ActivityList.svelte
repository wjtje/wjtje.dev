<script lang="ts">
	import { locale, t } from '$lib/i18n';
	import { scale } from 'svelte/transition';
	import MiniPostLoader from '$lib/components/common/MiniPostLoader.svelte';
	import MiniPost from '../common/MiniPost.svelte';

	export let activityName: string;

	const getDataFromServer = async (lang: string) => {
		const response = await fetch(`/api/${activityName}.json?lang=${locale.get()}`);
		return await response.json();
	};

	$: response = getDataFromServer($locale);
</script>

{#await response}
	<MiniPostLoader />
{:then events}
	{#each events as event, i}
		<div in:scale={{ duration: 400, delay: i * 50 }}>
			<MiniPost {...event} />
		</div>
	{/each}
{:catch error}
	<h3>{$t('home.dataLoadingFailed', { status: error.message })}</h3>
{/await}
