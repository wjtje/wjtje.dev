<script lang="ts">
	import MiniPost from '$lib/components/common/MiniPost.svelte';
	import { locale, t } from '$lib/i18n';
	import type { Post, User } from '@prisma/client';

	export let posts: (Post & {
		author: User;
	})[] = [];
</script>

<svelte:head>
	<title>{$t('common.title')} - {$t('blog.title')}</title>
</svelte:head>

<h1>{$t('blog.title')}</h1>

<div>
	{#each posts as post}
		<MiniPost date={post.createdAt} title={post.title} subtitle={post.preview}>
			<a href={`/${$locale}/blog/post/${post.slug}`}>{$t('blog.more')}</a>
		</MiniPost>
	{/each}
</div>

<style lang="scss">
	div {
		@apply w-full md:w-[60%] lg:w-[50%];
	}
</style>
