import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import {
	init,
	initializeLogin,
	finalizeLogin,
	credentialsProvider,
	logout as tidalLogout
} from '@tidal-music/auth';
import { config } from './config.store';
import { decodeJWT } from '$lib/utils/tidal.utils';
import type { TidalCredentials } from '$lib/types/tidal';

interface AuthState {
	isAuthenticated: boolean;
	userId: string | null;
	isLoading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	isAuthenticated: false,
	userId: null,
	isLoading: false,
	error: null
};

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>(initialState);

	let initialized = false;

	/**
	 * Initialize the Tidal auth SDK
	 */
	async function initAuth() {
		if (initialized) return;

		const cfg = get(config);
		if (!cfg.clientId) {
			throw new Error(
				'Client ID not configured. Please set VITE_TIDAL_CLIENT_ID in your .env file.'
			);
		}

		await init({
			clientId: cfg.clientId,
			credentialsStorageKey: cfg.credentialsStorageKey,
			scopes: ['playlists.read', 'user.read']
		});

		initialized = true;
	}

	/**
	 * Check if user is already authenticated
	 */
	async function checkAuth(): Promise<void> {
		if (!browser) {
			set(initialState);
			return;
		}

		try {
			update((state) => ({ ...state, isLoading: true, error: null }));

			await initAuth();

			const credentials = (await credentialsProvider.getCredentials()) as TidalCredentials;

			if (credentials?.token) {
				const tokenData = decodeJWT(credentials.token);
				const userId = tokenData?.uid?.toString() || null;

				set({
					isAuthenticated: true,
					userId,
					isLoading: false,
					error: null
				});
			} else {
				set({
					isAuthenticated: false,
					userId: null,
					isLoading: false,
					error: null
				});
			}
		} catch (error) {
			console.error('Error checking auth:', error);
			set({
				isAuthenticated: false,
				userId: null,
				isLoading: false,
				error: null
			});
		}
	}

	/**
	 * Initiate login flow
	 */
	async function login(): Promise<void> {
		if (!browser) return;

		try {
			update((state) => ({ ...state, isLoading: true, error: null }));

			const cfg = get(config);

			// Store config for after redirect
			if (browser) {
				localStorage.setItem('tidalConfig', JSON.stringify(cfg));
			}

			await initAuth();

			// Get login URL and redirect
			const loginUrl = await initializeLogin({
				redirectUri: cfg.redirectUri
			});

			if (browser) {
				window.location.href = loginUrl;
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Login failed';
			update((state) => ({
				...state,
				isLoading: false,
				error: message
			}));
			throw error;
		}
	}

	/**
	 * Complete login after OAuth redirect
	 */
	async function finalizeAuth(searchParams: string): Promise<void> {
		if (!browser) return;

		try {
			update((state) => ({ ...state, isLoading: true, error: null }));

			await initAuth();

			// Finalize login with the OAuth code
			await finalizeLogin(searchParams);

			// Get credentials and extract user ID
			const credentials = (await credentialsProvider.getCredentials()) as TidalCredentials;
			const tokenData = decodeJWT(credentials.token);
			const userId = tokenData?.uid?.toString() || null;

			set({
				isAuthenticated: true,
				userId,
				isLoading: false,
				error: null
			});
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Authentication failed';
			update((state) => ({
				...state,
				isAuthenticated: false,
				userId: null,
				isLoading: false,
				error: message
			}));
			throw error;
		}
	}

	/**
	 * Logout and clear session
	 */
	async function logout(): Promise<void> {
		if (!browser) return;

		try {
			await tidalLogout();
			if (browser) {
				localStorage.removeItem('tidalConfig');
			}
			set(initialState);
		} catch (error) {
			console.error('Logout error:', error);
			throw error;
		}
	}

	return {
		subscribe,
		checkAuth,
		login,
		finalizeAuth,
		logout
	};
}

export const authStore = createAuthStore();
