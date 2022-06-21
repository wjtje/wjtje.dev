<script lang="ts">
	import { locale, t } from '$lib/i18n';

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

<span
	>{$t('blog.written_by', {
		author: post.author.name,
		date: date
	})}</span
>

<p>
	{post.body}
</p>

<style lang="scss">
	h1 {
		@apply pb-1;
	}

	span {
		@apply pb-3 inline-block text-gray-700 gdark:text-gray-300;
	}
</style>
