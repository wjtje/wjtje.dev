import type { Changeset, OsmEditor, Osm, ParsedTags } from '$lib/@types/osm';

/**
 * This function tries to decode the `created_by` key to a useable format.
 *
 * @param editor The editor string as provided by the `created_by` key
 * @returns {OsmEditor} An object where the editor's name, version, buildnumber, and locale is decoded.
 */
export const parseOsmEditor = (editor: string): OsmEditor => {
	const result = new RegExp(
		/(?<name>[a-zA-Z !\-_.]+(?=[ /]))[ /]*(?<version>[\d\w-.]+)*[ (]*(?<build>[\d]*) *(?<locale>[\w_]*)\)*/
	).exec(editor);

	return {
		name: result?.groups?.name ?? 'Unknown editor',
		...result.groups
	};
};

/**
 * This function fetches the latest changesets from openstreetmap and parces the json data.
 * @returns {Changeset[]} A list of changesets
 */
export const fetchOsmData = async (): Promise<Changeset[]> => {
	// Get new data from osm
	const response = await fetch(
		`https://openstreetmap.org/api/0.6/changesets.json?display_name=${process.env['OSM_USERNAME']}`
	);

	if (response.status != 200) {
		throw 'Faulty response';
	}

	const osmJson: Osm = await response.json();

	// Parse the data
	const responseChangesets: Changeset[] = [];

	const length = osmJson.changesets.length < 10 ? osmJson.changesets.length : 10;

	for (let i = 0; i < length; i++) {
		const changeset = osmJson.changesets[i];
		const tags: ParsedTags = {
			comment: '',
			created_by: {
				name: 'Unknown editor'
			},
			source: ''
		};

		Object.keys(changeset.tags).forEach((key) => {
			if (key == 'created_by') {
				tags.created_by = parseOsmEditor(changeset.tags[key]);
			} else {
				tags[key] = changeset.tags[key];
			}
		});

		responseChangesets.push({
			...changeset,
			parsedTags: tags as ParsedTags
		});
	}

	return responseChangesets;
};
