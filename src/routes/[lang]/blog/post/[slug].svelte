<script lang="ts">
	import { locale } from '$lib/i18n';

	import type { Post, User } from '@prisma/client';
	import { DateTime } from 'luxon';

	export let post: Post & {
		author: User;
	};

	$: date = DateTime.fromJSDate(new Date(post.createdAt)).toRelative({
		locale: $locale
	});
</script>

<h1>{post.title}</h1>

<span>Written by {post.author.name}, {date}</span>

<p>
	{post.body}
</p>
