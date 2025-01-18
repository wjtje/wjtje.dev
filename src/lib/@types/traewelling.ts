export interface StatusAPIResponse {
	data: Status[];
	links: Links;
	meta: PaginationMeta;
}

interface Status {
	/**
	 * @example 12345
	 */
	id: number;

	/**
	 * @example "Hello world!"
	 */
	body: string;

	/**
	 * Mentions in the status body
	 */
	bodyMentions: Mention[];

	/**
	 * @example 1
	 */
	user: number;

	/**
	 * @example "Gertrud123"
	 */
	username: string;

	/**
	 * @example "https://traewelling.de/@Gertrud123/picture"
	 */
	profilePicture: string;

	/**
	 * @example false
	 */
	preventIndex: boolean;

	/**
	 * Business
	 * What type of travel (0 = private, 1 = business, 2 = commute) did the user specify?
	 * @example 0
	 */
	business: 0 | 1 | 2;

	/**
	 * Visibility
	 * What type of visibility (0 = public, 1 = unlisted, 2 = followers, 3 = private, 4 = authenticated) did the user specify?
	 */
	visibility: 0 | 1 | 2 | 3 | 4;

	/**
	 * How many people have liked this status
	 * @example 12
	 */
	likes: number;

	/**
	 * Did the currently authenticated user like this status? (if unauthenticated = false)
	 * @example true
	 */
	liked: boolean;

	/**
	 * Do the author of this status and the currently authenticated user allow liking of statuses? Only show the like UI if set to true.
	 * @example true
	 */
	isLikable: boolean;

	client: Client;

	/**
	 * Creation date of this status
	 * @example "2022-07-17T13:37:00+02:00"
	 */
	createdAt: string;

	train: TransportResource;

	event: Event | null;

	userDetails: LightUser;

	tags: StatusTagResource[];
}

/**
 * Mentioned user and position in status body
 */
interface Mention {
	user: User;

	/**
	 * Position
	 * @example 0
	 */
	position: number;

	/**
	 * Length
	 * @example 4
	 */
	length: number;
}

/**
 * User model
 */
interface User {
	/**
	 * @example 12345
	 */
	id: number;

	/**
	 * Display name of the user
	 * @example "Gertrud"
	 */
	displayName: string;

	/**
	 * Username of user
	 * @example "Gertrud123"
	 */
	username: string;

	/**
	 * @example "https://traewelling.de/@Gertrud123/picture"
	 */
	profilePicture: string;

	/**
	 * Distance travelled by train in meters
	 * @example 12345
	 */
	trainDistance: number;

	/**
	 * Duration travelled by train in minutes
	 * @example 6
	 */
	trainDuration: number;

	/**
	 * @example 300
	 */
	points: number;

	/**
	 * @example "https://chaos.social/@traewelling"
	 */
	mastodonUrl: string | null;

	/**
	 * @example false
	 */
	privateProfile: boolean;

	/**
	 * Does this profile allow likes?
	 * Only offer the UI to like any status if this setting is set to true.
	 * If set to false, the likes API will return 403.
	 * @example true
	 */
	likes_enabled: boolean;

	/**
	 * Can the currently authenticated user see the statuses of this user?
	 * @example false
	 */
	userInvisibleToMe: boolean;

	/**
	 * Is this user muted by the currently authenticated user?
	 * @example false
	 */
	muted: boolean;

	/**
	 * Does the currently authenticated user follow this user?
	 * @example false
	 */
	following: boolean;

	/**
	 * Is there a currently pending follow request?
	 * @example false
	 */
	followPending: boolean;

	/**
	 * Is the user following you?
	 * @example false
	 */
	followedBy: boolean;

	/**
	 * Did the user choose to prevent search engines from indexing their profile?
	 * @example false
	 */
	preventIndex: boolean;
}

interface Client {
	/**
	 * @example 1
	 */
	id: number;

	/**
	 * @example "Träwelling App"
	 */
	name: string;

	/**
	 * @example "https://traewelling.de/privacy-policy"
	 */
	privacyPolicyUrl: string;
}

interface TransportResource {
	/**
	 * @example 4711
	 */
	trip: number;

	/**
	 * @example "1|1234|567"
	 */
	hafasId: string;

	/**
	 * Category of transport
	 * @example "suburban"
	 */
	category:
		| 'nationalExpress'
		| 'national'
		| 'regionalExp'
		| 'regional'
		| 'suburban'
		| 'bus'
		| 'ferry'
		| 'subway'
		| 'tram'
		| 'taxi'
		| 'plane';

	/**
	 * Internal number of the journey
	 * @example "4-a6s8-8"
	 */
	number: string;

	/**
	 * @example "S 1"
	 */
	lineName: string;

	/**
	 * @example "85639"
	 */
	journeyNumber: number;

	/**
	 * Distance in meters
	 * @example 10000
	 */
	distance: number;

	/**
	 * @example 37
	 */
	points: number;

	/**
	 * Duration in minutes
	 * @example 30
	 */
	duration: number;

	/**
	 * @example "2022-07-17T13:37:00+02:00"
	 */
	manualDeparture: string | null;

	/**
	 * @example "2022-07-17T13:37:00+02:00"
	 */
	manualArrival: string | null;

	origin: StopoverResource;

	destination: StopoverResource;

	operator: OperatorResource;
}

interface StopoverResource {
	/**
	 * @example 12345
	 */
	id: number;

	/**
	 * Name of the station
	 * @example "Karlsruhe Hbf"
	 */
	name: string;

	/**
	 * Identifier specified in 'Richtlinie 100' of the Deutsche Bahn
	 * @example "RK"
	 */
	rilIdentifier: string | null;

	/**
	 * IBNR identifier of Deutsche Bahn
	 * @example "8000191"
	 */
	evaIdentifier: string | null;

	/**
	 * Currently known arrival time. Equal to arrivalReal if known. Else equal to arrivalPlanned.
	 * @example "2022-07-17T13:37:00+02:00"
	 */
	arrival: string | null;

	/**
	 * Planned arrival according to timetable records
	 * @example "2022-07-17T13:37:00+02:00"
	 */
	arrivalPlanned: string | null;

	/**
	 * Real arrival according to live data
	 * @example "2022-07-17T13:37:00+02:00"
	 */
	arrivalReal: string | null;

	/**
	 * Planned arrival platform according to timetable records
	 * @example "5"
	 */
	arrivalPlatformPlanned: string | null;

	/**
	 * Real arrival platform according to live data
	 * @example "5 A-F"
	 */
	arrivalPlatformReal: string | null;

	/**
	 * Currently known departure time. Equal to departureReal if known. Else equal to departurePlanned.
	 * @example "2022-07-17T13:37:00+02:00"
	 */
	departure: string | null;

	/**
	 * Planned departure according to timetable records
	 * @example "2022-07-17T13:37:00+02:00"
	 */
	departurePlanned: string | null;

	/**
	 * Real departure according to live data
	 * @example "2022-07-17T13:37:00+02:00"
	 */
	departureReal: string | null;

	/**
	 * Planned departure platform according to timetable records
	 * @example "5"
	 */
	departurePlatformPlanned: string | null;

	/**
	 * Real departure platform according to live data
	 * @example "5 A-F"
	 */
	departurePlatformReal: string | null;

	/**
	 * @example "5 A-F"
	 */
	plaform: string | null;

	/**
	 * Is there a delay in the arrival time?
	 * @example false
	 */
	isArrivalDelayed: boolean;

	/**
	 * Is there a delay in the departure time?
	 * @example false
	 */
	isDepartureDelayed: boolean;

	/**
	 * Is this stopover cancelled?
	 * @example false
	 */
	cancelled: boolean;
}

interface OperatorResource {
	/**
	 * @example 1
	 */
	id: number;

	/**
	 * @example "db-regio-ag-nord"
	 */
	identifier: string;

	/**
	 * @example "DB Regio AG Nord"
	 */
	name: string;
}

interface Event {
	/**
	 * @example 39
	 */
	id: number;

	/**
	 * @example "9-Euro-Ticket"
	 */
	name: string;

	/**
	 * @example "9_euro_ticket"
	 */
	slug: string;

	/**
	 * @example "NeunEuroTicket"
	 */
	hashtag: string;

	/**
	 * @example "9-Euro-Ticket GmbH"
	 */
	host: string;

	/**
	 * @example "https://9-euro-ticket.de"
	 */
	url: string;

	/**
	 * @example "2022-01-02T00:00:00+00:00"
	 */
	begin: string;

	/**
	 * @example "2022-01-02T00:00:00+00:00"
	 */
	end: string;

	station: Station;
}

interface Station {
	/**
	 * @example 4711
	 */
	id: number;

	/**
	 * @example "Karlsruhe Hbf"
	 */
	name: string;

	/**
	 * @example 48.991591
	 */
	latitude: number;

	/**
	 * @example 8.400538
	 */
	longitude: number;

	/**
	 * @example 8000191
	 */
	ibnr: number;

	/**
	 * Identifier specified in 'Richtlinie 100' of the Deutsche Bahn
	 * @example "RK"
	 */
	rilIdentifier: string | null;
}

interface LightUser {
	/**
	 * @example 1
	 */
	id: number;

	/**
	 * @example "Gertrud"
	 */
	displayName: string;

	/**
	 * @example "Gertrud123"
	 */
	username: string;

	/**
	 * @example "https://traewelling.de/@Gertrud123/picture"
	 */
	profilePicture: string;

	/**
	 * @example "https://chaos.social/@traewelling"
	 */
	mastodonUrl: string;

	/**
	 * @example false
	 */
	preventIndex: boolean;
}

interface StatusTagResource {
	/**
	 * @example "trwl:vehicle_number"
	 */
	key: string;

	/**
	 * @example "94 80 0450 921 D-AVG"
	 */
	value: string;

	/**
	 * @example 1
	 */
	visibility: 0 | 1 | 2 | 3 | 4;
}

/**
 * Pagination links
 */
interface Links {
	/**
	 * URL to the first page of this pagination
	 * @example "https://api.traewelling.de/api/v1/ENDPOINT?page=1"
	 */
	first: string | null;

	/**
	 * URL to the last page of this pagination (mostly null)
	 * @example "https://api.traewelling.de/api/v1/ENDPOINT?page=2"
	 */
	last: string | null;

	/**
	 * URL to the previous page of this pagination (mostly null)
	 * @example "https://api.traewelling.de/api/v1/ENDPOINT?page=1"
	 */
	prev: string | null;

	/**
	 * URL to the next page of this pagination (mostly null)
	 * @example "https://api.traewelling.de/api/v1/ENDPOINT?page=3"
	 */
	next: string | null;
}

/**
 * Pagination meta data
 */
interface PaginationMeta {
	/**
	 * Currently displayed page in the pagination
	 * @example 2
	 */
	current_page: number;

	/**
	 * The first element on this page is the nth element of the query
	 * @example 16
	 */
	from: number;

	/**
	 * The path of this pagination
	 * @example "https://api.traewelling.de/api/v1/ENDPOINT"
	 */
	path: string;

	/**
	 * The amount of items per page in this pagination
	 * @example 15
	 */
	per_page: number;

	/**
	 * The last element on this page is the nth element of the query
	 * @example 30
	 */
	to: number;
}
