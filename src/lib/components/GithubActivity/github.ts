const emoteList = [[":arrow_up:", "⬆️"], [":twisted_rightwards_arrows:", "🔀"]]

export const replaceGithubEmote = (commitMessage: string) => {
	emoteList.forEach(emote => {
		commitMessage = commitMessage.replace(emote[0], emote[1]);
	});

	return commitMessage
}

export interface GithubEvent {
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
	payload: GithubEventDeleteEventPayload & GithubEventPushEventPayload & GithubEventPullRequestEventPayload;
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

export interface GithubEventPushEventPayload {
	/**
	 * Unique identifier for the push.
	 */
	push_id: number;
	/**
	 * The number of commits in the push.
	 */
	size: number;
	/**
	 * The number of distinct commits in the push.
	 */
	distinct_size: number;
	/**
	 * The full git ref that was pushed. Example: refs/heads/main.
	 */
	ref: string;
	/**
	 * The SHA of the most recent commit on ref after the push.
	 */
	head: string;
	/**
	 * The SHA of the most recent commit on ref before the push.
	 */
	before: string;
	/**
	 * An array of commit objects describing the pushed commits. (The array includes a maximum of 20 commits. If necessary, you can use the Commits API to fetch additional commits. This limit is applied to timeline events only and isn't applied to webhook deliveries.)
	 */
	commits: GithubEventCommit[];

}

export interface GithubEventCommit {
	/**
	 * The SHA of the commit.
	 */
	sha: string;
	/**
	 * The commit message.
	 */
	message: string;
	/**
	 * The git author of the commit.
	 */
	author: GithubEventCommitAuthor;
	/**
	 * URL that points to the commit API resource.
	 */
	url: string;
	/**
	 * Whether this commit is distinct from any that have been pushed before.
	 */
	distinct: boolean;
}

export interface GithubEventCommitAuthor {
	/**
	 * The git author's name.
	 */
	name: string;
	/**
	 * The git author's email address.
	 */
	email: string;
}

export interface GithubEventDeleteEventPayload {
	/**
	 * The git ref resource.
	 */
	ref: string;
	/**
	 * The type of Git ref oject deleted in the repository. Can be branch or tag.
	 */
	ref_type: GithubEventRefType;
}

export enum GithubEventRefType {
	branch = "branch",
	tag = "tag"
}

export interface GithubEventPullRequestEventPayload {
	action: GithubEventPullRequestEventAction;
	number: number;
	pull_request: GithubEventPullRequest;
}

export enum GithubEventPullRequestEventAction {
	opened = "opened",
	edited = "edited",
	closed = "closed",
	reopened = "reopened",
	assigned = "assigned",
	unassigned = "unassigned",
	review_requested = "review_requested",
	review_request_removed = "review_request_removed",
	labeled = "labeled",
	unlabeled = "unlabeled",
	synchronize = "synchronize"
}

export interface GithubEventPullRequest {
	url: string;
	id: number;
	node_id: string;
	html_url: string;
	diff_url: string;
	patch_url: string;
	issue_url: string;
	number: number;
	state: string;
	title: string;
	user: any;
}