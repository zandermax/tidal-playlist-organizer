<script lang="ts">
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
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<polyline points="9 11 12 14 22 4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					<path
						d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<span class="count">{selectedCount} {selectedCount === 1 ? 'playlist' : 'playlists'} selected</span>
			</div>

			<div class="actions">
				{#if onAddToFolder}
					<button class="action-btn" onclick={() => handleAction(onAddToFolder)} title="Add to folder">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path
								d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<span>Add to Folder</span>
					</button>
				{/if}

				{#if onAddTags}
					<button class="action-btn" onclick={() => handleAction(onAddTags)} title="Add tags">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path
								d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<line x1="7" y1="7" x2="7.01" y2="7" stroke-width="2" stroke-linecap="round" />
						</svg>
						<span>Add Tags</span>
					</button>
				{/if}

				{#if onExport}
					<button class="action-btn" onclick={() => handleAction(onExport)} title="Export">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path
								d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5-5 5 5M12 5v12"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<span>Export</span>
					</button>
				{/if}

				{#if onDelete}
					<button class="action-btn danger" onclick={() => handleAction(onDelete)} title="Delete">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<polyline points="3 6 5 6 21 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
							<path
								d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<span>Delete</span>
					</button>
				{/if}

				<div class="divider"></div>

				<button class="action-btn" onclick={onClear} title="Clear selection">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round" />
						<line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round" />
					</svg>
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
	}

	.selection-info svg {
		color: var(--primary-600);
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

		.action-btn span {
			display: none;
		}

		.divider {
			display: none;
		}
	}
</style>
