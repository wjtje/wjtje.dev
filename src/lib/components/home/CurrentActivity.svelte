<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		progress = -1,
		image,
		title,
		titleLink,
		subtitle
	}: {
		progress?: number;
		image?: Snippet;
		title: string;
		titleLink?: string;
		subtitle?: Snippet;
	} = $props();
</script>

<span class="item">
	{#if image}
		<span class="image">
			{@render image()}
		</span>
	{/if}
	<span class="details">
		<span class="title">
			{#if titleLink}
				<a href={titleLink}>
					{title}
				</a>
			{:else}
				<h2>{title}</h2>
			{/if}
		</span>
		{#if subtitle}
			<span class="subtitle">
				{@render subtitle()}
			</span>
		{/if}
		{#if progress >= 0}
			<span class="progress">
				<progress value={progress} max="1"></progress>
				<p>{Math.round(progress * 100)}%</p>
			</span>
		{/if}
	</span>
</span>

<style lang="scss">
	.item {
		@apply flex flex-row gap-4 p-4 rounded-lg gdark:bg-zinc-800 bg-zinc-200;

		.image {
			@apply w-16 h-16;
		}

		.details {
			@apply flex flex-col;

			.title {
				@apply text-xl font-bold;

				a {
					@apply text-sky-700 gdark:text-blue-200 hover:text-blue-700 gdark:hover:text-sky-600 transition-colors;
				}
			}

			.subtitle {
				@apply text-sm;
			}

			.progress {
				@apply flex flex-row items-center gap-2;
			}
		}
	}
</style>
