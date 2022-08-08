<script lang="ts">
	import LanguageIndicator from './LanguageIndicator.svelte';
	import GoRepoForked from 'svelte-icons/go/GoRepoForked.svelte';
	import GoStar from 'svelte-icons/go/GoStar.svelte';

	export let name: string;
	export let description: string;
	export let url: string;
	export let fork: boolean;
	export let parentName: string;
	export let parentUrl: string;
	export let language: string;
	export let forksCount: number;
	export let stargazersCount: number;
	export let topics: string;
	export let image: string;

	const topicsDisplay = JSON.parse(topics)
		.map((topic) => "<a href='https://github.com/topics/" + topic + "'>" + topic + '</a>')
		.join(', ');
</script>

<section>
	{#if !image.startsWith('https://avatars.githubusercontent.com/u/')}
		<img src={image} alt={name} />
	{/if}
	<a href={url} class="name">{name}</a>
	{#if language}
		<LanguageIndicator {language} />
	{/if}
	{#if forksCount > 0}
		<span><GoRepoForked />{forksCount}</span>
	{/if}
	{#if stargazersCount > 0}
		<span><GoStar />{stargazersCount}</span>
	{/if}
	{#if fork}
		<span class="fork">Forked from <a href={parentUrl}>{parentName}</a></span>
	{/if}
	{#if description}
		<p>{description}</p>
	{/if}
	{#if topicsDisplay}
		<p class="topics">
			{@html topicsDisplay}
		</p>
	{/if}
</section>

<style lang="scss">
	section {
		@apply border-[1px] border-gray-800 rounded-lg mb-1 p-1;

		img {
			@apply float-right h-20;
		}
		a {
			@apply hover:underline;
		}
		a.name {
			@apply text-xl font-bold text-blue-700 hover:text-blue-500;
		}
		span.fork {
			@apply text-xs text-gray-700 mb-[-0.1rem] block;
			a {
				@apply text-gray-600 hover:text-gray-500;
			}
		}
		p.topics {
			@apply text-gray-600;
		}

		:global(svg) {
			@apply h-5 w-5 inline fill-gray-700;
		}
	}
</style>
