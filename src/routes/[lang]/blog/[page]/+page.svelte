<script lang="ts">
	import { goto } from '$app/navigation';
	import MiniPost from '$lib/components/common/MiniPost.svelte';
	import PageSelector from '$lib/components/common/PageSelector.svelte';
	import { locale, t } from '$lib/i18n';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ posts } = data);

	let ready = false;
	onMount(() => (ready = true));
</script>

<svelte:head>
	<title>{$t('common.title')} - {$t('blog.title')}</title>
</svelte:head>

<h1>{$t('blog.title')}</h1>

{#if posts.length > 0}
	{#if ready}
		{#each posts as post, i}
			<a
				in:scale={{ duration: 400, delay: i * 50 + 100 }}
				href={`/${$locale}/blog/post/${post.slug}`}
			>
				<MiniPost date={post.createdAt} mainTitle={post.title} subTitle={post.preview}>
					<a
						aria-hidden="true"
						tabindex="-1"
						href={`/${$locale}/blog/post/${post.slug}`}
						slot="subTitle">{$t('blog.more')}</a
					>
				</MiniPost>
			</a>
		{/each}

		<PageSelector
			currentPage={data.currentPage}
			pageCount={data.totalPages}
			on:pageChange={(event) => {
				goto(`/${$locale}/blog/${event.detail.page}`);
			}}
		/>
	{/if}
{:else}
	<p>{$t('blog.noPosts')}</p>
{/if}

<style lang="scss">
	a {
		@apply w-full md:w-[60%] lg:w-[50%] cursor-pointer block;
	}
</style>
