const emoteList = [
	[':arrow_up:', '⬆️'],
	[':twisted_rightwards_arrows:', '🔀']
];

export interface GithubEvent<T> {
	/**
	 * Unique identifier for the event.
	 */
	id: string;
	/**
	 * The type of event. Events uses PascalCase for the name.
	 */
	type: GithubEventType;
	/**
	 * The user that triggered the event.
	 */
	actor: GithubEventActor;
	/**
	 * The repository object where the event occurred.
	 */
	repo: GithubEventRepo;
	/**
	 * The event payload object is unique to the event type.
	 */
	payload: T;
	public: boolean;
	created_at: string;
}

export enum GithubEventType {
	CommitCommentEvent = 'CommitCommentEvent',
	CreateEvent = 'CreateEvent',
	DeleteEvent = 'DeleteEvent',
	ForkEvent = 'ForkEvent',
	GollumEvent = 'GollumEvent',
	IssueCommentEvent = 'IssueCommentEvent',
	IssuesEvent = 'IssuesEvent',
	MemberEvent = 'MemberEvent',
	PublicEvent = 'PublicEvent',
	PullRequestEvent = 'PullRequestEvent',
	PullRequestReviewEvent = 'PullRequestReviewEvent',
	PullRequestReviewCommentEvent = 'PullRequestReviewCommentEvent',
	PushEvent = 'PushEvent',
	ReleaseEvent = 'ReleaseEvent',
	SponsorshipEvent = 'SponsorshipEvent',
	WatchEvent = 'WatchEvent'
}

export interface GithubEventActor {
	/**
	 * The unique identifier for the actor.
	 */
	id: number;
	/**
	 * The username of the actor.
	 */
	login: string;
	/**
	 * The specific display format of the username.
	 */
	display_login: string;
	/**
	 * The unique identifier of the Gravatar profile for the actor.
	 */
	gravatar_id: string;
	/**
	 * The REST API URL used to retrieve the user object, which includes additional user information.
	 */
	url: string;
	/**
	 * The URL of the actor's profile image.
	 */
	avatar_url: string;
}

export interface GithubEventRepo {
	/**
	 * The unique identifier of the repository.
	 */
	id: number;
	/**
	 * The name of the repository, which includes the owner and repository name. For example, octocat/hello-world is the name of the hello-world repository owned by the octocat user account.
	 */
	name: string;
	/**
	 * The REST API URL used to retrieve the repository object, which includes additional repository information.
	 */
	url: string;
}
