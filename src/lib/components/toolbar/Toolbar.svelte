<script lang="ts">
	import ViewSwitcher from './ViewSwitcher.svelte';
	import SearchBar from './SearchBar.svelte';
	import FilterPanel, { type FilterState } from './FilterPanel.svelte';
	import { viewPreferences, type SortOption } from '$lib/stores/viewPreferences';
	import Icon from '$lib/components/icons/Icon.svelte';

	interface Props {
		onSearch?: (value: string) => void;
		onFilter?: (filters: FilterState) => void;
		selectedCount?: number;
	}

	let { onSearch, onFilter, selectedCount = 0 }: Props = $props();

	const prefs = $derived($viewPreferences);

	let searchValue = $state('');
	let filterPanelOpen = $state(false);

	function handleSearch(value: string) {
		searchValue = value;
		if (onSearch) {
			onSearch(value);
		}
	}

	function handleSortChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		viewPreferences.setSortBy(target.value as SortOption);
	}

	function toggleSortDirection() {
		viewPreferences.toggleSortDirection();
	}

	function openFilters() {
		filterPanelOpen = true;
	}

	function handleFilterApply(filters: FilterState) {
		if (onFilter) {
			onFilter(filters);
		}
	}
</script>

<div class="toolbar">
	<div class="toolbar-left">
		<SearchBar value={searchValue} onSearch={handleSearch} placeholder="Search playlists..." />
	</div>

	<div class="toolbar-right">
		<div class="sort-controls">
			<select class="sort-select" value={prefs.sortBy} onchange={handleSortChange}>
				<option value="modified">Last Modified</option>
				<option value="created">Date Created</option>
				<option value="name">Name</option>
				<option value="tracks">Track Count</option>
			</select>
			<button
				class="sort-direction-button"
				onclick={toggleSortDirection}
				title="Toggle sort direction"
			>
				{#if prefs.sortDirection === 'asc'}
					<Icon name="arrow-down" size={16} />
				{:else}
					<Icon name="arrow-up" size={16} />
				{/if}
			</button>
		</div>

		<button class="filter-button btn-ghost" onclick={openFilters}>
			<Icon name="filter" size={16} />
			Filters
		</button>

		<ViewSwitcher />
	</div>
</div>

<FilterPanel bind:open={filterPanelOpen} onApply={handleFilterApply} />

<style>
	.toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-6);
		padding: var(--space-4) 0;
		margin-bottom: var(--space-6);
	}

	.toolbar-left {
		flex: 1;
		max-width: 400px;
	}

	.toolbar-right {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.sort-controls {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		background-color: var(--bg-surface);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		padding: var(--space-1);
	}

	.sort-select {
		padding: var(--space-2) var(--space-3);
		font-size: var(--font-size-sm);
		color: var(--text-primary);
		background-color: transparent;
		border: none;
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.sort-select:hover {
		background-color: var(--bg-hover);
	}

	.sort-select:focus {
		outline: none;
		background-color: var(--bg-hover);
	}

	.sort-direction-button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-2);
		color: var(--text-secondary);
		border-radius: var(--radius-sm);
		transition: all var(--transition-fast);
	}

	.sort-direction-button:hover {
		color: var(--text-primary);
		background-color: var(--bg-hover);
	}

	.filter-button {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-secondary);
		background-color: var(--bg-surface);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
	}

	.filter-button:hover {
		color: var(--text-primary);
		border-color: var(--border-strong);
	}

	@media (max-width: 1024px) {
		.toolbar {
			flex-wrap: wrap;
		}

		.toolbar-left {
			flex: 1 1 100%;
			max-width: 100%;
		}

		.toolbar-right {
			flex: 1 1 100%;
			justify-content: space-between;
		}
	}

	@media (max-width: 768px) {
		.toolbar {
			gap: var(--space-4);
		}

		.toolbar-right {
			flex-wrap: wrap;
		}

		.filter-button span {
			display: none;
		}
	}
</style>
