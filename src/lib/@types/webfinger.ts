export interface WebFinger {
	subject: string;
	aliases: string[];

	/**
	 * Links about the subject
	 */
	links: Link[];
}

interface Link {
	rel: string;
	type: string;
	href: string;
}
