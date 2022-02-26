<script lang="ts">
	import Profile from '$lib/components/Profile.svelte';
	import { t } from '$lib/i18n';
</script>

<svelte:head>
	<title>{$t('head.title')}</title>
	<meta name="description" content={$t('head.description')} />
</svelte:head>

<Profile />
