<script lang="ts">
	import type { Post, User } from '@prisma/client';

	export let posts: (Post & {
		author: User;
	})[] = [];
</script>

<h1>BLOG</h1>

{#each posts as post}
	<p>{post.title} by {post.author.name}</p>
{/each}
