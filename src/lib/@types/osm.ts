export interface Xml {
	'@_version': string;
	'@_encoding': string;
}

export interface Tag {
	'@_k': string;
	'@_v': string;
}

export interface OsmEditor {
	/**
	 * The name of the editor
	 * @type {string}
	 */
	name: string;
	/**
	 * The version of the editor
	 * @type {string|null}
	 */
	version?: string;
	/**
	 * The build number of the editor
	 * @type {string|null}
	 */
	build?: string;
	/**
	 * The locale of the editor
	 * @type {string|null}
	 */
	locale?: string;
}

export interface ParsedTags {
	source: string;
	'StreetComplete:quest_type'?: string;
	locale?: string;
	created_by: OsmEditor;
	comment: string;
	answer?: number;
	create?: number;
	theme?: string;
	host?: string;
}

export interface Changeset {
	tag: Tag[];
	parsedTags: ParsedTags;
	'@_id': string;
	'@_created_at': Date;
	'@_open': string;
	'@_comments_count': string;
	'@_changes_count': string;
	'@_closed_at': Date;
	'@_min_lat': string;
	'@_min_lon': string;
	'@_max_lat': string;
	'@_max_lon': string;
	'@_uid': string;
	'@_user': string;
}

export interface Osm {
	changeset: Changeset[];
	'@_version': string;
	'@_generator': string;
	'@_copyright': string;
	'@_attribution': string;
	'@_license': string;
}

export interface OsmRootObject {
	'?xml': Xml;
	osm: Osm;
}
