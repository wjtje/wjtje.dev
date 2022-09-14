<script lang="ts">
	import type { PageData } from './$types';
	import Markdown from 'svelte-exmarkdown';

	export let data: PageData;
</script>

<h1>{data.title}</h1>

<div class="markdown">
	<Markdown md={data.body} />
</div>
