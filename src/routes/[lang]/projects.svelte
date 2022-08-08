<script lang="ts">
	import RepositoryList from '$lib/components/projects/RepositoryList.svelte';
	import { t } from '$lib/i18n';
</script>

<svelte:head>
	<title>{$t('common.title')} - {$t('projects.title')}</title>
	<meta name="description" content={$t('projects.temp')} />
</svelte:head>

<h1>{$t('projects.title')}</h1>

<p>
	{@html $t('projects.temp')}
</p>

<p>
	<RepositoryList />
</p>
