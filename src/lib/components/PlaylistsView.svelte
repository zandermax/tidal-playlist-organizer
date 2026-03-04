<script lang="ts">
	import { onMount } from 'svelte';

	import { authStore } from '$lib/stores/auth';
	import { config } from '$lib/stores/config';
	import { viewPreferences } from '$lib/stores/viewPreferences';
	import { searchStore } from '$lib/stores/search';

	import { createAPIClient } from '@tidal-music/api';
	import { credentialsProvider } from '@tidal-music/auth';
	import { getCoverArtUrl } from '$lib/utils/tidal-utils';

	import ErrorMessage from './ErrorMessage.svelte';
	import Toolbar from './toolbar/Toolbar.svelte';
	import PlaylistGrid from './playlist/PlaylistGrid.svelte';
	import StatsCards from './dashboard/StatsCards.svelte';
	import BulkActionBar from './bulk/BulkActionBar.svelte';

	import type { FilterState } from './toolbar/FilterPanel.svelte';
	import type { Playlist, CoverArt } from '$lib/types/tidal';

	let isLoading = $state(true);
	let error = $state<string | null>(null);
	let playlists = $state<Playlist[]>([]);
	let filteredPlaylists = $state<Playlist[]>([]);
	let included = $state<CoverArt[]>([]);
	let selectedIds = $state<Set<string>>(new Set());
	let activeFilters = $state<FilterState>({
		dateRange: 'all',
		tags: [],
		folders: []
	});

	const auth = $derived($authStore);
	const cfg = $derived($config);
	const prefs = $derived($viewPreferences);
	const search = $derived($searchStore);

	// Create a map of cover URLs for easy lookup
	const coverUrls = $derived(
		new Map(playlists.map((playlist) => [playlist.id, getCoverArtUrl(playlist, included)]))
	);

	async function loadPlaylists() {
		if (!auth.userId) {
			error = 'User ID not available';
			isLoading = false;
			return;
		}

		try {
			isLoading = true;
			error = null;

			const apiClient = createAPIClient(credentialsProvider);

			const { data, error: apiError } = await apiClient.GET('/playlists', {
				params: {
					query: {
						'filter[owners.id]': [auth.userId],
						include: ['coverArt', 'owners'],
						countryCode: cfg.countryCode,
						sort: ['-lastModifiedAt']
					}
				}
			});

			if (apiError) {
				console.error('API Error:', apiError);
				const errorMsg =
					apiError.errors?.map((e) => e.detail).join(', ') || 'Failed to load playlists';
				error = errorMsg;
				isLoading = false;
				return;
			}

			if (!data?.data) {
				error = 'No data returned from API';
				isLoading = false;
				return;
			}

			playlists = data.data as Playlist[];
			included = (data.included as CoverArt[]) || [];
			isLoading = false;
		} catch (err) {
			console.error('Error loading playlists:', err);
			error = err instanceof Error ? err.message : 'Failed to load playlists';
			isLoading = false;
		}
	}

	function filterAndSortPlaylists() {
		let result = [...playlists];

		// Apply search filter
		if (search.trim()) {
			const query = search.toLowerCase();
			result = result.filter((p) => p.attributes.name.toLowerCase().includes(query));
		}

		// Apply date range filter
		if (activeFilters.dateRange !== 'all') {
			const days = parseInt(activeFilters.dateRange);
			const cutoffDate = new Date();
			cutoffDate.setDate(cutoffDate.getDate() - days);

			result = result.filter((p) => {
				const modifiedDate = new Date(p.attributes.lastModifiedAt || 0);
				return modifiedDate >= cutoffDate;
			});
		}

		// Apply track count filter
		if (activeFilters.minTracks !== undefined) {
			result = result.filter((p) => (p.attributes.numberOfItems || 0) >= activeFilters.minTracks!);
		}
		if (activeFilters.maxTracks !== undefined) {
			result = result.filter((p) => (p.attributes.numberOfItems || 0) <= activeFilters.maxTracks!);
		}

		// Apply sorting
		result.sort((a, b) => {
			const aAttr = a.attributes;
			const bAttr = b.attributes;

			let comparison = 0;

			switch (prefs.sortBy) {
				case 'name':
					comparison = aAttr.name.localeCompare(bAttr.name);
					break;
				case 'tracks':
					comparison = (aAttr.numberOfItems || 0) - (bAttr.numberOfItems || 0);
					break;
				case 'created':
					comparison =
						new Date(aAttr.created || 0).getTime() - new Date(bAttr.created || 0).getTime();
					break;
				case 'modified':
				default:
					comparison =
						new Date(aAttr.lastModifiedAt || 0).getTime() -
						new Date(bAttr.lastModifiedAt || 0).getTime();
					break;
			}

			return prefs.sortDirection === 'asc' ? comparison : -comparison;
		});

		filteredPlaylists = result;
	}

	function handleSearch(query: string) {
		searchStore.set(query);
	}

	function handleFilter(filters: FilterState) {
		activeFilters = filters;
	}

	function handleSelect(id: string, selected: boolean) {
		if (selected) {
			selectedIds.add(id);
		} else {
			selectedIds.delete(id);
		}
		selectedIds = new Set(selectedIds);
	}

	function handleClearSelection() {
		selectedIds = new Set();
	}

	function handleBulkAddToFolder() {
		// TODO: Implement folder selection dialog
		console.log('Add to folder:', Array.from(selectedIds));
		alert('Add to folder feature coming soon!');
	}

	function handleBulkAddTags() {
		// TODO: Implement tag selection dialog
		console.log('Add tags:', Array.from(selectedIds));
		alert('Add tags feature coming soon!');
	}

	function handleBulkDelete() {
		if (
			confirm(
				`Are you sure you want to delete ${selectedIds.size} playlist${selectedIds.size > 1 ? 's' : ''}?`
			)
		) {
			console.log('Delete playlists:', Array.from(selectedIds));
			alert('Delete feature would remove playlists from Tidal.');
			handleClearSelection();
		}
	}

	function handleBulkExport() {
		const selectedPlaylists = playlists.filter((p) => selectedIds.has(p.id));
		const exportData = selectedPlaylists.map((p) => ({
			name: p.attributes.name,
			tracks: p.attributes.numberOfItems,
			url: p.attributes.url
		}));

		const blob = new Blob([JSON.stringify(exportData, null, 2)], {
			type: 'application/json'
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'playlists-export.json';
		a.click();
		URL.revokeObjectURL(url);
	}

	// Re-filter when sort preferences change
	$effect(() => {
		prefs.sortBy;
		prefs.sortDirection;
		search;
		activeFilters;
		filterAndSortPlaylists();
	});

	onMount(() => {
		loadPlaylists();
	});
</script>

<div class="playlists-view">
	<div class="view-header">
		<div>
			<h1>Your Playlists</h1>
			<p class="subtitle">{playlists.length} playlists in your library</p>
		</div>
	</div>

	{#if error}
		<ErrorMessage message={error} />
	{:else}
		{#if !isLoading && playlists.length > 0}
			<StatsCards {playlists} />
		{/if}

		<Toolbar onSearch={handleSearch} onFilter={handleFilter} selectedCount={selectedIds.size} />

		<PlaylistGrid
			playlists={filteredPlaylists}
			{coverUrls}
			viewMode={prefs.viewMode}
			{selectedIds}
			onSelect={handleSelect}
			loading={isLoading}
		/>

		<BulkActionBar
			selectedCount={selectedIds.size}
			onClear={handleClearSelection}
			onAddToFolder={handleBulkAddToFolder}
			onAddTags={handleBulkAddTags}
			onDelete={handleBulkDelete}
			onExport={handleBulkExport}
		/>
	{/if}
</div>

<style>
	.playlists-view {
		width: 100%;
	}

	.view-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--space-8);
	}

	.view-header h1 {
		font-size: var(--font-size-3xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.subtitle {
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		margin: 0;
	}

	@media (max-width: 768px) {
		.view-header h1 {
			font-size: var(--font-size-2xl);
		}

		.view-header {
			margin-bottom: var(--space-6);
		}
	}
</style>
