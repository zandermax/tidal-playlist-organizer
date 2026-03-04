import { writable } from 'svelte/store';

// Types
export interface Tag {
	id: string;
	name: string;
	color: string;
	playlistIds: string[];
}

export interface Folder {
	id: string;
	name: string;
	playlistIds: string[];
	parentId?: string;
	expanded?: boolean;
}

interface OrganizationState {
	tags: Tag[];
	folders: Folder[];
}

// Default colors for tags
export const TAG_COLORS = [
	{
		name: 'red',
		bg: 'var(--tag-red-bg)',
		text: 'var(--tag-red-text)',
		border: 'var(--tag-red-border)'
	},
	{
		name: 'orange',
		bg: 'var(--tag-orange-bg)',
		text: 'var(--tag-orange-text)',
		border: 'var(--tag-orange-border)'
	},
	{
		name: 'yellow',
		bg: 'var(--tag-yellow-bg)',
		text: 'var(--tag-yellow-text)',
		border: 'var(--tag-yellow-border)'
	},
	{
		name: 'green',
		bg: 'var(--tag-green-bg)',
		text: 'var(--tag-green-text)',
		border: 'var(--tag-green-border)'
	},
	{
		name: 'blue',
		bg: 'var(--tag-blue-bg)',
		text: 'var(--tag-blue-text)',
		border: 'var(--tag-blue-border)'
	},
	{
		name: 'indigo',
		bg: 'var(--tag-indigo-bg)',
		text: 'var(--tag-indigo-text)',
		border: 'var(--tag-indigo-border)'
	},
	{
		name: 'purple',
		bg: 'var(--tag-purple-bg)',
		text: 'var(--tag-purple-text)',
		border: 'var(--tag-purple-border)'
	},
	{
		name: 'pink',
		bg: 'var(--tag-pink-bg)',
		text: 'var(--tag-pink-text)',
		border: 'var(--tag-pink-border)'
	},
	{
		name: 'gray',
		bg: 'var(--tag-gray-bg)',
		text: 'var(--tag-gray-text)',
		border: 'var(--tag-gray-border)'
	}
];

// Initial state
const DEFAULT_STATE: OrganizationState = {
	tags: [
		{ id: 'workout', name: 'Workout', color: 'blue', playlistIds: [] },
		{ id: 'chill', name: 'Chill', color: 'green', playlistIds: [] },
		{ id: 'party', name: 'Party', color: 'purple', playlistIds: [] }
	],
	folders: [
		{ id: 'work', name: 'Work Music', playlistIds: [], expanded: true },
		{ id: 'favorites', name: 'Favorites', playlistIds: [], expanded: true }
	]
};

// Create the store
function createOrganizationStore() {
	const { subscribe, update, set } = writable<OrganizationState>(DEFAULT_STATE);

	return {
		subscribe,

		// Tag operations
		addTag: (name: string, color: string) => {
			update((state) => ({
				...state,
				tags: [
					...state.tags,
					{ id: `tag-${Date.now()}`, name, color, playlistIds: [] }
				]
			}));
		},

		removeTag: (tagId: string) => {
			update((state) => ({
				...state,
				tags: state.tags.filter((t) => t.id !== tagId)
			}));
		},

		updateTag: (tagId: string, updates: Partial<Tag>) => {
			update((state) => ({
				...state,
				tags: state.tags.map((t) => (t.id === tagId ? { ...t, ...updates } : t))
			}));
		},

		addPlaylistToTag: (tagId: string, playlistId: string) => {
			update((state) => ({
				...state,
				tags: state.tags.map((t) =>
					t.id === tagId && !t.playlistIds.includes(playlistId)
						? { ...t, playlistIds: [...t.playlistIds, playlistId] }
						: t
				)
			}));
		},

		removePlaylistFromTag: (tagId: string, playlistId: string) => {
			update((state) => ({
				...state,
				tags: state.tags.map((t) =>
					t.id === tagId
						? { ...t, playlistIds: t.playlistIds.filter((id) => id !== playlistId) }
						: t
				)
			}));
		},

		// Folder operations
		addFolder: (name: string, parentId?: string) => {
			update((state) => ({
				...state,
				folders: [
					...state.folders,
					{ id: `folder-${Date.now()}`, name, playlistIds: [], parentId, expanded: true }
				]
			}));
		},

		removeFolder: (folderId: string) => {
			update((state) => ({
				...state,
				folders: state.folders.filter((f) => f.id !== folderId && f.parentId !== folderId)
			}));
		},

		updateFolder: (folderId: string, updates: Partial<Folder>) => {
			update((state) => ({
				...state,
				folders: state.folders.map((f) => (f.id === folderId ? { ...f, ...updates } : f))
			}));
		},

		toggleFolder: (folderId: string) => {
			update((state) => ({
				...state,
				folders: state.folders.map((f) =>
					f.id === folderId ? { ...f, expanded: !f.expanded } : f
				)
			}));
		},

		addPlaylistToFolder: (folderId: string, playlistId: string) => {
			update((state) => ({
				...state,
				folders: state.folders.map((f) =>
					f.id === folderId && !f.playlistIds.includes(playlistId)
						? { ...f, playlistIds: [...f.playlistIds, playlistId] }
						: f
				)
			}));
		},

		removePlaylistFromFolder: (folderId: string, playlistId: string) => {
			update((state) => ({
				...state,
				folders: state.folders.map((f) =>
					f.id === folderId
						? { ...f, playlistIds: f.playlistIds.filter((id) => id !== playlistId) }
						: f
				)
			}));
		},

		// Get playlists for a tag or folder
		getPlaylistsByTag: (tagId: string, state: OrganizationState): string[] => {
			const tag = state.tags.find((t) => t.id === tagId);
			return tag ? tag.playlistIds : [];
		},

		getPlaylistsByFolder: (folderId: string, state: OrganizationState): string[] => {
			const folder = state.folders.find((f) => f.id === folderId);
			return folder ? folder.playlistIds : [];
		},

		// Get tags for a playlist
		getTagsForPlaylist: (playlistId: string, state: OrganizationState): Tag[] => {
			return state.tags.filter((t) => t.playlistIds.includes(playlistId));
		},

		// Reset to defaults
		reset: () => {
			set(DEFAULT_STATE);
		}
	};
}

export const organization = createOrganizationStore();
