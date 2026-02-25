<script lang="ts">
	import checkboxCheckIcon from '$lib/components/icons/CheckboxCheckIcon.svg?raw';
	import folderIcon from '$lib/components/icons/FolderIcon.svg?raw';
	import tagIcon from '$lib/components/icons/TagIcon.svg?raw';
	import exportIcon from '$lib/components/icons/ExportIcon.svg?raw';
	import trashIcon from '$lib/components/icons/TrashIcon.svg?raw';
	import closeIcon from '$lib/components/icons/CloseIcon.svg?raw';

	interface Props {
		selectedCount: number;
		onClear: () => void;
		onAddToFolder?: () => void;
		onAddTags?: () => void;
		onDelete?: () => void;
		onExport?: () => void;
	}

	let { selectedCount, onClear, onAddToFolder, onAddTags, onDelete, onExport }: Props = $props();

	const isVisible = $derived(selectedCount > 0);

	function handleAction(action?: () => void) {
		if (action) {
			action();
		}
	}
</script>

{#if isVisible}
	<div class="bulk-action-bar animate-slide-in">
		<div class="bar-content">
			<div class="selection-info">
				<span class="selection-icon">{@html checkboxCheckIcon}</span>
				<span class="count"
					>{selectedCount} {selectedCount === 1 ? 'playlist' : 'playlists'} selected</span
				>
			</div>

			<div class="actions">
				{#if onAddToFolder}
					<button
						class="action-btn"
						onclick={() => handleAction(onAddToFolder)}
						title="Add to folder"
					>
						<span class="btn-icon">{@html folderIcon}</span>
						<span>Add to Folder</span>
					</button>
				{/if}

				{#if onAddTags}
					<button class="action-btn" onclick={() => handleAction(onAddTags)} title="Add tags">
						<span class="btn-icon">{@html tagIcon}</span>
						<span>Add Tags</span>
					</button>
				{/if}

				{#if onExport}
					<button class="action-btn" onclick={() => handleAction(onExport)} title="Export">
						<span class="btn-icon">{@html exportIcon}</span>
						<span>Export</span>
					</button>
				{/if}

				{#if onDelete}
					<button class="action-btn danger" onclick={() => handleAction(onDelete)} title="Delete">
						<span class="btn-icon">{@html trashIcon}</span>
						<span>Delete</span>
					</button>
				{/if}

				<div class="divider"></div>

				<button class="action-btn" onclick={onClear} title="Clear selection">
					<span class="btn-icon">{@html closeIcon}</span>
					<span>Clear</span>
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.bulk-action-bar {
		position: fixed;
		bottom: var(--space-6);
		left: 50%;
		transform: translateX(-50%);
		z-index: var(--z-fixed);
		max-width: 800px;
		width: calc(100% - var(--space-8));
	}

	.bar-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-6);
		padding: var(--space-4) var(--space-6);
		background-color: var(--bg-surface);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-xl);
	}

	.selection-info {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		color: var(--text-primary);
		--color-ink: var(--primary-600);
	}

	.selection-icon {
		display: inline-flex;
		width: 20px;
		height: 20px;
		flex-shrink: 0;
	}

	.count {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		white-space: nowrap;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		flex-wrap: wrap;
	}

	.action-btn {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-4);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-secondary);
		background-color: var(--bg-secondary);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
		white-space: nowrap;
	}

	.action-btn:hover {
		color: var(--text-primary);
		background-color: var(--bg-tertiary);
	}

	.action-btn.danger {
		color: var(--error-600);
	}

	.action-btn.danger:hover {
		color: var(--error-700);
		background-color: var(--error-50);
	}

	.btn-icon {
		display: inline-flex;
		width: 18px;
		height: 18px;
		flex-shrink: 0;
	}

	.divider {
		width: 1px;
		height: 24px;
		background-color: var(--border-subtle);
		margin: 0 var(--space-2);
	}

	@media (max-width: 768px) {
		.bulk-action-bar {
			bottom: var(--space-4);
			width: calc(100% - var(--space-4));
		}

		.bar-content {
			flex-direction: column;
			align-items: stretch;
			gap: var(--space-4);
			padding: var(--space-4);
		}

		.selection-info {
			justify-content: center;
		}

		.actions {
			justify-content: center;
		}

		.action-btn span:not(.btn-icon) {
			display: none;
		}

		.divider {
			display: none;
		}
	}
</style>
