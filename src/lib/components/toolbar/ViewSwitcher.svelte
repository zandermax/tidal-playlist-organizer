<script lang="ts">
	import { viewPreferences, type ViewMode } from '$lib/stores/viewPreferences';

	const prefs = $derived($viewPreferences);

	function setView(mode: ViewMode) {
		viewPreferences.setViewMode(mode);
	}
</script>

<div class="view-switcher">
	<button
		class="view-button"
		class:active={prefs.viewMode === 'grid'}
		onclick={() => setView('grid')}
		title="Grid view"
	>
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
			<rect x="3" y="3" width="7" height="7" stroke-width="2" rx="1" />
			<rect x="14" y="3" width="7" height="7" stroke-width="2" rx="1" />
			<rect x="14" y="14" width="7" height="7" stroke-width="2" rx="1" />
			<rect x="3" y="14" width="7" height="7" stroke-width="2" rx="1" />
		</svg>
	</button>

	<button
		class="view-button"
		class:active={prefs.viewMode === 'list'}
		onclick={() => setView('list')}
		title="List view"
	>
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
			<line x1="8" y1="6" x2="21" y2="6" stroke-width="2" stroke-linecap="round" />
			<line x1="8" y1="12" x2="21" y2="12" stroke-width="2" stroke-linecap="round" />
			<line x1="8" y1="18" x2="21" y2="18" stroke-width="2" stroke-linecap="round" />
			<line x1="3" y1="6" x2="3.01" y2="6" stroke-width="2" stroke-linecap="round" />
			<line x1="3" y1="12" x2="3.01" y2="12" stroke-width="2" stroke-linecap="round" />
			<line x1="3" y1="18" x2="3.01" y2="18" stroke-width="2" stroke-linecap="round" />
		</svg>
	</button>

	<button
		class="view-button"
		class:active={prefs.viewMode === 'compact'}
		onclick={() => setView('compact')}
		title="Compact view"
	>
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
			<rect x="3" y="3" width="7" height="7" stroke-width="2" rx="1" />
			<rect x="14" y="3" width="7" height="7" stroke-width="2" rx="1" />
			<rect x="14" y="14" width="7" height="7" stroke-width="2" rx="1" />
			<rect x="3" y="14" width="7" height="7" stroke-width="2" rx="1" />
		</svg>
	</button>
</div>

<style>
	.view-switcher {
		display: flex;
		gap: var(--space-1);
		background-color: var(--bg-secondary);
		padding: var(--space-1);
		border-radius: var(--radius-md);
	}

	.view-button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-2);
		color: var(--text-secondary);
		border-radius: var(--radius-sm);
		transition: all var(--transition-fast);
	}

	.view-button:hover {
		color: var(--text-primary);
		background-color: var(--bg-hover);
	}

	.view-button.active {
		color: var(--primary-600);
		background-color: var(--bg-surface);
		box-shadow: var(--shadow-xs);
	}
</style>
