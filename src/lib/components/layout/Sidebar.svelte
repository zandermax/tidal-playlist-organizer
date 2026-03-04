<script lang="ts">
	import { viewPreferences } from '$lib/stores/viewPreferences.store';
	import FolderTree from '../organization/FolderTree.svelte';
	import Icon from '$lib/components/icons/Icon.svelte';

	interface Props {
		collapsed?: boolean;
	}

	let { collapsed = false }: Props = $props();

	let activeSection = $state<string>('library');
	let selectedFolderId = $state<string | undefined>(undefined);

	function setSelectedFolderId(folderId: string) {
		selectedFolderId = folderId;
	}

	function setActiveSection(section: string) {
		activeSection = section;
	}
</script>

<aside class="sidebar" class:collapsed>
	<nav class="sidebar-nav">
		<div class="nav-section">
			<button
				class="nav-item"
				class:active={activeSection === 'library'}
				onclick={() => setActiveSection('library')}
			>
			<Icon name="library" size={20} />
			{#if !collapsed}
				<span class="nav-text">Library</span>
			{/if}
			</button>

			<button
				class="nav-item"
				class:active={activeSection === 'recent'}
				onclick={() => setActiveSection('recent')}
			>
			<Icon name="clock" size={20} />
			{#if !collapsed}
				<span class="nav-text">Recent</span>
			{/if}
			</button>
		</div>

		{#if !collapsed}
			<div class="nav-section">
				<FolderTree {selectedFolderId} onSelectFolder={setSelectedFolderId} />
			</div>
		{/if}

		<div class="nav-section sidebar-bottom">
			<button
				class="nav-item"
				class:active={activeSection === 'settings'}
				onclick={() => setActiveSection('settings')}
			>
			<Icon name="settings" size={20} />
			{#if !collapsed}
				<span class="nav-text">Settings</span>
			{/if}
			</button>
		</div>
	</nav>
</aside>

<style>
	.sidebar {
		position: fixed;
		left: 0;
		top: var(--topbar-height);
		bottom: 0;
		width: var(--sidebar-width);
		background-color: var(--sidebar-bg);
		border-right: 1px solid var(--sidebar-border);
		overflow-y: auto;
		transition: width var(--transition-base);
		z-index: var(--z-sticky);
	}

	.sidebar.collapsed {
		width: var(--sidebar-collapsed-width);
	}

	.sidebar-nav {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: var(--space-4) 0;
	}

	.nav-section {
		padding: 0 var(--space-3);
		margin-bottom: var(--space-6);
	}

	.sidebar-bottom {
		margin-top: auto;
		margin-bottom: 0;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		width: 100%;
		padding: var(--space-2) var(--space-3);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-secondary);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
		text-align: left;
	}

	.nav-item:hover {
		color: var(--text-primary);
		background-color: var(--bg-hover);
	}

	.nav-item.active {
		color: var(--primary-600);
		background-color: var(--primary-50);
	}

	.nav-text {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.sidebar.collapsed .nav-item {
		justify-content: center;
		padding: var(--space-3);
	}

	@media (max-width: 768px) {
		.sidebar {
			transform: translateX(-100%);
		}

		.sidebar:not(.collapsed) {
			transform: translateX(0);
		}
	}
</style>
