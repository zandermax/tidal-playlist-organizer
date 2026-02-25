<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';

	let isProcessing = $state(true);
	let error = $state<string | null>(null);

	onMount(async () => {
		try {
			const urlParams = new URLSearchParams(window.location.search);

			// Check for OAuth error
			if (urlParams.has('error')) {
				const errorMsg =
					urlParams.get('error_description') || urlParams.get('error') || 'Authentication failed';
				error = errorMsg;
				isProcessing = false;
				return;
			}

			// Check if we have an authorization code
			if (!urlParams.has('code')) {
				error = 'No authorization code received';
				isProcessing = false;
				return;
			}

			// Finalize authentication
			await authStore.finalizeAuth(window.location.search);

			// Redirect to home page
			await goto('/', { replaceState: true });
		} catch (err) {
			console.error('Error during OAuth callback:', err);
			error = err instanceof Error ? err.message : 'Authentication failed';
			isProcessing = false;
		}
	});
</script>

<svelte:head>
	<title>Authenticating... | Tidal Playlist Organizer</title>
</svelte:head>

<div class="container">
	<div class="card">
		{#if isProcessing}
			<LoadingSpinner message="Completing authentication..." />
		{:else if error}
			<h2>Authentication Failed</h2>
			<ErrorMessage message={error} />
			<div style="text-align: center; margin-top: 20px;">
				<a href="/" class="btn">Return to Home</a>
			</div>
		{/if}
	</div>
</div>

<style>
	.container {
		max-width: 600px;
		margin: 100px auto;
		padding: 20px;
	}

	.card {
		background: white;
		border-radius: 12px;
		padding: 40px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
	}

	h2 {
		text-align: center;
		color: #333;
		margin-bottom: 20px;
	}

	.btn {
		display: inline-block;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		padding: 15px 40px;
		font-size: 1.1em;
		border-radius: 8px;
		cursor: pointer;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		font-weight: 600;
		text-decoration: none;
	}

	.btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
	}
</style>
