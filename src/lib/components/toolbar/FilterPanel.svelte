<script lang="ts">
	export interface FilterState {
		dateRange: string;
		minTracks?: number;
		maxTracks?: number;
		tags: string[];
		folders: string[];
	}

	interface Props {
		open?: boolean;
		onClose?: () => void;
		onApply?: (filters: FilterState) => void;
		initialFilters?: FilterState;
	}

	let {
		open = $bindable(false),
		onClose,
		onApply,
		initialFilters = {
			dateRange: 'all',
			tags: [],
			folders: []
		}
	}: Props = $props();

	let filters = $state<FilterState>({ ...initialFilters });

	function handleClose() {
		open = false;
		if (onClose) {
			onClose();
		}
	}

	function handleApply() {
		if (onApply) {
			onApply({ ...filters });
		}
		handleClose();
	}

	function handleReset() {
		filters = {
			dateRange: 'all',
			tags: [],
			folders: []
		};
	}

	function toggleTag(tag: string) {
		if (filters.tags.includes(tag)) {
			filters.tags = filters.tags.filter((t) => t !== tag);
		} else {
			filters.tags = [...filters.tags, tag];
		}
	}

	function toggleFolder(folder: string) {
		if (filters.folders.includes(folder)) {
			filters.folders = filters.folders.filter((f) => f !== folder);
		} else {
			filters.folders = [...filters.folders, folder];
		}
	}
</script>

{#if open}
	<div class="filter-overlay" onclick={handleClose}></div>
	<aside class="filter-panel animate-slide-in-right">
		<div class="panel-header">
			<h3>Filters</h3>
			<button class="close-button" onclick={handleClose}>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round" />
					<line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round" />
				</svg>
			</button>
		</div>

		<div class="panel-content">
			<div class="filter-section">
				<label class="filter-label">Date Modified</label>
				<select class="filter-select" bind:value={filters.dateRange}>
					<option value="all">All time</option>
					<option value="7">Last 7 days</option>
					<option value="30">Last 30 days</option>
					<option value="90">Last 90 days</option>
				</select>
			</div>

			<div class="filter-section">
				<label class="filter-label">Track Count</label>
				<div class="range-inputs">
					<input
						type="number"
						class="filter-input"
						placeholder="Min"
						min="0"
						bind:value={filters.minTracks}
					/>
					<span class="range-separator">to</span>
					<input
						type="number"
						class="filter-input"
						placeholder="Max"
						min="0"
						bind:value={filters.maxTracks}
					/>
				</div>
			</div>

			<div class="filter-section">
				<label class="filter-label">Tags</label>
				<div class="checkbox-group">
					<label class="checkbox-label">
						<input
							type="checkbox"
							checked={filters.tags.includes('workout')}
							onchange={() => toggleTag('workout')}
						/>
						<span>Workout</span>
					</label>
					<label class="checkbox-label">
						<input
							type="checkbox"
							checked={filters.tags.includes('chill')}
							onchange={() => toggleTag('chill')}
						/>
						<span>Chill</span>
					</label>
					<label class="checkbox-label">
						<input
							type="checkbox"
							checked={filters.tags.includes('party')}
							onchange={() => toggleTag('party')}
						/>
						<span>Party</span>
					</label>
				</div>
			</div>

			<div class="filter-section">
				<label class="filter-label">Folders</label>
				<div class="checkbox-group">
					<label class="checkbox-label">
						<input
							type="checkbox"
							checked={filters.folders.includes('work')}
							onchange={() => toggleFolder('work')}
						/>
						<span>Work Music</span>
					</label>
					<label class="checkbox-label">
						<input
							type="checkbox"
							checked={filters.folders.includes('favorites')}
							onchange={() => toggleFolder('favorites')}
						/>
						<span>Favorites</span>
					</label>
				</div>
			</div>
		</div>

		<div class="panel-footer">
			<button class="btn btn-secondary" onclick={handleReset}>Reset</button>
			<button class="btn btn-primary" onclick={handleApply}>Apply</button>
		</div>
	</aside>
{/if}

<style>
	.filter-overlay {
		position: fixed;
		inset: 0;
		background-color: var(--overlay-bg);
		z-index: var(--z-modal-backdrop);
		animation: fadeIn var(--transition-fast);
	}

	.filter-panel {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		width: 320px;
		background-color: var(--bg-surface);
		border-left: 1px solid var(--border-default);
		box-shadow: var(--shadow-xl);
		z-index: var(--z-modal);
		display: flex;
		flex-direction: column;
	}

	.panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-6);
		border-bottom: 1px solid var(--border-subtle);
	}

	.panel-header h3 {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--text-primary);
	}

	.close-button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-2);
		color: var(--text-secondary);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
	}

	.close-button:hover {
		color: var(--text-primary);
		background-color: var(--bg-hover);
	}

	.panel-content {
		flex: 1;
		overflow-y: auto;
		padding: var(--space-6);
	}

	.filter-section {
		margin-bottom: var(--space-6);
	}

	.filter-section:last-child {
		margin-bottom: 0;
	}

	.filter-label {
		display: block;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.filter-select,
	.filter-input {
		width: 100%;
		padding: var(--space-2) var(--space-3);
		font-size: var(--font-size-sm);
		color: var(--text-primary);
		background-color: var(--bg-surface);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
	}

	.filter-select:hover,
	.filter-input:hover {
		border-color: var(--border-strong);
	}

	.filter-select:focus,
	.filter-input:focus {
		outline: none;
		border-color: var(--primary-500);
		box-shadow: 0 0 0 3px var(--primary-100);
	}

	.range-inputs {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.range-separator {
		color: var(--text-tertiary);
		font-size: var(--font-size-sm);
	}

	.checkbox-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		cursor: pointer;
	}

	.checkbox-label:hover {
		color: var(--text-primary);
	}

	.checkbox-label input[type='checkbox'] {
		width: 16px;
		height: 16px;
		cursor: pointer;
	}

	.panel-footer {
		display: flex;
		gap: var(--space-3);
		padding: var(--space-6);
		border-top: 1px solid var(--border-subtle);
	}

	.panel-footer .btn {
		flex: 1;
	}

	@media (max-width: 768px) {
		.filter-panel {
			width: 100%;
			max-width: 320px;
		}
	}
</style>
