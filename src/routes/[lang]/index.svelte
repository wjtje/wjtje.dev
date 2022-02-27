<script lang="ts">
	import Profile from '$lib/components/Profile.svelte';
	import { t } from '$lib/i18n';
</script>

<svelte:head>
	<title>{$t('common.title')}</title>
	<meta name="description" content={$t('common.description')} />
</svelte:head>

<Profile />
