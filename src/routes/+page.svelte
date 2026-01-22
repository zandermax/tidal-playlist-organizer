<script lang="ts">
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth';
	import Header from '$lib/components/Header.svelte';
	import LoginView from '$lib/components/LoginView.svelte';
	import PlaylistsView from '$lib/components/PlaylistsView.svelte';

	const auth = $derived($authStore);

	onMount(() => {
		// Check authentication status on mount
		authStore.checkAuth();
	});
</script>

<svelte:head>
	<title>Tidal Playlist Organizer</title>
</svelte:head>

<div class="container">
	<Header title="🎵 Tidal Playlist Organizer" subtitle="View and manage your Tidal playlists" />

	{#if auth.isAuthenticated}
		<PlaylistsView />
	{:else}
		<LoginView />
	{/if}
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
	}
</style>
