<script lang="ts">
	import PostMini from '$lib/components/Blog/PostMini.svelte';
	import type { Post, User } from '@prisma/client';

	export let posts: (Post & {
		author: User;
	})[] = [];
</script>

<h1>BLOG</h1>

{#each posts as post}
	<PostMini {post} />
{/each}

<style lang="scss">
	h1 {
		@apply text-4xl pb-3;
	}
</style>
