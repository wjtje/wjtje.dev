/**
 * Object returned when requesting a user's tweets
 * Example: https://api.twitter.com/2/users/807506429217296384/tweets
 *
 * @see https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets
 */
export interface UserTweets {
	/**
	 * List of tweets
	 */
	data: Tweet[];

	/**
	 * Object containing metadata about the request
	 */
	meta: {
		newest_id: string;
		oldest_id: string;
		result_count: number;
		next_token: string;
	};

	/**
	 * When requesting expansions they will be in this object
	 */
	includes?: {
		/**
		 * Tweets that were included in the expansion
		 * To request this add expansions=referenced_tweets.id to your request
		 */
		tweets?: Tweet[];

		/**
		 * Users that were included in the expansion
		 * To request this add expansions=author_id to your request
		 */
		users?: TwitterUser[];

		/**
		 * Places that were included in the expansion
		 * To request this add expansions=geo.place_id to your request
		 */
		places?: Place[];

		/**
		 * Media that were included in the expansion
		 * To request this add expansions=attachments.media_keys to your request
		 */
		media?: Media[];

		/**
		 * Polls that were included in the expansion
		 * To request this add expansions=attachments.poll_ids to your request
		 */
		polls?: Poll[];
	};

	errors?: unknown;
}

interface Tweet {
	/**
	 * Unique identifier of the tweet, returned as a string
	 */
	id: string;

	/**
	 * The text of the tweet
	 */
	text: string;

	/**
	 * The date the tweet was created
	 * To return this add tweet.fields=created_at to your request
	 */
	created_at?: Date;

	/**
	 * The user who posted the tweet
	 * To return this add tweet.fields=author_id to your request
	 */
	author_id?: string;

	/**
	 * Unique identifier for all versions of this tweet, returned as a string
	 */
	edit_history_tweet_ids: string[];

	/**
	 * Edit controls for the tweet
	 * To return this add tweet.fields=edit_controls to your request
	 */
	edit_controls?: {
		/**
		 * Whether the tweet is eligible for editing
		 */
		is_edit_eligible: boolean;

		/**
		 * The date until which the tweet can be edited
		 */
		editable_until: Date;

		/**
		 * The number of edits remaining for the tweet
		 */
		edits_remaining: number;
	};

	/**
	 * The ID of the original tweet of a convesation
	 * To return this add tweet.fields=conversation_id to your request
	 */
	conversation_id?: string;

	/**
	 * The ID of the tweet this tweet is replying to
	 */
	in_reply_to_user_id?: string;

	/**
	 * Referenced tweets, can be retweeted, quoted or replied_to
	 * To return this add tweet.fields=referenced_tweets to your request
	 */
	referenced_tweets?: {
		/**
		 * Type of referenced tweet, can be retweeted, quoted or replied_to
		 */
		type: string;
		/**
		 * The ID of the referenced tweet
		 * To return this add tweet.fields=referenced_tweets.id to your request
		 */
		id?: string;
	}[];

	/**
	 * Attachments for the tweet
	 * To return this add tweet.fields=attachments to your request
	 */
	attachments?: {
		/**
		 * IDs of the media attached to the tweet
		 */
		media_keys: string[];

		/**
		 * IDs of the polls attached to the tweet
		 */
		poll_ids: string[];
	};

	/**
	 * Geographical location of the tweet
	 * To return this add tweet.fields=geo to your request
	 */
	geo?: {
		/**
		 * Coordinates of the location
		 * To return this add tweet.fields=geo.coordinates to your request
		 */
		coordinates?: {
			/**
			 * Type of coordinates, can only be Point
			 */
			type: string;

			/**
			 * Coordinates of the location, if user allowed sharing exact location, null otherwise
			 */
			coordinates: number[] | null;
		};

		/**
		 * Place ID of the location
		 * To return this add tweet.fields=geo.place_id to your request
		 */
		place_id?: string;
	};

	/**
	 * Context annotations for the tweet
	 * To return this add tweet.fields=context_annotations to your request
	 */
	context_annotations?: ContextAnnotation[];

	/**
	 * Details about text with special meaning in the tweet, such as hashtags, mentions, URLs, and symbols
	 * To return this add tweet.fields=entities to your request
	 */
	entities?: {
		/**
		 * Annotations for the tweet
		 */
		annotations: {
			/**
			 * The start position (zero-based) of the annotation in the Tweet text.
			 */
			start: number;

			/**
			 * The end position (zero-based) of the annotation in the Tweet text.
			 */
			end: number;

			/**
			 * The probability that the annotation is correct.
			 */
			probability: number;

			/**
			 * Description of the type of annotation.
			 */
			type: string;

			/**
			 * The normalized version of the annotation text.
			 */
			normalized_text: string;
		}[];

		/**
		 * URLs in the tweet
		 */
		urls: {
			/**
			 * The start position (zero-based) of the URL in the Tweet text.
			 */
			start: number;

			/**
			 * The end position (zero-based) of the URL in the Tweet text.
			 */
			end: number;

			/**
			 * URL as tweeted
			 */
			url: string;

			/**
			 * Fully resolved URL
			 */
			expanded_url: string;

			/**
			 * Display URL
			 */
			display_url: string;

			/**
			 * Full destination URL
			 */
			unwound_url: string;
		}[];

		/**
		 * Hashtags in the tweet
		 */
		hashtags: {
			/**
			 * The start position (zero-based) of the hashtag in the Tweet text.
			 */
			start: number;

			/**
			 * The end position (zero-based) of the hashtag in the Tweet text.
			 */
			end: number;

			/**
			 * The hashtag, minus the leading '#'
			 * character.
			 */
			tag: string;
		}[];

		/**
		 * Mentions included in the tweet
		 */
		mentions: {
			/**
			 * The start position (zero-based) of the mention in the Tweet text.
			 */
			start: number;

			/**
			 * The end position (zero-based) of the mention in the Tweet text.
			 */
			end: number;

			/**
			 * The username of the mentioned user.
			 */
			username: string;
		}[];

		/**
		 * Cashtags included in the tweet
		 */
		cashtags: {
			/**
			 * The start position (zero-based) of the cashtag in the Tweet text.
			 */
			start: number;

			/**
			 * The end position (zero-based) of the cashtag in the Tweet text.
			 */
			end: number;

			/**
			 * The cashtag, minus the leading '$' character.
			 */
			tag: string;
		}[];
	};

	/**
	 * Withheld content details
	 * To return this add tweet.fields=withheld to your request
	 */
	withheld?: {
		/**
		 * Whether the content is being withheld due to copyright infringement
		 */
		copyright: boolean;

		/**
		 * Countries where the content is being withheld
		 */
		country_codes: string[];

		/**
		 * Whether the content being withheld is a `user` or a `tweet`
		 */
		scope: string;
	};

	/**
	 * Public metrics for the tweet
	 * To return this add tweet.fields=public_metrics to your request
	 */
	public_metrics?: {
		/**
		 * The number of times this Tweet has been retweeted
		 */
		retweet_count: number;

		/**
		 * The number of replies this Tweet has received
		 */
		reply_count: number;

		/**
		 * The number of times this Tweet has been liked
		 */
		like_count: number;

		/**
		 * The number of times this Tweet has been quoted
		 */
		quote_count: number;
	};

	/**
	 * Non-public engagement metrics for the Tweet at the time of the request
	 * To return this add tweet.fields=non_public_metrics to your request
	 */
	non_public_metrics?: {
		/**
		 * The number of times this Tweet has been viewed
		 */
		impression_count: number;

		/**
		 * The number of times the url in this Tweet has been clicked
		 */
		url_link_clicks: number;

		/**
		 * The number of times a profile has been clicked in this Tweet
		 */
		user_profile_clicks: number;
	};

	/**
	 * Engagement metrics for the Tweet at the time of the request
	 */
	organic_metrics?: {
		/**
		 * The number of times this Tweet has been viewed
		 */
		impression_count: number;

		/**
		 * The number of times the url in this Tweet has been clicked
		 */
		url_link_clicks: number;

		/**
		 * The number of times a profile has been clicked in this Tweet
		 */
		user_profile_clicks: number;

		/**
		 * The number of times this Tweet has been retweeted
		 */
		retweet_count: number;

		/**
		 * The number of replies this Tweet has received
		 */
		reply_count: number;

		/**
		 * The number of times this Tweet has been liked
		 */
		like_count: number;
	};

	/**
	 * Promoted engagement metrics for the Tweet at the time of the request
	 */
	promoted_metrics?: {
		/**
		 * The number of times this Tweet has been viewed
		 */
		impression_count: number;

		/**
		 * The number of times the url in this Tweet has been clicked
		 */
		url_link_clicks: number;

		/**
		 * The number of times a profile has been clicked in this Tweet
		 */
		user_profile_clicks: number;

		/**
		 * The number of times this Tweet has been retweeted
		 */
		retweet_count: number;

		/**
		 * The number of replies this Tweet has received
		 */
		reply_count: number;

		/**
		 * The number of times this Tweet has been liked
		 */
		like_count: number;
	};

	/**
	 * Whether this Tweet is possibly sensitive
	 * To return this add tweet.fields=possibly_sensitive to your request
	 */
	possibly_sensitive?: boolean;

	/**
	 * The language of the Tweet text, if detected by Twitter
	 * To return this add tweet.fields=lang to your request
	 */
	lang?: string;

	/**
	 * Reply settings for the Tweet
	 * To return this add tweet.fields=reply_settings to your request
	 *
	 * Possible values:
	 * - everyone
	 * - following
	 * - mentionedUsers
	 */
	reply_settings?: string;

	/**
	 * The source of the Tweet
	 * To return this add tweet.fields=source to your request
	 */
	source?: string;
}

interface ContextAnnotation {
	domain: {
		id: string;
		name: string;
		description: string;
	};
	entity: {
		id: string;
		name: string;
		description: string;
	};
}

/**
 * Object representing a Twitter user that hasn't yet left the platform
 */
interface TwitterUser {
	/**
	 * The user's unique identifier
	 */
	id: string;

	/**
	 * The user's name
	 */
	name: string;

	/**
	 * The user's username
	 */
	username: string;
}

interface Place {
	/**
	 * Full name of the place
	 */
	full_name: string;

	/**
	 * Unique identifier representing a place
	 */
	id: string;
}

interface Media {
	/**
	 * Media key
	 */
	media_key: string;

	/**
	 * Media type
	 *
	 * Possible values:
	 * - photo
	 * - video
	 * - animated_gif
	 */
	type: string;
}

interface Poll {
	/**
	 * Unique identifier representing a poll
	 */
	id: string;

	/**
	 * Options for the poll
	 */
	options: {
		/**
		 * Position of the option in the poll
		 */
		position: number;

		/**
		 * Label of the option
		 */
		label: string;

		/**
		 * Number of votes for this option
		 */
		votes: number;
	}[];
}
