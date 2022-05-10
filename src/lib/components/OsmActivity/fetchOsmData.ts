import type { Changeset, OsmRootObject, ParsedTags } from '$lib/@types/osm';
import { XMLParser } from 'fast-xml-parser';

export const fetchOsmData = async (displayName: string): Promise<Changeset[]> => {
	// Fetch the data from the OSM API
	const response = await fetch(
		`https://api.allorigins.win/get?url=${encodeURIComponent(
			`https://openstreetmap.org/api/0.6/changesets?display_name=${displayName}`
		)}`
	);

	const parser = new XMLParser({
		ignoreAttributes: false
	});

	const osmXml: OsmRootObject = parser.parse(String((await response.json())?.contents) ?? '');

	// Parse the data
	const responseChangesets: Changeset[] = [];

	let length = osmXml.osm.changeset.length < 10 ? osmXml.osm.changeset.length : 10;

	for (let i = 0; i < length; i++) {
		const changeset = osmXml.osm.changeset[i];
		let tags = {};

		changeset.tag.forEach((element) => {
			tags[element['@_k']] = element['@_v'];
		});

		responseChangesets.push({
			...changeset,
			parsedTags: tags as ParsedTags
		});
	}

	return responseChangesets;
};
