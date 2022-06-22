<script lang="ts">
	import type { Post, User } from '@prisma/client';
	import { locale, t } from '$lib/i18n';
	import { DateTime } from 'luxon';

	export let post: Post & {
		author: User;
	};

	$: date = DateTime.fromJSDate(new Date(post.createdAt)).toRelative({
		locale: $locale
	});
</script>

<section>
	<span>{date}</span>

	<h3>{post.title}</h3>

	<div>
		<p>{post.preview}</p>
		<a href={`/${$locale}/blog/post/${post.slug}`}>{$t('blog.more')}</a>
	</div>
</section>

<style lang="scss">
	section {
		@apply pb-4;

		span {
			@apply text-xs text-gray-700 dark:text-gray-300 mb-[-0.1rem] block;
		}

		h3 {
			@apply text-xl whitespace-nowrap overflow-hidden text-ellipsis w-full block;
		}

		div {
			@apply flex gap-2 w-full md:w-[60%] lg:w-[50%];

			p {
				@apply text-sm truncate;
			}

			a {
				@apply text-sm whitespace-nowrap text-sky-700 gdark:text-blue-200 hover:text-blue-700 gdark:hover:text-sky-600 transition-colors;
			}
		}
	}
</style>
