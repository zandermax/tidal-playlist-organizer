<script lang="ts">
	import { viewPreferences, type ViewMode } from '$lib/stores/viewPreferences';
	import Icon from '$lib/components/icons/Icon.svelte';

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
		<Icon name="grid" size={16} />
	</button>

	<button
		class="view-button"
		class:active={prefs.viewMode === 'list'}
		onclick={() => setView('list')}
		title="List view"
	>
		<Icon name="list" size={16} />
	</button>

	<button
		class="view-button"
		class:active={prefs.viewMode === 'compact'}
		onclick={() => setView('compact')}
		title="Compact view"
	>
		<Icon name="grid" size={16} />
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
