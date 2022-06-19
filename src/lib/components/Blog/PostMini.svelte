<script lang="ts">
	import type { Post, User } from '@prisma/client';

	export let post: Post & {
		author: User;
	};
</script>

<section>
	<h2>{post.title}</h2>
	<div>
		<p>{post.body}</p>
		<a>Read more</a>
	</div>
</section>

<style lang="scss">
	section {
		@apply pb-2;

		h2 {
			@apply text-xl;
		}

		div {
			@apply flex gap-2 w-full md:w-[60%] lg:w-[50%];

			p {
				@apply truncate;
			}

			a {
				@apply whitespace-nowrap text-sky-700 gdark:text-blue-200 hover:text-blue-700 gdark:hover:text-sky-600 transition-colors;
			}
		}
	}
</style>
