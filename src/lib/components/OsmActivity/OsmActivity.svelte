<script lang="ts">
	import { onMount } from 'svelte';
	import { XMLParser } from 'fast-xml-parser';
	import ActivityLoader from '../ActivityLoader.svelte';
	import type { Changeset, OsmRootObject, ParsedTags } from '$lib/@types/osm';
	import { scale } from 'svelte/transition';
	import { t } from '$lib/i18n';
	import ActivityItem from './ActivityItem.svelte';

	onMount(async () => {
		const response = await fetch(
			`https://api.allorigins.win/get?url=${encodeURIComponent(
				'https://openstreetmap.org/api/0.6/changesets?display_name='
			)}wjtje`
		);

		const xmlString: string | null = String((await response.json())?.contents) ?? null;
		status = response.status;

		if (xmlString) {
			const parser = new XMLParser({
				ignoreAttributes: false
			});

			const xml: OsmRootObject = parser.parse(xmlString);
			let length = xml.osm.changeset.length < 10 ? xml.osm.changeset.length : 10;

			for (let i = 0; i < length; i++) {
				const changeset = xml.osm.changeset[i];
				let tags = {};

				changeset.tag.forEach((element) => {
					tags[element['@_k']] = element['@_v'];
				});

				changesets.push({
					...changeset,
					parsedTags: tags as ParsedTags
				});
			}
		}
	});

	let changesets: Changeset[] = [];
	let status: number;
</script>

{#if status == undefined}
	<ActivityLoader />
{:else if status == 200}
	{#each changesets as changeset, i}
		<div in:scale={{ duration: 400, delay: i * 50 }}>
			<ActivityItem {changeset} />
		</div>
	{/each}
{:else}
	<h3>{$t('OsmActivity.LoadFailed', { status: status })}</h3>
{/if}
