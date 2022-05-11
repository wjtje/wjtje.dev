import type { Changeset, OsmRootObject, ParsedTags } from '$lib/@types/osm';
import { XMLParser } from 'fast-xml-parser';
import { parseOsmEditor } from './parseOsmEditor';

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

	const length = osmXml.osm.changeset.length < 10 ? osmXml.osm.changeset.length : 10;

	for (let i = 0; i < length; i++) {
		const changeset = osmXml.osm.changeset[i];
		const tags: ParsedTags = {
			comment: '',
			created_by: {
				name: 'Unknown editor'
			},
			source: ''
		};

		changeset.tag.forEach((element) => {
			if (element['@_k'] === 'created_by') {
				tags.created_by = parseOsmEditor(element['@_v']);
			} else {
				tags[element['@_k']] = element['@_v'];
			}
		});

		responseChangesets.push({
			...changeset,
			parsedTags: tags as ParsedTags
		});
	}

	return responseChangesets;
};
