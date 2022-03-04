<script>
	import ActivityItem from './ActivityItem.svelte';
</script>

<section>
	<h1>Github activity</h1>

	<ActivityItem />
	<ActivityItem />
</section>

<style lang="scss">
	h1 {
		@apply text-3xl pb-2;
	}
</style>
