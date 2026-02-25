<script lang="ts">
	import { organization, type Folder } from '$lib/stores/organization';
	import plusIcon from '$lib/components/icons/PlusIcon.svg?raw';
	import chevronDownIcon from '$lib/components/icons/ChevronDownIcon.svg?raw';
	import chevronRightIcon from '$lib/components/icons/ChevronRightIcon.svg?raw';
	import folderIcon from '$lib/components/icons/FolderIcon.svg?raw';
	import trashIcon from '$lib/components/icons/TrashIcon.svg?raw';

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
			<span class="btn-icon-sm">{@html plusIcon}</span>
		</button>
	</div>

	<div class="tree-content">
		{#each rootFolders as folder (folder.id)}
			<div class="folder-item">
				<div
					class="folder-button"
					class:active={selectedFolderId === folder.id}
					onclick={() => handleSelect(folder.id)}
				>
					<button
						class="folder-toggle"
						onclick={(e) => {
							e.stopPropagation();
							handleToggle(folder.id);
						}}
					>
						{#if folder.expanded}
							<span class="btn-icon-sm">{@html chevronDownIcon}</span>
						{:else}
							<span class="btn-icon-sm">{@html chevronRightIcon}</span>
						{/if}
					</button>

					<span class="folder-icon">{@html folderIcon}</span>

					<span class="folder-name">{folder.name}</span>
					<span class="folder-count">{folder.playlistIds.length}</span>

					<button
						class="delete-button"
						onclick={(e) => handleDeleteFolder(folder.id, e)}
						title="Delete folder"
					>
						<span class="btn-icon-sm">{@html trashIcon}</span>
					</button>
				</div>

				{#if folder.expanded}
					{#each getChildFolders(folder.id) as childFolder (childFolder.id)}
						<button
							class="folder-button child"
							class:active={selectedFolderId === childFolder.id}
							onclick={() => handleSelect(childFolder.id)}
						>
							<span class="folder-icon">{@html folderIcon}</span>
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
		cursor: pointer;
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
		display: inline-flex;
		width: 18px;
		height: 18px;
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

	.btn-icon-sm {
		display: inline-flex;
		width: 14px;
		height: 14px;
		flex-shrink: 0;
	}
</style>
