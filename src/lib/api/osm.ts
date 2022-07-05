import type { Changeset, OsmEditor, OsmRootObject, ParsedTags } from '$lib/@types/osm';
import { OSMUsername } from '$lib/common';
import { XMLParser } from 'fast-xml-parser';

export const parseOsmEditor = (editor: string): OsmEditor => {
	const result = new RegExp(
		/(?<name>[a-zA-Z]+)[ /](?<version>[0-9.]+)[ (]*(?<build>[0-9]*) *(?<locale>[a-z_A-Z]*)\)*/
	).exec(editor);

	return {
		name: result?.groups?.name ?? 'Unknown editor',
		...result.groups
	};
};

export const fetchOsmData = async (): Promise<Changeset[]> => {
	// Get new data from osm
	const response = await fetch(
		`https://api.allorigins.win/get?url=${encodeURIComponent(
			`https://openstreetmap.org/api/0.6/changesets?display_name=${OSMUsername}`
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
