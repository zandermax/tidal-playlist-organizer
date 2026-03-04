<script lang="ts">
	import TopBar from './TopBar.svelte';
	import Sidebar from './Sidebar.svelte';
	import { viewPreferences } from '$lib/stores/viewPreferences.store';
	import { authStore } from '$lib/stores/auth.store';

	interface Props {
		children?: any;
	}

	let { children }: Props = $props();

	const prefs = $derived($viewPreferences);
	const auth = $derived($authStore);
</script>

<div class="app-shell">
	<TopBar />

	{#if auth.isAuthenticated}
		<Sidebar collapsed={prefs.sidebarCollapsed} />
	{/if}

	<main class="main-content" class:with-sidebar={auth.isAuthenticated && !prefs.sidebarCollapsed}>
		<div class="content-wrapper">
			{@render children?.()}
		</div>
	</main>
</div>

<style>
	.app-shell {
		position: relative;
		min-height: 100vh;
		background-color: var(--bg-app);
	}

	.main-content {
		padding-top: var(--topbar-height);
		min-height: 100vh;
		transition: margin-left var(--transition-base);
	}

	.main-content.with-sidebar {
		margin-left: var(--sidebar-width);
	}

	.content-wrapper {
		max-width: var(--content-max-width);
		margin: 0 auto;
		padding: var(--space-8) var(--space-6);
	}

	@media (max-width: 1024px) {
		.main-content.with-sidebar {
			margin-left: 0;
		}
	}

	@media (max-width: 768px) {
		.content-wrapper {
			padding: var(--space-6) var(--space-4);
		}
	}
</style>
