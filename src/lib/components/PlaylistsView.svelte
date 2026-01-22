<script lang="ts">
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth';
	import { config } from '$lib/stores/config';
	import { createAPIClient } from '@tidal-music/api';
	import { credentialsProvider } from '@tidal-music/auth';
	import { getCoverArtUrl } from '$lib/utils/tidal-utils';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import ErrorMessage from './ErrorMessage.svelte';
	import PlaylistCard from './PlaylistCard.svelte';
	import type { Playlist, CoverArt } from '$lib/types/tidal';

	let isLoading = $state(true);
	let error = $state<string | null>(null);
	let playlists = $state<Playlist[]>([]);
	let included = $state<CoverArt[]>([]);

	const auth = $derived($authStore);
	const cfg = $derived($config);

	async function loadPlaylists() {
		if (!auth.userId) {
			error = 'User ID not available';
			isLoading = false;
			return;
		}

		try {
			isLoading = true;
			error = null;

			const apiClient = createAPIClient(credentialsProvider);

			const { data, error: apiError } = await apiClient.GET('/playlists', {
				params: {
					query: {
						'filter[owners.id]': [auth.userId],
						include: ['coverArt', 'owners'],
						countryCode: cfg.countryCode,
						sort: ['-lastModifiedAt']
					}
				}
			});

			if (apiError) {
				console.error('API Error:', apiError);
				const errorMsg = apiError.errors?.map((e) => e.detail).join(', ') || 'Failed to load playlists';
				error = errorMsg;
				isLoading = false;
				return;
			}

			if (!data?.data) {
				error = 'No data returned from API';
				isLoading = false;
				return;
			}

			playlists = data.data as Playlist[];
			included = (data.included as CoverArt[]) || [];
			isLoading = false;
		} catch (err) {
			console.error('Error loading playlists:', err);
			error = err instanceof Error ? err.message : 'Failed to load playlists';
			isLoading = false;
		}
	}

	async function handleLogout() {
		try {
			await authStore.logout();
			window.location.reload();
		} catch (err) {
			console.error('Logout error:', err);
			alert('Failed to logout. Please try again.');
		}
	}

	onMount(() => {
		loadPlaylists();
	});
</script>

<div class="card">
	<div class="user-header">
		<div class="user-info">
			<h2>Your Playlists</h2>
			{#if auth.userId}
				<p>User ID: {auth.userId}</p>
			{/if}
		</div>
		<div>
			<button onclick={handleLogout} class="btn btn-secondary">Logout</button>
		</div>
	</div>

	{#if isLoading}
		<LoadingSpinner message="Loading your playlists..." />
	{:else if error}
		<ErrorMessage message={error} />
	{:else if playlists.length === 0}
		<div class="empty-state">
			<h3>No playlists found</h3>
			<p>Create some playlists in Tidal to see them here!</p>
		</div>
	{:else}
		<div class="playlists-grid">
			{#each playlists as playlist (playlist.id)}
				<PlaylistCard {playlist} coverUrl={getCoverArtUrl(playlist, included)} />
			{/each}
		</div>
	{/if}
</div>

<style>
	.card {
		background: white;
		border-radius: 12px;
		padding: 40px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
		margin-bottom: 20px;
	}

	.user-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
		padding-bottom: 20px;
		border-bottom: 2px solid #eee;
	}

	.user-info h2 {
		color: #333;
		margin-bottom: 5px;
	}

	.user-info p {
		color: #666;
		font-size: 0.9em;
	}

	.btn {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		padding: 15px 40px;
		font-size: 1.1em;
		border-radius: 8px;
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
		font-weight: 600;
	}

	.btn-secondary {
		background: #f44336;
	}

	.btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
	}

	.btn-secondary:hover {
		box-shadow: 0 5px 20px rgba(244, 67, 54, 0.4);
	}

	.btn:active {
		transform: translateY(0);
	}

	.empty-state {
		text-align: center;
		padding: 60px 20px;
		color: #666;
	}

	.empty-state h3 {
		margin-bottom: 10px;
		color: #333;
	}

	.playlists-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 20px;
		margin-top: 20px;
	}

	@media (max-width: 768px) {
		.card {
			padding: 20px;
		}

		.user-header {
			flex-direction: column;
			gap: 15px;
			text-align: center;
		}

		.playlists-grid {
			grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
			gap: 15px;
		}
	}
</style>
