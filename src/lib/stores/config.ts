import { readable } from 'svelte/store';
import type { TidalConfig } from '$lib/types/tidal';

/**
 * Configuration store that reads from environment variables
 * This is a readable store since config shouldn't change at runtime
 */
export const config = readable<TidalConfig>({
	clientId: import.meta.env.VITE_TIDAL_CLIENT_ID || '',
	redirectUri: import.meta.env.VITE_TIDAL_REDIRECT_URI || '',
	countryCode: import.meta.env.VITE_COUNTRY_CODE || 'NO',
	credentialsStorageKey: 'tidalPlaylistOrganizer'
});
