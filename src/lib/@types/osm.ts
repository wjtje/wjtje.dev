export interface Xml {
	'@_version': string;
	'@_encoding': string;
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
	/**
	 * ID of the changeset
	 * URL: https://www.openstreetmap.org/changeset/{id}
	 *
	 * @example 129131578
	 */
	id: number;

	/**
	 * Date when the changeset was created
	 */
	created_at: Date;

	/**
	 * Whether this changeset is still open
	 */
	open: boolean;

	/**
	 * How many comments this changeset has
	 */
	comments_count: number;

	/**
	 * How many changes this changeset contains
	 */
	changes_count: number;

	/**
	 * When the changeset was closed
	 */
	closed_at: Date;

	/**
	 * Minimum latitude of the changeset
	 */
	min_lat: number;

	/**
	 * Minimum longitude of the changeset
	 */
	min_lon: number;

	/**
	 * Maximum latitude of the changeset
	 */
	max_lat: number;

	/**
	 * Maximum longitude of the changeset
	 */
	max_lon: number;

	/**
	 * UID of the user who created this changeset
	 */
	uid: number;

	/**
	 * Username of the user who created this changeset
	 */
	user: string;

	/**
	 * Object containing the tags of the changeset
	 */
	tags: { [key: string]: string };

	/**
	 * Object containing the parsed tags of the changeset
	 */
	parsedTags?: ParsedTags;

	/**
	 * Geocoded location
	 */
	geocodedLocation?: string;
}

export interface Osm {
	/**
	 * Version of the API
	 *
	 * @example "0.6"
	 */
	version: string;

	/**
	 * Generator of the response
	 *
	 * @example "OpenStreetMap server"
	 */
	generator: string;

	/**
	 * Copyright of the response
	 *
	 * @example "OpenStreetMap and contributors"
	 */
	copyright: string;

	/**
	 * Attribution URL of the response
	 *
	 * @example "http://www.openstreetmap.org/copyright"
	 */
	attribution: string;

	/**
	 * URL for the license of the response
	 *
	 * @example "http://opendatacommons.org/licenses/odbl/1-0/"
	 */
	license: string;

	/**
	 * Object containing all changesets
	 */
	changesets: Changeset[];
}

/**
 * Nominatim response in JSON v2 format
 */
export interface NominatimResponse {
	place_id: number;
	license: string;
	osm_type: string;
	osm_id: number;
	lat: string;
	lon: string;
	place_rank: number;
	category: string;
	type: string;
	importance: number;
	addresstype: string;
	name: string | null;
	display_name: string;
	address: {
		house_number: string;
		highway?: string;
		road: string;
		village: string;
		municipality?: string;
		state_district?: string;
		state: string;
		'ISO3166-2-lv14': string;
		country: string;
		postcode: string;
		country_code: string;
	};
	boundingbox: [number, number, number, number];
}
