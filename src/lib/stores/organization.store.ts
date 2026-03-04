import { writable } from 'svelte/store';
import { parsePlaylistName } from '$lib/utils/parsers.utils';

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

const EMPTY_STATE: OrganizationState = {
	tags: [],
	folders: []
};

function createOrganizationStore() {
	const { subscribe, update } = writable<OrganizationState>(EMPTY_STATE);

	return {
		subscribe,

		/**
		 * Derives tags from playlist names by scanning all raw names for bracket tokens.
		 * Call this once after fetching playlists. Replaces any previously derived tags.
		 */
		populateTagsFromPlaylists: (playlists: Array<{ id: string; attributes: { name: string } }>) => {
			// tagName -> playlistIds[]
			const tagMap = new Map<string, string[]>();

			for (const playlist of playlists) {
				const { tags } = parsePlaylistName(playlist.attributes.name);
				for (const tagName of tags) {
					if (!tagMap.has(tagName)) {
						tagMap.set(tagName, []);
					}
					tagMap.get(tagName)!.push(playlist.id);
				}
			}

			const tags: Tag[] = Array.from(tagMap.entries()).map(([name, playlistIds], index) => ({
				id: name,
				name,
				color: TAG_COLORS[index % TAG_COLORS.length].name,
				playlistIds
			}));

			console.group('[organization] Tags derived from playlist names');
			console.log(`Scanned ${playlists.length} playlist(s), found ${tags.length} unique tag(s)`);
			if (tags.length > 0) {
				tags.forEach((tag) => {
					console.log(
						`  [${tag.name}] (${tag.color}) → ${tag.playlistIds.length} playlist(s)`,
						tag.playlistIds
					);
				});
			} else {
				console.log('  No tagged playlists found. Try renaming one to end with e.g. [chill]');
			}
			console.groupEnd();

			update((state) => ({ ...state, tags }));
		},

		// Folder operations (folders managed via Tidal API / sidebar, not derived from names)
		addFolder: (folder: Folder) => {
			update((state) => ({ ...state, folders: [...state.folders, folder] }));
		},

		removeFolder: (folderId: string) => {
			update((state) => ({
				...state,
				folders: state.folders.filter((f) => f.id !== folderId && f.parentId !== folderId)
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

		// Lookups
		getPlaylistsByTag: (tagId: string, state: OrganizationState): string[] => {
			const tag = state.tags.find((t) => t.id === tagId);
			return tag ? tag.playlistIds : [];
		},

		getPlaylistsByFolder: (folderId: string, state: OrganizationState): string[] => {
			const folder = state.folders.find((f) => f.id === folderId);
			return folder ? folder.playlistIds : [];
		},

		getTagsForPlaylist: (playlistId: string, state: OrganizationState): Tag[] => {
			return state.tags.filter((t) => t.playlistIds.includes(playlistId));
		}
	};
}

export const organization = createOrganizationStore();
