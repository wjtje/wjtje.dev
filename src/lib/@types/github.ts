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

export interface GithubRepository {
	/**
	 * Unique identifier of the repository.
	 * @example 1296269
	 */
	id: number;

	/**
	 * Node id of the repository.
	 * @example "MDEwOlJlcG9zaXRvcnkxMjk2MjY5"
	 */
	node_id: string;

	/**
	 * Name of the repository, without the name of the owner.
	 * @example "Hello-World"
	 */
	name: string;

	/**
	 * Full name of the repository, which includes the name of the owner.
	 * @example "octocat/Hello-World"
	 */
	full_name: string;

	/**
	 * Boolean indicating whether the repository is private.
	 */
	private: boolean;

	/**
	 * User who owns the repository.
	 */
	owner: GithubRepositoryOwner;

	/**
	 * URL for the repository.
	 * @example "https://github.com/octocat/hello-world"
	 */
	html_url: string;

	/**
	 * Description of the repository.
	 * Can be null if the repository has no description.
	 */
	description: string | null;

	fork: boolean;

	/**
	 * API URL for the repository.
	 */
	url: string;

	forks_url: string;

	keys_url: string;

	collaborators_url: string;

	teams_url: string;

	hooks_url: string;

	issue_events_url: string;

	events_url: string;

	assignees_url: string;

	branches_url: string;

	tags_url: string;

	blobs_url: string;

	git_tags_url: string;

	git_refs_url: string;

	trees_url: string;

	statuses_url: string;

	languages_url: string;

	stargazers_url: string;

	contributors_url: string;

	subscribers_url: string;

	subscription_url: string;

	commits_url: string;

	git_commits_url: string;

	comments_url: string;

	issue_comment_url: string;

	contents_url: string;

	compare_url: string;

	merges_url: string;

	archive_url: string;

	downloads_url: string;

	issues_url: string;

	pulls_url: string;

	milestones_url: string;

	notifications_url: string;

	labels_url: string;

	releases_url: string;

	deployments_url: string;

	created_at: string;

	updated_at: string;

	pushed_at: string;

	git_url: string;

	ssh_url: string;

	clone_url: string;

	svn_url: string;

	/**
	 * Homepage URL of the repository.
	 * Can be null if the repository has no homepage.
	 */
	homepage: string | null;

	size: number;

	/**
	 * Amount of stargazers the repository has.
	 */
	stargazers_count: number;

	/**
	 * Amount of users watching the repository.
	 */
	watchers_count: number;

	/**
	 * Main language of the repository.
	 * Can be null if GitHub does not know of the language.
	 */
	language: string | null;

	has_issues: boolean;

	has_projects: boolean;

	has_downloads: boolean;

	has_wiki: boolean;

	has_pages: boolean;

	/**
	 * Amount of forks the repository has.
	 */
	forks_count: number;

	mirror_url: string | null;

	/**
	 * Boolean indicating whether the repository is archived.
	 */
	archived: boolean;

	disabled: boolean;

	/**
	 * Amount of open issues and pull requests the repository has.
	 */
	open_issues_count: number;

	license: null | GithubLicense;

	/**
	 * Boolean indicating whether the repository is forkable.
	 */
	allow_forking: boolean;

	/**
	 * Boolean indicating whether the repository is a template that can be used to create new repositories.
	 */
	is_template: boolean;

	web_commit_signoff_required: boolean;

	topics: string[];

	visibility: string;

	forks: number;

	/**
	 * Amount of open issues and pull requests the repository has.
	 */
	open_issues: number;

	/**
	 * Amount of watchers the repository has.
	 */
	watchers: number;

	/**
	 * Default branch of the repository.
	 */
	default_branch: string;

	/**
	 * If returned from API endpoint for 1 repo, this may contain details about the parent repository.
	 */
	parent?: GithubRepository;
}

interface GithubRepositoryOwner {
	/**
	 * Username of the owner of the repository.
	 * @example "octocat"
	 */
	login: string;

	/**
	 * Unique identifier of the user.
	 */
	id: number;

	/**
	 * Node id of the user.
	 */
	node_id: string;

	/**
	 * Avatar URL of the owner.
	 */
	avatar_url: string;

	/**
	 * Gravatar id of the owner.
	 * Can be an empty string if the user has no Gravatar.
	 */
	gravatar_id: string;

	/**
	 * API URL for owner user,
	 * @example "https://api.github.com/users/octocat"
	 */
	url: string;

	/**
	 * URL to the owner's profile.
	 */
	html_url: string;

	followers_url: string;

	following_url: string;

	gists_url: string;

	starred_url: string;

	subscriptions_url: string;

	organizations_url: string;

	repos_url: string;

	events_url: string;

	received_events_url: string;

	/**
	 * User type
	 * @example "User"
	 */
	type: string;

	/**
	 * Boolean indicating whether the owner is a site administrator.
	 * @example false
	 */
	site_admin: boolean;
}

interface GithubLicense {
	/**
	 * Unique key of the license.
	 * @example "MIT"
	 */
	key: string;

	/**
	 * Human-readable name of the license.
	 * @example "MIT License"
	 */
	name: string;

	/**
	 * Software Package Data Exchange identifier of the license.
	 * @example "MIT"
	 */
	spdx_id: string;

	/**
	 * URL to get information about the license from the GitHub API.
	 * @example "https://api.github.com/licenses/mit"
	 */
	url: string;

	/**
	 * Node id of the license.
	 */
	node_id: string;
}
