<script lang="ts">
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
	<a in:scale={{ duration: 400, delay: i * 50 + 100 }} href={`/${$locale}/blog/post/${post.slug}`}>
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

<style lang="scss">
	a {
		@apply w-full md:w-[60%] lg:w-[50%] cursor-pointer block;
	}
</style>
