<script lang="ts">
	import { locale, t } from '$lib/i18n';
	import { DateTime } from 'luxon';
	import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	import './+page.scss';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ post } = data);

	$: date = DateTime.fromJSDate(new Date(post.createdAt)).toRelative({
		locale: $locale
	});
</script>

<svelte:head>
	<title>{$t('common.title')} - {post.title}</title>
	<meta name="description" content={post.preview} />
	<!-- Custom tags for Open Graph -->
	<meta name="og:title" content={`${post.title} - ${$t('common.title')}`} />
	<meta name="og:type" content="article" />
	<meta name="article:published_time" content={new Date(post.createdAt).toISOString()} />
	<meta name="og:description" content={post.preview} />
	<meta name="og:image" content={post.image ?? ''} />
	<!-- Custom tags for Mastodon -->
	<meta name="fediverse:creator" content="@wouter@wjt.je">
</svelte:head>

<h1>{post.title}</h1>

<span
	>{$t('blog.written_by', {
		author: post.owner.name,
		date: date
	})}</span
>

<div class="markdown">
	<Markdown md={post.body} plugins={[gfmPlugin]} />
</div>

<style lang="scss">
	h1 {
		@apply pb-1;
	}

	span {
		@apply pb-3 inline-block text-zinc-700 gdark:text-zinc-300;
	}
</style>
