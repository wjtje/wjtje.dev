<script lang="ts">
	import { t } from '$lib/i18n';
</script>

<h1>{$t('projects.title')}</h1>

<p>
	{@html $t('projects.temp')}
</p>

<style lang="scss">
	h1 {
		@apply text-4xl pb-3;
	}
</style>
