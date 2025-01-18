<script lang="ts">
	import CurrentActivity from './CurrentActivity.svelte';
	import { locale } from '$lib/i18n';

	const getDataFromServer = async (lang: string) => {
		const response = await fetch(`/api/activity.json?lang=${lang}`);
		return {
			status: response.status,
			activities: await response.json()
		};
	};

	$: request = getDataFromServer($locale);

	const formatSubtitle = (subtitle: string, start: string) => {
		const timeMinutes = (new Date().getTime() - new Date(start).getTime()) / 1000 / 60;
		const durationReadable =
			timeMinutes < 60
				? `${Math.round(timeMinutes)} min`
				: `${Math.round(timeMinutes / 60)} h ${Math.round(timeMinutes % 60)} min`;
		return subtitle.replace('{durationReadable}', durationReadable);
	};

	const determineProgress = (start: Date | null, end: Date | null) => {
		if (!start || !end) return -1;
		const now = new Date().getTime();
		const startTime = new Date(start).getTime();
		const endTime = new Date(end).getTime();
		return (now - startTime) / (endTime - startTime);
	};
</script>

<section class="activities">
	{#await request then activities}
		{#each activities.activities as activity}
			<CurrentActivity
				progress={determineProgress(activity.start, activity.end)}
				title={activity.title}
				titleLink={activity.titleUrl}
			>
				{#snippet image()}
					<img src={activity.image} alt={activity.imageAlt} class="rounded-full w-full h-full" />
				{/snippet}
				{#snippet subtitle()}
					<p>{formatSubtitle(activity.subtitle, activity.start.toString())}</p>
				{/snippet}
			</CurrentActivity>
		{/each}
	{:catch error}
		<h3>{error.message}</h3>
	{/await}
</section>

<style lang="scss">
	.activities {
		@apply flex flex-row gap-4;
	}
</style>
