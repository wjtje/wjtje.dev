<script lang="ts">
	import PostMini from '$lib/components/Blog/PostMini.svelte';
	import { t } from '$lib/i18n';
	import type { Post, User } from '@prisma/client';

	export let posts: (Post & {
		author: User;
	})[] = [];
</script>

<svelte:head>
	<title>{$t('common.title')} - {$t('blog.title')}</title>
</svelte:head>

<h1>{$t('blog.title')}</h1>

{#each posts as post}
	<PostMini {post} />
{/each}
