<script lang="ts">
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth';
	import AppShell from '$lib/components/layout/AppShell.svelte';
	import LoginView from '$lib/components/LoginView.svelte';
	import PlaylistsView from '$lib/components/PlaylistsView.svelte';

	const auth = $derived($authStore);

	onMount(() => {
		// Check authentication status on mount
		authStore.checkAuth();
	});
</script>

<svelte:head>
	<title>Tidal Library</title>
</svelte:head>

<AppShell>
	{#if auth.isAuthenticated}
		<PlaylistsView />
	{:else}
		<LoginView />
	{/if}
</AppShell>
