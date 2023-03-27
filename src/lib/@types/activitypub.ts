export interface ActivityPubObject {
	/**
	 * Context of the object
	 */
	'@context': (string | object)[] | string | object;

	/**
	 * Type of object
	 *
	 * @example "Person"
	 * @example "Note"
	 * @example "Collection"
	 */
	type: string;

	/**
	 * Unique identifier for this object
	 *
	 * @example https://example.com/@alice
	 * @example https://example.com/@alice/123
	 * @example https://example.com/@alice/123#reply-456
	 */
	id: string;

	/**
	 * Source of the object
	 */
	source?: {
		content: string;
		mediaType: string;
	};

	attachment?: (ActivityPubObject | Link)[];

	attributedTo?: (string | ActivityPubObject | Link)[] | string | ActivityPubObject | Link;

	content?: string;

	contentMap?: { [language: string]: string };

	name?: string;

	nameMap?: { [language: string]: string };

	endTime?: string;

	generator?: ActivityPubObject | Link;

	icon?: Image | Link;

	image?: Image | Link;

	/**
	 * One or more entities this object is responding to
	 */
	inReplyTo?: (string | ActivityPubObject | Link)[] | string | ActivityPubObject | Link;

	/**
	 * One or more entities this object relates to
	 */
	location?: (ActivityPubObject | Link)[] | ActivityPubObject | Link;

	preview?: ActivityPubObject | Link;

	published?: string;

	replies?: Collection | OrderedCollection;

	startTime?: string;

	summary?: string;

	summaryMap?: { [language: string]: string };

	tag?: (ActivityPubObject | Link)[];

	updated?: string;

	url?: (Link | string)[] | Link | string;

	to?: (string | ActivityPubObject | Link)[] | string | ActivityPubObject | Link;

	bto?: (string | ActivityPubObject | Link)[] | string | ActivityPubObject | Link;

	cc?: (string | ActivityPubObject | Link)[] | string | ActivityPubObject | Link;

	bcc?: (string | ActivityPubObject | Link)[] | string | ActivityPubObject | Link;

	/**
	 * Type of the object, if empty content should be considered as text/html
	 */
	mediaType?: string;

	/**
	 * Duration of the object, expressed in XML Schema duration format
	 */
	duration?: string;
}

interface Link {
	/**
	 * Context of the object
	 */
	'@context': (string | object)[] | string | object;

	/**
	 * Type
	 */
	type: 'Link';

	href?: string;

	rel?: string;

	mediaType?: string;

	name?: string;

	hreflang?: string;

	height?: number;

	width?: number;

	preview?: Link | ActivityPubObject;
}

export interface Activity extends ActivityPubObject {
	/**
	 * Actor that performed the activity
	 */
	actor: string | ActivityPubObject | Link;

	object: ActivityPubObject;

	/**
	 * Target of the activity
	 */
	target?: (ActivityPubObject | Link)[] | ActivityPubObject | Link;

	result?: unknown;

	origin?: ActivityPubObject;

	instrument?: ActivityPubObject | ActivityPubObject[];
}

interface AbstractDocument extends ActivityPubObject {
	type: 'Document' | 'Image';
}

interface Document extends AbstractDocument {
	type: 'Document';
}

interface Image extends AbstractDocument {
	type: 'Image';
}

export interface Person extends ActivityPubObject {
	/**
	 * Unique identifier for this person
	 *
	 * @example https://example.com/@alice
	 */
	id: string;

	/**
	 * Type of object, in this case "Person"
	 */
	type: 'Person';

	/**
	 * Reference to an ActivityStreams OrderedCollection inbox
	 *
	 * @example https://example.com/@alice/inbox
	 */
	inbox: string;

	/**
	 * Reference to an ActivityStreams OrderedCollection outbox
	 *
	 * @example https://example.com/@alice/outbox
	 */
	outbox: string;

	/**
	 * Reference to an ActivityStreams OrderedCollection containing Actors the object is following
	 *
	 * @example https://example.com/@alice/following
	 */
	following: string;

	/**
	 * Reference to an ActivityStreams OrderedCollection containing Actors the object is followed by
	 *
	 * @example https://example.com/@alice/followers
	 */
	followers: string;

	/**
	 * An optional reference to an ActivityStreams OrderedCollection containing objects liked by the Actor
	 *
	 * @example https://example.com/@alice/likes
	 */
	liked?: string;

	/**
	 * A list of any other interesting collections
	 */
	streams?: string[];

	/**
	 * A preferred username for the Actor, which does not have to be unique
	 */
	preferredUsername?: string;

	/**
	 * Any other useful endpoints
	 */
	endpoints?: {
		[endpoint: string]:
			| {
					proxyUrl?: string;
					oauthAuthorizationEndpoint?: string;
					oauthTokenEndpoint?: string;
					provideClientKey?: string;
					signClientKey?: string;
					sharedInbox?: string;
			  }
			| string;
	};
}

interface AbstractCollection extends ActivityPubObject {
	type: 'Collection' | 'OrderedCollection';

	totalItems: number;

	items: ActivityPubObject[];

	current?: string;
}

export interface Collection extends AbstractCollection {
	type: 'Collection';

	first?: string;

	last?: string;
}

interface CompleteOrderedCollection extends AbstractCollection {
	type: 'OrderedCollection';
}

interface OrderedCollectionIndex extends Omit<CompleteOrderedCollection, 'items'> {
	first: string;
	last: string;
}

export type OrderedCollection = CompleteOrderedCollection | OrderedCollectionIndex;

interface CollectionPage extends Omit<Collection, 'type'> {
	type: 'CollectionPage';

	//TODO: Not completely correct
	partof: string;

	next: string;

	prev: string;
}

export interface OrderedCollectionPage
	extends Omit<CollectionPage, 'type'>,
		Omit<CompleteOrderedCollection, 'type'> {
	type: 'OrderedCollectionPage';

	startIndex: number;
}
