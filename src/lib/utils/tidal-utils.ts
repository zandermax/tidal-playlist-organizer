import type { JWTPayload, Playlist, CoverArt } from '$lib/types/tidal';

/**
 * Decode a JWT token to extract its payload
 * @param token - The JWT token string
 * @returns The decoded payload or null if decoding fails
 */
export function decodeJWT(token: string): JWTPayload | null {
	try {
		const parts = token.split('.');
		if (parts.length !== 3) return null;
		const payload = JSON.parse(atob(parts[1]));
		return payload;
	} catch (error) {
		console.error('Failed to decode JWT:', error);
		return null;
	}
}

/**
 * Format a date string for display
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "Jan 15, 2024")
 */
export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

/**
 * Extract cover art URL from a playlist and included resources
 * @param playlist - The playlist object
 * @param included - Array of included resources (cover art, etc.)
 * @returns Cover art URL or null if not found
 */
export function getCoverArtUrl(playlist: Playlist, included?: CoverArt[]): string | null {
	if (!playlist.relationships?.coverArt?.data?.[0]?.id) {
		return null;
	}

	const coverArtId = playlist.relationships.coverArt.data[0].id;
	const coverArt = included?.find(
		(item) => item.type === 'artworks' && item.id === coverArtId
	);

	if (coverArt?.attributes?.files) {
		// Find a suitable size (prefer 320x320 or similar)
		const file =
			coverArt.attributes.files.find(
				(f) => f.meta?.width && f.meta.width >= 250 && f.meta.width <= 500
			) || coverArt.attributes.files[0];

		return file?.href || null;
	}

	return null;
}
