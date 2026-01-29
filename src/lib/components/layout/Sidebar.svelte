<script lang="ts">
	import { viewPreferences } from '$lib/stores/viewPreferences';

	interface Props {
		collapsed?: boolean;
	}

	let { collapsed = false }: Props = $props();

	const prefs = $derived($viewPreferences);

	let activeSection = $state<string>('library');

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
				<svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
					<path
						d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				{#if !collapsed}
					<span class="nav-text">Library</span>
				{/if}
			</button>

			<button
				class="nav-item"
				class:active={activeSection === 'recent'}
				onclick={() => setActiveSection('recent')}
			>
				<svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
					<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
					<path
						d="M12 6v6l4 2"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				{#if !collapsed}
					<span class="nav-text">Recent</span>
				{/if}
			</button>
		</div>

		{#if !collapsed}
			<div class="nav-section">
				<div class="section-header">
					<span class="section-title">Folders</span>
					<button class="section-action" title="Add folder">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<line x1="12" y1="5" x2="12" y2="19" stroke-width="2" stroke-linecap="round" />
							<line x1="5" y1="12" x2="19" y2="12" stroke-width="2" stroke-linecap="round" />
						</svg>
					</button>
				</div>

				<div class="folder-list">
					<button class="nav-item sub-item">
						<svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
							<path
								d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<span class="nav-text">Work Music</span>
						<span class="count">12</span>
					</button>

					<button class="nav-item sub-item">
						<svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
							<path
								d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<span class="nav-text">Favorites</span>
						<span class="count">8</span>
					</button>
				</div>
			</div>

			<div class="nav-section">
				<div class="section-header">
					<span class="section-title">Tags</span>
					<button class="section-action" title="Manage tags">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<line x1="12" y1="5" x2="12" y2="19" stroke-width="2" stroke-linecap="round" />
							<line x1="5" y1="12" x2="19" y2="12" stroke-width="2" stroke-linecap="round" />
						</svg>
					</button>
				</div>

				<div class="tag-list">
					<button class="tag-item">
						<span class="tag-dot" style="background-color: var(--tag-blue-bg);"></span>
						<span class="tag-name">Workout</span>
						<span class="count">5</span>
					</button>
					<button class="tag-item">
						<span class="tag-dot" style="background-color: var(--tag-green-bg);"></span>
						<span class="tag-name">Chill</span>
						<span class="count">7</span>
					</button>
					<button class="tag-item">
						<span class="tag-dot" style="background-color: var(--tag-purple-bg);"></span>
						<span class="tag-name">Party</span>
						<span class="count">3</span>
					</button>
				</div>
			</div>
		{/if}

		<div class="nav-section sidebar-bottom">
			<button
				class="nav-item"
				class:active={activeSection === 'settings'}
				onclick={() => setActiveSection('settings')}
			>
				<svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
					<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
					<path
						d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					/>
				</svg>
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

	.section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-2) var(--space-3);
		margin-bottom: var(--space-1);
	}

	.section-title {
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		color: var(--text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.section-action {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-1);
		color: var(--text-tertiary);
		border-radius: var(--radius-sm);
		transition: all var(--transition-fast);
	}

	.section-action:hover {
		color: var(--text-primary);
		background-color: var(--bg-hover);
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

	.nav-icon {
		flex-shrink: 0;
	}

	.nav-text {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.count {
		flex-shrink: 0;
		font-size: var(--font-size-xs);
		color: var(--text-tertiary);
	}

	.sub-item {
		font-size: var(--font-size-sm);
		padding-left: var(--space-3);
	}

	.folder-list,
	.tag-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.tag-item {
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
	}

	.tag-item:hover {
		color: var(--text-primary);
		background-color: var(--bg-hover);
	}

	.tag-dot {
		width: 8px;
		height: 8px;
		border-radius: var(--radius-full);
		flex-shrink: 0;
	}

	.tag-name {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.sidebar.collapsed .nav-item {
		justify-content: center;
		padding: var(--space-3);
	}

	.sidebar.collapsed .section-header,
	.sidebar.collapsed .folder-list,
	.sidebar.collapsed .tag-list {
		display: none;
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
