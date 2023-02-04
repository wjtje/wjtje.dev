export interface Status {
	id: number;
	uri: string;
	url: string;
	content: string;
	created_at: string;
	media_attachments?: MediaAttachment[];
}

interface MediaAttachment {
	id: number;
	type: 'image' | string;
	url: string;
	remote_url: string | null;
	preview_url: string;
	text_url: string | null;
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
	description: string;
	blurhash: string;
}
