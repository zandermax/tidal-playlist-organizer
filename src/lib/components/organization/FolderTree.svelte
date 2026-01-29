<script lang="ts">
	import { organization, type Folder } from '$lib/stores/organization';

	interface Props {
		folders?: Folder[];
		onSelectFolder?: (folderId: string) => void;
		selectedFolderId?: string;
	}

	let { folders = [], onSelectFolder, selectedFolderId }: Props = $props();

	const org = $derived($organization);

	function handleToggle(folderId: string) {
		organization.toggleFolder(folderId);
	}

	function handleSelect(folderId: string) {
		if (onSelectFolder) {
			onSelectFolder(folderId);
		}
	}

	function handleAddFolder() {
		const name = prompt('Enter folder name:');
		if (name) {
			organization.addFolder(name);
		}
	}

	function handleDeleteFolder(folderId: string, event: Event) {
		event.stopPropagation();
		if (confirm('Are you sure you want to delete this folder?')) {
			organization.removeFolder(folderId);
		}
	}

	// Get root folders (no parent)
	const rootFolders = $derived(org.folders.filter((f) => !f.parentId));

	// Get child folders for a parent
	function getChildFolders(parentId: string): Folder[] {
		return org.folders.filter((f) => f.parentId === parentId);
	}
</script>

<div class="folder-tree">
	<div class="tree-header">
		<span class="tree-title">Folders</span>
		<button class="add-button" onclick={handleAddFolder} title="Add folder">
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<line x1="12" y1="5" x2="12" y2="19" stroke-width="2" stroke-linecap="round" />
				<line x1="5" y1="12" x2="19" y2="12" stroke-width="2" stroke-linecap="round" />
			</svg>
		</button>
	</div>

	<div class="tree-content">
		{#each rootFolders as folder (folder.id)}
			<div class="folder-item">
				<button
					class="folder-button"
					class:active={selectedFolderId === folder.id}
					onclick={() => handleSelect(folder.id)}
				>
					<button class="folder-toggle" onclick={(e) => { e.stopPropagation(); handleToggle(folder.id); }}>
						{#if folder.expanded}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
								<polyline points="6 9 12 15 18 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
						{:else}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
								<polyline points="9 18 15 12 9 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
						{/if}
					</button>

					<svg class="folder-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path
							d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>

					<span class="folder-name">{folder.name}</span>
					<span class="folder-count">{folder.playlistIds.length}</span>

					<button
						class="delete-button"
						onclick={(e) => handleDeleteFolder(folder.id, e)}
						title="Delete folder"
					>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<polyline points="3 6 5 6 21 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
							<path
								d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</button>

				{#if folder.expanded}
					{#each getChildFolders(folder.id) as childFolder (childFolder.id)}
						<button
							class="folder-button child"
							class:active={selectedFolderId === childFolder.id}
							onclick={() => handleSelect(childFolder.id)}
						>
							<svg class="folder-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
								<path
									d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							<span class="folder-name">{childFolder.name}</span>
							<span class="folder-count">{childFolder.playlistIds.length}</span>
						</button>
					{/each}
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.folder-tree {
		width: 100%;
	}

	.tree-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-2) var(--space-3);
		margin-bottom: var(--space-1);
	}

	.tree-title {
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		color: var(--text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.add-button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-1);
		color: var(--text-tertiary);
		border-radius: var(--radius-sm);
		transition: all var(--transition-fast);
	}

	.add-button:hover {
		color: var(--text-primary);
		background-color: var(--bg-hover);
	}

	.tree-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.folder-item {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.folder-button {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		width: 100%;
		padding: var(--space-2) var(--space-3);
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
		text-align: left;
		position: relative;
	}

	.folder-button:hover {
		color: var(--text-primary);
		background-color: var(--bg-hover);
	}

	.folder-button.active {
		color: var(--primary-600);
		background-color: var(--primary-50);
	}

	.folder-button.child {
		padding-left: var(--space-8);
	}

	.folder-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2px;
		color: inherit;
	}

	.folder-icon {
		flex-shrink: 0;
	}

	.folder-name {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.folder-count {
		flex-shrink: 0;
		font-size: var(--font-size-xs);
		color: var(--text-tertiary);
	}

	.delete-button {
		display: none;
		align-items: center;
		justify-content: center;
		padding: var(--space-1);
		color: var(--text-tertiary);
		border-radius: var(--radius-sm);
		transition: all var(--transition-fast);
	}

	.folder-button:hover .delete-button {
		display: flex;
	}

	.delete-button:hover {
		color: var(--error-600);
		background-color: var(--error-50);
	}
</style>
