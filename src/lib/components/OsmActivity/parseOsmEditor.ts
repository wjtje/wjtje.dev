import type { OsmEditor } from '$lib/@types/osm';

export const parseOsmEditor = (editor: string): OsmEditor => {
	const result = new RegExp(
		/(?<name>[a-zA-Z]+)[ /](?<version>[0-9.]+)[ (]*(?<build>[0-9]*) *(?<locale>[a-z_A-Z]*)\)*/
	).exec(editor);

	return {
		name: result?.groups?.name ?? 'Unknown editor',
		...result.groups
	};
};
