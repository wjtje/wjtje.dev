<script lang="ts">
	import MiniPost from '$lib/components/common/MiniPost.svelte';
	import { locale, t } from '$lib/i18n';
	import { scale } from 'svelte/transition';

	export let posts: {
		createdAt: Date;
		title: string;
		slug: string;
		preview: string;
	}[] = [];
</script>

<svelte:head>
	<title>{$t('common.title')} - {$t('blog.title')}</title>
</svelte:head>

<h1>{$t('blog.title')}</h1>

{#each posts as post, i}
	<div in:scale={{ duration: 400, delay: i * 50 + 100 }}>
		<MiniPost date={post.createdAt} mainTitle={post.title} subTitle={post.preview}>
			<a href={`/${$locale}/blog/post/${post.slug}`} slot="subTitle">{$t('blog.more')}</a>
		</MiniPost>
	</div>
{/each}

<style lang="scss">
	div {
		@apply w-full md:w-[60%] lg:w-[50%];
	}
</style>
