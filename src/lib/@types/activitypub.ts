export interface ActivityStreams {
	'@context': unknown;
	id: string;
	type: string;
	next: string;
	prev: string;
	partOf: string;
	orderedItems: ActivityItem[];
}

interface ActivityItem {
	id: string;
	type: string;
	actor: string;
	published: string;
	to: string[];
	cc: string[];
	object: string | ActivityObject;
}

interface ActivityObject {
	id: string;
	type: string;
	summary: string | null;
	inReplyTo?: string | null;
	published: string;
	url: string;
	attributedTo: string;
	to: string[];
	cc: string[];
	sensitive: boolean;
	atomUri: string;
	inReplyToAtomUri: string | null;
	conversation: string;
	content: string;
	contentMap: {
		[key: string]: string;
	};
	attachment: ActivityAttachment[];
	tag: unknown[];
	replies: {
		id: string;
		type: string;
		first:
			| string
			| {
					type: string;
					next: string;
					partOf: string;
					items: unknown[];
			  };
	};
}

interface ActivityAttachment {
	type: string;
	mediaType: string;
	url: string;
	name: string;
	blurhash: string;
	width?: number;
	height?: number;
}
