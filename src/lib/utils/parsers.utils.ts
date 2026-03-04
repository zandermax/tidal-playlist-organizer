/**
 * Tags are formatted as [[tagname]]
 */
const TAG_REGEX = /\[\[.*?\]\]/g;

/**
 * Parses a playlist name into a display name and metadata (tags)
 *
 * @param raw - The raw playlist name
 * @returns The display name and tags
 */
export function parsePlaylistName(raw: string): {
	displayName: string;
	tags: string[];
} {
	let tags: string[] = [];

	const displayName = raw.replace(TAG_REGEX, '').trim();

	const tagMatches = raw.match(TAG_REGEX);
	if (tagMatches) {
		tags = tagMatches.map((match) => match.slice(2, -2).trim());
	}

	return { displayName, tags };
}
