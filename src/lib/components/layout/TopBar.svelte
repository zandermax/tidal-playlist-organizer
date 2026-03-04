<script lang="ts">
	import { authStore } from '$lib/stores/auth';
	import { searchStore } from '$lib/stores/search';
	import Icon from '$lib/components/icons/Icon.svelte';

	const auth = $derived($authStore);

	async function handleLogout() {
		try {
			await authStore.logout();
			window.location.reload();
		} catch (err) {
			console.error('Logout error:', err);
			alert('Failed to logout. Please try again.');
		}
	}
</script>

<header class="topbar">
	<div class="topbar-content">
		<div class="topbar-left">
			<div class="logo">
				<Icon name="music-note" size={24} />
				<span class="logo-text">Tidal Library</span>
			</div>
		</div>

		<div class="topbar-center">
			<div class="search-container">
				<span class="search-icon"><Icon name="search" size={16} /></span>
				<input
					type="search"
					placeholder="Search playlists..."
					class="search-input"
					oninput={(e) => searchStore.set((e.target as HTMLInputElement).value)}
					disabled={!auth.isAuthenticated}
				/>
			</div>
		</div>

		<div class="topbar-right">
			{#if auth.isAuthenticated}
				<div class="user-menu">
					<button class="user-button" onclick={handleLogout}>
						<Icon name="logout" size={16} />
						Logout
					</button>
				</div>
			{/if}
		</div>
	</div>
</header>

<style>
	.topbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: var(--topbar-height);
		background-color: var(--topbar-bg);
		border-bottom: 1px solid var(--topbar-border);
		z-index: var(--z-fixed);
	}

	.topbar-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		padding: 0 var(--space-6);
		gap: var(--space-6);
	}

	.topbar-left {
		flex-shrink: 0;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		color: var(--text-primary);
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-base);
		--color-ink: var(--primary-500);
	}

	.logo-text {
		white-space: nowrap;
	}

	.topbar-center {
		flex: 1;
		max-width: 500px;
	}

	.search-container {
		position: relative;
		width: 100%;
	}

	.search-icon {
		position: absolute;
		left: var(--space-3);
		top: 50%;
		transform: translateY(-50%);
		color: var(--text-tertiary);
		pointer-events: none;
		display: flex;
	}

	.search-input {
		width: 100%;
		padding: var(--space-2) var(--space-3) var(--space-2) var(--space-10);
		font-size: var(--font-size-sm);
		color: var(--text-primary);
		background-color: var(--bg-secondary);
		border: 1px solid transparent;
		border-radius: var(--radius-lg);
		transition: all var(--transition-fast);
	}

	.search-input:hover:not(:disabled) {
		background-color: var(--bg-tertiary);
	}

	.search-input:focus {
		outline: none;
		background-color: var(--bg-surface);
		border-color: var(--primary-500);
		box-shadow: 0 0 0 3px var(--primary-100);
	}

	.search-input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.topbar-right {
		flex-shrink: 0;
	}

	.user-menu {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.user-button {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-secondary);
		background-color: transparent;
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
	}

	.user-button:hover {
		color: var(--text-primary);
		background-color: var(--bg-hover);
	}

	@media (max-width: 768px) {
		.topbar-content {
			padding: 0 var(--space-4);
		}

		.logo-text {
			display: none;
		}

		.topbar-center {
			max-width: 300px;
		}

		.search-input {
			font-size: var(--font-size-xs);
		}
	}
</style>
