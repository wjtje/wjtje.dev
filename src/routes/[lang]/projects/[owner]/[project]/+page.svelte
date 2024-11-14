<script lang="ts">
	import type { PageData } from './$types';
	import Markdown from 'svelte-exmarkdown';
	import GitHubButton from './GitHubButton.svelte';
	export let data: PageData;

	const link = `https://github.com/${data.repo.owner}/${data.repo.name}`;
</script>

<main>
	<h1>{data.title}</h1>

	<GitHubButton {link} type="large" />

	<div class="markdown">
		<Markdown md={data.body} />
	</div>
</main>

<style lang="scss">
	div.markdown {
		@apply mt-4;
	}
</style>
