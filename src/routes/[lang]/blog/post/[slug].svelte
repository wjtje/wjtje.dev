<script lang="ts">
	import { locale, t } from '$lib/i18n';
	import type { Post, User } from '@prisma/client';
	import { DateTime } from 'luxon';
	import Markdown from 'svelte-exmarkdown';
	import './[slug].scss';

	export let post: Post & {
		author: User;
	};

	$: date = DateTime.fromJSDate(new Date(post.createdAt)).toRelative({
		locale: $locale
	});
</script>

<svelte:head>
	<title>{$t('common.title')} - {post.title}</title>
	<meta name="description" content={post.preview} />
	<!-- Custom tags for Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content="@wjtje_wal" />
	<meta name="twitter:title" content={`${post.title} - ${$t('common.title')}`} />
	<meta name="twitter:description" content={post.preview} />
	<meta name="twitter:image" content={post.image ?? ''} />
	<!-- Custom tags for Open Graph -->
	<meta name="og:title" content={`${post.title} - ${$t('common.title')}`} />
	<meta name="og:type" content="article" />
	<meta name="article:published_time" content={new Date(post.createdAt).toISOString()} />
	<meta name="og:description" content={post.preview} />
	<meta name="og:image" content={post.image ?? ''} />
</svelte:head>

<h1>{post.title}</h1>

<span
	>{$t('blog.written_by', {
		author: post.author.name,
		date: date
	})}</span
>

<div class="markdown">
	<Markdown md={post.body} />
</div>

<style lang="scss">
	h1 {
		@apply pb-1;
	}

	span {
		@apply pb-3 inline-block text-gray-700 gdark:text-gray-300;
	}
</style>
