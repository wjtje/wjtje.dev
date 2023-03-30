/**
 * Represents a status posted by an account
 *
 * @see https://docs.joinmastodon.org/entities/Status/
 */
export interface Status {
	/**
	 * The ID of the status in the database
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#id
	 */
	id: string;

	/**
	 * URI of the status for federation
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#uri
	 */
	uri: string;

	/**
	 * The date when this status was created
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#created_at
	 */
	created_at: string;

	/**
	 * The account that authored this status
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#account
	 */
	account: Account;

	/**
	 * HTML-encoded status content
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#content
	 */
	content: string;

	/**
	 * Visibility of the status
	 *
	 * One of: public, unlisted, private, direct
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#visibility
	 */
	visibility: 'public' | 'unlisted' | 'private' | 'direct';

	/**
	 * Is this status marked as sensitive content?
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#sensitive
	 */
	sensitive: boolean;

	/**
	 * Subject or summary line, below which status content is collapsed until expanded
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#spoiler_text
	 */
	spoiler_text: string;

	/**
	 * Media that is attached to this status
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#media_attachments
	 */
	media_attachments: MediaAttachment[];

	/**
	 * The application used to post this status
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#application
	 */
	application?: {
		/**
		 * The name of the application that posted this status
		 *
		 * @see https://docs.joinmastodon.org/entities/Status/#application-name
		 */
		name: string;

		/**
		 * The website associated with the application that posted this status
		 *
		 * @see https://docs.joinmastodon.org/entities/Status/#application-website
		 */
		website: string | null;
	};

	/**
	 * Mentions of users within the status content
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#mentions
	 */
	mentions: {
		/**
		 * The account ID of the mentioned user
		 *
		 * @see https://docs.joinmastodon.org/entities/Status/#Mention-id
		 */
		id: string;
		/**
		 * The username of the mentioned user
		 *
		 * @see https://docs.joinmastodon.org/entities/Status/#Mention-username
		 */
		username: string;

		/**
		 * The location of the mentioned user's profile
		 *
		 * @see https://docs.joinmastodon.org/entities/Status/#Mention-url
		 */
		url: string;

		/**
		 * The webfinger acct: URI of the mentioned user. Equivalent to username for local users, or username@domain for remote ones.
		 *
		 * @see https://docs.joinmastodon.org/entities/Status/#Mention-acct
		 */
		acct: string;
	}[];

	/**
	 * Hashtags used within the status content
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#tags
	 */
	tags: {
		/**
		 * The value of the hashtag after the # sign
		 *
		 * @see https://docs.joinmastodon.org/entities/Status/#Tag-name
		 */
		name: string;

		/**
		 * A link to the hashtag on the instance
		 *
		 * @see https://docs.joinmastodon.org/entities/Status/#Tag-url
		 */
		url: string;
	}[];

	/**
	 * Custom emoji to be used when rendering status content
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#emojis
	 */
	emojis: CustomEmoji[];

	/**
	 * How many boosts this status has received
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#reblogs_count
	 */
	reblogs_count: number;

	/**
	 * How many favourites this status has received
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#favourites_count
	 */
	favourites_count: number;

	/**
	 * How many replies this status has received
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#replies_count
	 */
	replies_count: number;

	/**
	 * A link to the status's HTML representation
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#url
	 */
	url: string | null;

	/**
	 * ID of the status being replief to
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#in_reply_to_id
	 */
	in_reply_to_id: string | null;

	/**
	 * ID of the account that authored the status being replied to
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#in_reply_to_account_id
	 */
	in_reply_to_account_id: string | null;

	/**
	 * The status being reblogged
	 */
	reblog: Status | null;

	/**
	 * The poll attached to the status
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#poll
	 */
	poll: Poll | null;

	/**
	 * Preview card for links included within status content
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#card
	 */
	card: PreviewCard | null;

	/**
	 * Primary language of this status
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#language
	 */
	language: string | null;

	/**
	 * Plain-text source of a status.
	 * Returned instead of content when the status is deleted,
	 * so the user may redraft from the source text without the client having to reverse-engineer the original text from the HTML content.
	 */
	text: string | null;

	/**
	 * Timestamp of when the status was last edited
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#edited-at
	 */
	edited_at: string | null;

	/**
	 * If the current token has an authorized user: Have you favourited this status?
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#favourited
	 */
	favourited?: boolean;

	/**
	 * If the current token has an authorized user: Have you boosted this status?
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#reblogged
	 */
	reblogged?: boolean;

	/**
	 * If the current token has an authorized user: Have you muted notifications for this status's conversation?
	 */
	muted?: boolean;

	/**
	 * If the current token has an authorized user: Have you bookmarked this status?
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#bookmarked
	 */
	bookmarked?: boolean;

	/**
	 * If the current token has an authorized user: Have you pinned this status? Only appears if the status is pinnable.
	 *
	 * @see https://docs.joinmastodon.org/entities/Status/#pinned
	 */
	pinned?: boolean;

	/**
	 * If the current token has an authorized user: The filter and keywords that matched this status
	 */
	filtered?: boolean;
}
/**
 * Represents a user of Mastodon and their associated profile
 *
 * @see https://docs.joinmastodon.org/entities/Account/
 */
interface Account {
	/**
	 * The account ID
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#id
	 */
	id: string;

	/**
	 * The username of the account, not including the domain
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#username
	 */
	username: string;

	/**
	 * The webfinger account URI. Equal to username for local users, or username@domain for remote users.
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#acct
	 */
	acct: string;

	/**
	 * The location of the user's profile page
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#url
	 */
	url: string;

	/**
	 * The profile's display name
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#display_name
	 */
	display_name: string;

	/**
	 * The profile's bio or description
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#note
	 */
	note: string;

	/**
	 * An image icon that is shown next to statuses and in the profile
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#avatar
	 */
	avatar: string;

	/**
	 * A static version of the avatar. Equal to avatar if its value is a static image; different if avatar is an animated GIF.
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#avatar_static
	 */
	avarar_static: string;

	/**
	 * An image banner that is shown above the profile and in profile cards
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#header
	 */
	header: string;

	/**
	 * A static version of the header. Equal to header if its value is a static image; different if header is an animated GIF.
	 */
	header_static: string;

	/**
	 * Whether the account manually approves follow requests
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#locked
	 */
	locked: boolean;

	/**
	 * Additional metadata attached to a profile as name-value pairs
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#fields
	 */
	fields: Field[];

	/**
	 * Custom emoji entities to be used when rendering the profile
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#emojis
	 */
	emojis: CustomEmoji[];

	/**
	 * Indicates whether the account may perform automated actions, may not be monitored, or identifies as a robot
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#bot
	 */
	bot: boolean;

	/**
	 * Indicates that the account represents a Group actor
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#group
	 */
	group: boolean;

	/**
	 * Whether the account has opted into discovery features such as the profile directory
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#discoverable
	 */
	discoverable: boolean | null;

	/**
	 * Whether the local user has opted out being indexed by search engines
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#noindex
	 */
	noindex?: boolean | null;

	/**
	 * Indicated that the profile is currently inactive and that its user has moved to new account
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#moved
	 */
	moved?: Account | null;

	/**
	 * An extra attribute returned only when an account is suspended
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#suspended
	 */
	suspended?: boolean;

	/**
	 * An extra attribute returned only when an account is silenced. If true, indicates that the account should be hidden behing a warning screen
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#limited
	 */
	limited?: boolean;

	/**
	 * When the account was created
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#created_at
	 */
	created_at: string;

	/**
	 * When the most recent status was posted
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#last_status_at
	 */
	last_status_at: string | null;

	/**
	 * How many statuses are attached to this account
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#statuses_count
	 */
	statuses_count: number;

	/**
	 * The reported followers of this profile
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#followers_count
	 */
	followers_count: number;

	/**
	 * The reported follows of this profile
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#following_count
	 */
	following_count: number;
}

/**
 * @see https://docs.joinmastodon.org/entities/Account/#field
 */
interface Field {
	/**
	 * The key of a given field's key-value pair
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#name
	 */
	name: string;

	/**
	 * The value associated with the name key
	 *
	 * @see https://docs.joinmastodon.org/entities/Account/#value
	 */
	value: string;

	/**
	 * Timestamp of when the server verified a URL value for a rel="me" link
	 */
	verified_at: string | null;
}

/**
 * Represents a file or media attachment that can be added to a status
 *
 * @see https://docs.joinmastodon.org/entities/MediaAttachment/
 */
interface MediaAttachment {
	/**
	 * The ID of the attachment in the database
	 *
	 * @see https://docs.joinmastodon.org/entities/MediaAttachment/#id
	 */
	id: number;

	/**
	 * The type of the attachment
	 *
	 * @see https://docs.joinmastodon.org/entities/MediaAttachment/#type
	 */
	type: 'unknown' | 'image' | 'gifv' | 'video' | 'audio';

	/**
	 * The location of the original full-size attachment
	 *
	 * @see https://docs.joinmastodon.org/entities/MediaAttachment/#url
	 */
	url: string;

	/**
	 * The location of a scaled-down preview of the attachment
	 *
	 * @see https://docs.joinmastodon.org/entities/MediaAttachment/#preview_url
	 */
	preview_url: string;

	/**
	 * The location of the full-size original attachment on the remote website
	 *
	 * @see https://docs.joinmastodon.org/entities/MediaAttachment/#remote_url
	 */
	remote_url: string | null;

	/**
	 * Metadata returned by Paperclip
	 *
	 * @see https://docs.joinmastodon.org/entities/MediaAttachment/#meta
	 */
	meta: {
		focus: {
			x: number;
			y: number;
		};
		original: {
			width: number;
			height: number;
			size: string;
			aspect: number;
		};
	};

	/**
	 * Alternate text that describes what is in the media attachment,
	 * to be used for the visually impaired or when the media attachments do not load
	 *
	 * @see https://docs.joinmastodon.org/entities/MediaAttachment/#description
	 */
	description: string;

	/**
	 * A hash computed by the BlurHash algorithm,
	 * for generating colorful preview thumbnails when media has not been downloaded yet
	 *
	 * @see https://docs.joinmastodon.org/entities/MediaAttachment/#blurhash
	 * @see https://github.com/woltapp/blurhash
	 */
	blurhash: string;

	/**
	 * A shorter URL for the attachment
	 *
	 * @see https://docs.joinmastodon.org/entities/MediaAttachment/#text_url
	 * @deprecated
	 */
	text_url: string | null;
}

/**
 * Represents a custom emoji.
 *
 * @see https://docs.joinmastodon.org/entities/CustomEmoji/
 */
interface CustomEmoji {
	/**
	 * The name of the custom emoji
	 *
	 * @see https://docs.joinmastodon.org/entities/CustomEmoji/#shortcode
	 */
	shortcode: string;

	/**
	 * A link to the custom emoji
	 *
	 * @see https://docs.joinmastodon.org/entities/CustomEmoji/#url
	 */
	url: string;

	/**
	 * A link to a static copy of the custom emoji
	 *
	 * @see https://docs.joinmastodon.org/entities/CustomEmoji/#static_url
	 */
	static_url: string;

	/**
	 * Whether this Emoji should be visible in the picker or unlisted
	 *
	 * @see https://docs.joinmastodon.org/entities/CustomEmoji/#visible_in_picker
	 */
	visible_in_picker: boolean;

	/**
	 * Used for sorting custom emoji in the picker
	 *
	 * @see https://docs.joinmastodon.org/entities/CustomEmoji/#category
	 */
	category: string;
}

/**
 * Represents a poll attached to a status
 *
 * @see https://docs.joinmastodon.org/entities/Poll/
 */
interface Poll {
	/**
	 * The ID of the poll in the database
	 *
	 * @see https://docs.joinmastodon.org/entities/Poll/#id
	 */
	id: number;

	/**
	 * When the poll ends
	 *
	 * @see https://docs.joinmastodon.org/entities/Poll/#expires_at
	 */
	expires_at: string | null;

	/**
	 * Is the poll currently expired?
	 *
	 * @see https://docs.joinmastodon.org/entities/Poll/#expired
	 */
	expired: boolean;

	/**
	 * Does the poll allow multiple-choice answers?
	 *
	 * @see https://docs.joinmastodon.org/entities/Poll/#multiple
	 */
	multiple: boolean;

	/**
	 * How many votes have been received?
	 *
	 * @see https://docs.joinmastodon.org/entities/Poll/#votes_count
	 */
	votes_count: number;

	/**
	 * How many unique accounts have voted on a multiple-choice poll.
	 *
	 * @see https://docs.joinmastodon.org/entities/Poll/#voters_count
	 */
	voters_count: number | null;

	/**
	 * Possible answers for the poll
	 *
	 * @see https://docs.joinmastodon.org/entities/Poll/#options
	 */
	options: {
		/**
		 * The text value of the poll option
		 *
		 * @see https://docs.joinmastodon.org/entities/Poll/#option-title
		 */
		title: string;

		/**
		 * The total number of received votes for this option
		 *
		 * @see https://docs.joinmastodon.org/entities/Poll/#option-votes-count
		 */
		votes_count: number;
	}[];

	/**
	 * When called with a user token, has the authorized user voted?
	 *
	 * @see https://docs.joinmastodon.org/entities/Poll/#voted
	 */
	voted?: boolean;

	/**
	 * When called with a user token, which options has the authorized user chosen?
	 * Contains an array of index values for options.
	 */
	own_votes?: number[];
}

/**
 * Represents a rich preview card that is generated using OpenGraph tags from a URL
 *
 * @see https://docs.joinmastodon.org/entities/PreviewCard/
 */
interface PreviewCard {
	/**
	 * Location of linked resource
	 *
	 * @see https://docs.joinmastodon.org/entities/PreviewCard/#url
	 */
	url: string;

	/**
	 * Title of linked resource
	 *
	 * @see https://docs.joinmastodon.org/entities/PreviewCard/#title
	 */
	title: string;

	/**
	 * Description of preview
	 *
	 * @see https://docs.joinmastodon.org/entities/PreviewCard/#description
	 */
	description: string;

	/**
	 * The type of preview card
	 *
	 * @see https://docs.joinmastodon.org/entities/PreviewCard/#type
	 */
	type: 'link' | 'photo' | 'video' | 'rich';

	/**
	 * The author of the original resource
	 *
	 * @see https://docs.joinmastodon.org/entities/PreviewCard/#author_name
	 */
	author_name: string;

	/**
	 * A link to the author of the original resource
	 *
	 * @see https://docs.joinmastodon.org/entities/PreviewCard/#author_url
	 */
	author_url: string;

	/**
	 * The provider of the original resource
	 *
	 * @see https://docs.joinmastodon.org/entities/PreviewCard/#provider_name
	 */
	provider_name: string;

	/**
	 * A link to the provider of the original resource
	 *
	 * @see https://docs.joinmastodon.org/entities/PreviewCard/#provider_url
	 */
	provider_url: string;

	/**
	 * HTML to be used for generating the preview card
	 *
	 * @see https://docs.joinmastodon.org/entities/PreviewCard/#html
	 */
	html: string;

	/**
	 * Width of preview, in pixels
	 *
	 * @see https://docs.joinmastodon.org/entities/PreviewCard/#width
	 */
	width: number;

	/**
	 * Height of preview, in pixels
	 *
	 * @see https://docs.joinmastodon.org/entities/PreviewCard/#height
	 */
	height: number;

	/**
	 * Preview thumbnail
	 *
	 * @see https://docs.joinmastodon.org/entities/PreviewCard/#image
	 */
	image: string | null;

	/**
	 * Used for photo embeds, instead of custom html
	 */
	embed_url: string;

	/**
	 * A hash computed by the BlurHash algorithm,
	 * for generating colorful preview thumbnails when the media has not yet been downloaded yet
	 *
	 * @see https://docs.joinmastodon.org/entities/PreviewCard/#blurhash
	 * @see https://github.com/woltapp/blurhash
	 */
	blurhash: string;
}
