<script lang="ts">
	import LanguageIndicator from './LanguageIndicator.svelte';

	export let name: string;
	export let description: string;
	export let url: string;
	export let fork: boolean;
	export let parentName: string;
	export let parentUrl: string;
	export let language: string;
	export let topics: string;

	const topicsDisplay = JSON.parse(topics)
		.map((topic) => "<a href='https://github.com/topics/" + topic + "'>" + topic + '</a>')
		.join(', ');
</script>

<section>
	<a href={url} class="name">{name}</a>
	{#if language}
		<LanguageIndicator {language} />
	{/if}
	{#if fork}
		<span class="fork">Forked from <a href={parentUrl} class="fork">{parentName}</a></span>
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
	}
	a {
		@apply hover:underline;
	}
	a.name {
		@apply text-xl font-bold text-blue-700 hover:underline hover:text-blue-500;
	}
	a.fork {
		@apply text-gray-600 hover:text-gray-500;
	}
	span {
		@apply text-xs text-gray-700 mb-[-0.1rem] block;
	}
	p.topics {
		@apply text-gray-600;
	}
</style>
