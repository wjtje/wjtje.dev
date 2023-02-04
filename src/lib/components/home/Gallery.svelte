<script lang="ts">
	import { locale, t } from '$lib/i18n';
	import { scale } from 'svelte/transition';
	import GalleryPhotoLoader from './GalleryPhotoLoader.svelte';
	import GalleryPhoto from './GalleryPhoto.svelte';

	const getDataFromServer = async (lang: string) => {
		const response = await fetch(`/api/pixey.json?lang=${locale.get()}`);
		return {
			status: response.status,
			events: await response.json()
		};
	};

	$: request = getDataFromServer($locale);
</script>

{#await request}
	<GalleryPhotoLoader />
{:then response}
	{#if response.status != 200}
		<h3>{$t('home.dataLoadingFailed', { status: response.status })}</h3>
	{/if}
	<div class="gallery">
		{#each response.events as event, i}
			<div in:scale={{ duration: 400, delay: i * 50 }}>
				<GalleryPhoto {...event} />
			</div>
		{/each}
	</div>
{:catch error}
	<h3>{$t('home.noData', { status: error.message })}</h3>
{/await}

<style lang="scss">
	div.gallery {
		@apply flex flex-row;
	}
</style>
