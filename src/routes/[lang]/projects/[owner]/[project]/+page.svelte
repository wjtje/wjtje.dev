<script lang="ts">
	import type { PageData } from './$types';
	import Markdown from 'svelte-exmarkdown';
	import LargeGitHubButton from '$lib/components/projects/LargeGitHubButton.svelte';
	export let data: PageData;

	const link = `https://github.com/${data.repo.owner}/${data.repo.name}`;
</script>

<h1>{data.title}</h1>

<LargeGitHubButton {link} />

<div class="markdown">
	<Markdown md={data.body} />
</div>
