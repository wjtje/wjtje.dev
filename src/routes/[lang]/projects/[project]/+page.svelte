<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ title } = data);
</script>

<h1>{title}</h1>
