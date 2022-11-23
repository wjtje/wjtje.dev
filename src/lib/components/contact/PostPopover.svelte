<script lang="ts">
	import ActivityList from '../home/ActivityList.svelte';

	export let active: boolean = false;
	export let type: string;

	export function toggle() {
		active = !active;
		console.log('Toggling');
	}
</script>

<span hidden={!active} class="border-2 rounded-lg p-2 text-white"
	><ActivityList activityName={type} /></span
>
