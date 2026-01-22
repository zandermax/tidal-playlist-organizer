<script lang="ts">
	import { authStore } from '$lib/stores/auth';
	import ErrorMessage from './ErrorMessage.svelte';

	let isLoggingIn = $state(false);
	let error = $state<string | null>(null);

	async function handleLogin() {
		try {
			isLoggingIn = true;
			error = null;
			await authStore.login();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Login failed';
			isLoggingIn = false;
		}
	}
</script>

<div class="card">
	<h2>Welcome!</h2>
	<p>
		Connect your Tidal account to view and organize your playlists.<br />
		You'll need a Tidal account and API credentials from the
		<a href="https://developer.tidal.com" target="_blank" class="info-link">Tidal Developer Portal</a
		>.
	</p>
	<button onclick={handleLogin} disabled={isLoggingIn} class="btn">
		{isLoggingIn ? 'Connecting...' : 'Login with Tidal'}
	</button>
	<div style="margin-top: 20px;">
		<ErrorMessage message={error} />
	</div>
</div>

<style>
	.card {
		background: white;
		border-radius: 12px;
		padding: 40px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
		margin-bottom: 20px;
		text-align: center;
	}

	h2 {
		margin-bottom: 20px;
		color: #333;
	}

	p {
		color: #666;
		margin-bottom: 30px;
		line-height: 1.6;
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

	.btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
	}

	.btn:active:not(:disabled) {
		transform: translateY(0);
	}

	.btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.info-link {
		color: #667eea;
		text-decoration: none;
		font-weight: 600;
	}

	.info-link:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.card {
			padding: 20px;
		}
	}
</style>
