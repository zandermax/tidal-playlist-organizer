// Type definitions for Tidal API responses

export interface TidalConfig {
	clientId: string;
	redirectUri: string;
	countryCode: string;
	credentialsStorageKey: string;
}

export interface PlaylistAttributes {
	name: string;
	numberOfItems?: number;
	lastModifiedAt?: string;
	externalLinks?: Array<{
		href: string;
		type?: string;
	}>;
	url?: string;
	description?: string;
	created?: string;
	duration?: number;
}

export interface PlaylistRelationships {
	coverArt?: {
		data: Array<{
			id: string;
			type: string;
		}>;
	};
	owners?: {
		data: Array<{
			id: string;
			type: string;
		}>;
	};
}

export interface Playlist {
	id: string;
	type: string;
	attributes: PlaylistAttributes;
	relationships?: PlaylistRelationships;
}

export interface ArtworkFile {
	href: string;
	meta?: {
		width?: number;
		height?: number;
	};
}

export interface CoverArtAttributes {
	files?: ArtworkFile[];
}

export interface CoverArt {
	id: string;
	type: string;
	attributes: CoverArtAttributes;
}

export interface APIResponse {
	data: Playlist[];
	included?: CoverArt[];
}

export interface JWTPayload {
	uid?: number | string;
	sub?: string;
	exp?: number;
	iat?: number;
	[key: string]: unknown;
}

export interface TidalCredentials {
	token: string;
	clientId?: string;
	requestedScopes?: string[];
	[key: string]: unknown;
}
