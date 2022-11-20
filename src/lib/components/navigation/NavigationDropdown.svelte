<script lang="ts">
	import { onMount } from 'svelte';

	import { createMedia } from 'svelte-match-media';
	import type { mediaObject } from 'svelte-match-media';
	import type { TransitionConfig } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	// Props
	export let title: string;
	export let options: string[];
	export let action: (e: number) => void;
	export let active = -1;

	// Register media querys
	let media: mediaObject;

	onMount(() => {
		media = createMedia({
			md: 'screen and (min-width: 768px)'
		}).media;
	});

	// State
	let hovering = false;
	let selected = false;
	$: expanded = (hovering && $media.md) || selected;

	// Animation
	function showAnimation(node: Element): TransitionConfig {
		// Desktop animation (e.g. fly)
		if ($media.md) {
			const duration = 50;
			const style = getComputedStyle(node);
			const target_opacity = +style.opacity;

			return {
				duration,
				easing: cubicOut,
				css: (t, u) => `
					transform: translate(0, ${(1 - t) * 50}px);
					opacity: ${target_opacity - target_opacity * u};
				`
			};
		} else {
			// Mobile animation (e.g. scale)
			const duration = 400;
			const style = getComputedStyle(node);

			return {
				duration,
				easing: cubicOut,
				css: (t, u) => `
					height: ${Number(style.height.split('px')[0]) * t}px;
				`
			};
		}
	}
</script>

<div
	on:mouseenter={() => {
		hovering = true;
	}}
	on:mouseleave={() => {
		hovering = false;
		selected = false;
	}}
	aria-expanded={expanded}
	aria-label={title}
>
	<!-- TODO: i18n the a11y -->
	<button
		on:click={() => {
			selected = !selected;
		}}
		aria-label="Expand dropdown"
	>
		<span aria-hidden="true">{title}</span>
		<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
			<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
		</svg>
	</button>

	{#if expanded}
		<ul transition:showAnimation>
			{#each options as option, index}
				<li class:active={active == index}>
					<button on:click={() => action(index)}>{option}</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	div {
		@apply md:h-full inline-block relative;

		// Give the button the correct size and positition
		button {
			@apply md:h-full inline-flex items-center;

			span {
				@apply text-lg md:text-base mr-1;
			}

			:global(svg) {
				@apply fill-current h-4 w-4;
			}
		}

		ul {
			// Set it the correct position
			@apply h-auto md:h-auto overflow-hidden md:absolute md:min-w-[6rem] md:w-fit px-4 left-[-0.5rem] md:right-0;
			// Give it the correct color and style
			@apply md:rounded-md md:shadow-md md:bg-white md:dark:bg-zinc-700;

			li {
				// Make it the correct size
				@apply h-8 my-2;
				// Center the text vertically
				@apply flex flex-col justify-center;

				@apply cursor-pointer;

				// Make the active item slightly bold
				&.active {
					@apply text-green-400 md:text-white font-semibold md:font-bold;
				}

				button {
					@apply md:text-zinc-900 md:dark:text-white text-base whitespace-nowrap;
				}
			}
		}
	}
</style>
