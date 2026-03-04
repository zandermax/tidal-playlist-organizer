import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// View mode types
export type ViewMode = 'grid' | 'list' | 'compact';
export type SortOption = 'name' | 'modified' | 'created' | 'tracks';
export type SortDirection = 'asc' | 'desc';

interface ViewPreferences {
	viewMode: ViewMode;
	sortBy: SortOption;
	sortDirection: SortDirection;
	sidebarCollapsed: boolean;
}

const DEFAULT_PREFERENCES: ViewPreferences = {
	viewMode: 'grid',
	sortBy: 'modified',
	sortDirection: 'desc',
	sidebarCollapsed: false
};

// Load preferences from localStorage
function loadPreferences(): ViewPreferences {
	if (!browser) return DEFAULT_PREFERENCES;

	try {
		const stored = localStorage.getItem('viewPreferences');
		if (stored) {
			return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
		}
	} catch (error) {
		console.error('Failed to load view preferences:', error);
	}

	return DEFAULT_PREFERENCES;
}

// Save preferences to localStorage
function savePreferences(prefs: ViewPreferences) {
	if (!browser) return;

	try {
		localStorage.setItem('viewPreferences', JSON.stringify(prefs));
	} catch (error) {
		console.error('Failed to save view preferences:', error);
	}
}

// Create the store
function createViewPreferencesStore() {
	const { subscribe, update, set } = writable<ViewPreferences>(loadPreferences());

	return {
		subscribe,
		setViewMode: (mode: ViewMode) => {
			update((prefs) => {
				const newPrefs = { ...prefs, viewMode: mode };
				savePreferences(newPrefs);
				return newPrefs;
			});
		},
		setSortBy: (sortBy: SortOption) => {
			update((prefs) => {
				const newPrefs = { ...prefs, sortBy };
				savePreferences(newPrefs);
				return newPrefs;
			});
		},
		toggleSortDirection: () => {
			update((prefs) => {
				const newPrefs = {
					...prefs,
					sortDirection: prefs.sortDirection === 'asc' ? 'desc' : ('asc' as SortDirection)
				};
				savePreferences(newPrefs);
				return newPrefs;
			});
		},
		toggleSidebar: () => {
			update((prefs) => {
				const newPrefs = { ...prefs, sidebarCollapsed: !prefs.sidebarCollapsed };
				savePreferences(newPrefs);
				return newPrefs;
			});
		},
		reset: () => {
			set(DEFAULT_PREFERENCES);
			savePreferences(DEFAULT_PREFERENCES);
		}
	};
}

export const viewPreferences = createViewPreferencesStore();
