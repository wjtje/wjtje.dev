<script lang="ts">
	import { goto } from '$app/navigation';
	import MiniPost from '$lib/components/common/MiniPost.svelte';
	import { locale, t } from '$lib/i18n';
	import { scale } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ posts } = data);
</script>

<svelte:head>
	<title>{$t('common.title')} - {$t('blog.title')}</title>
</svelte:head>

<h1>{$t('blog.title')}</h1>

{#each posts as post, i}
	<div
		in:scale={{ duration: 400, delay: i * 50 + 100 }}
		on:click={() => {
			goto(`/${$locale}/blog/post/${post.slug}`);
		}}
	>
		<MiniPost date={post.createdAt} mainTitle={post.title} subTitle={post.preview}>
			<a href={`/${$locale}/blog/post/${post.slug}`} slot="subTitle">{$t('blog.more')}</a>
		</MiniPost>
	</div>
{/each}

<style lang="scss">
	div {
		@apply w-full md:w-[60%] lg:w-[50%] cursor-pointer;
	}
</style>
