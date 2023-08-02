import type { Changeset, OsmEditor, Osm, ParsedTags, NominatimResponse } from '$lib/@types/osm';

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

		const geocodedLocation = await geocodeChangeset(changeset);

		responseChangesets.push({
			...changeset,
			parsedTags: tags as ParsedTags,
			geocodedLocation
		});
	}

	return responseChangesets;
};

const geocodeChangeset = async (changeset: Changeset): Promise<string> => {
	console.log(`[osm.ts] Determining location for ${changeset.id}`);

	// Check if we actually have a bounding box
	if (!changeset.max_lat || !changeset.max_lon || !changeset.min_lat || !changeset.min_lon) {
		console.log(`[osm.ts] No bounding box for ${changeset.id}`);
		return 'World';
	}

	const avgLon = (changeset.max_lon + changeset.min_lon) / 2;
	const avgLat = (changeset.max_lat + changeset.min_lat) / 2;

	const url = `https://nominatim.openstreetmap.org/reverse?lat=${avgLat}&lon=${avgLon}&format=jsonv2`;
	const response = await fetch(url);
	const result = (await response.json()) as NominatimResponse;

	const location =
		result.address.village ??
		result.address.municipality ??
		result.address.state_district ??
		result.address.country;

	console.log(`[osm.ts] Determined location for ${changeset.id}: ${location}`);

	return location;
};
