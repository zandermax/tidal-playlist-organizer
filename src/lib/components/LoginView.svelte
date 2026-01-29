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

<div class="login-container">
	<div class="login-card animate-fade-in-up">
		<div class="login-icon">
			<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path
					d="M9 18V5l12-2v13M9 13c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>

		<h1>Welcome to Tidal Library</h1>
		<p class="subtitle">
			Connect your Tidal account to view and organize your playlists in a professional library
			interface.
		</p>

		<button onclick={handleLogin} disabled={isLoggingIn} class="btn btn-primary btn-lg login-button">
			{#if isLoggingIn}
				<svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<circle cx="12" cy="12" r="10" stroke-width="3" stroke-dasharray="32" stroke-dashoffset="8"/>
				</svg>
				Connecting...
			{:else}
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<path
						d="M9 18V5l12-2v13M9 13c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				Login with Tidal
			{/if}
		</button>

		{#if error}
			<div class="error-container">
				<ErrorMessage message={error} />
			</div>
		{/if}

		<div class="info-box">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<circle cx="12" cy="12" r="10" stroke-width="2" />
				<line x1="12" y1="16" x2="12" y2="12" stroke-width="2" stroke-linecap="round" />
				<line x1="12" y1="8" x2="12.01" y2="8" stroke-width="2" stroke-linecap="round" />
			</svg>
			<p>
				You'll need a Tidal account and API credentials from the
				<a href="https://developer.tidal.com" target="_blank" class="info-link">
					Tidal Developer Portal
				</a>
			</p>
		</div>
	</div>
</div>

<style>
	.login-container {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: calc(100vh - var(--topbar-height) - var(--space-16));
		padding: var(--space-8);
	}

	.login-card {
		max-width: 480px;
		width: 100%;
		padding: var(--space-12);
		background-color: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-lg);
		text-align: center;
	}

	.login-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 96px;
		height: 96px;
		margin: 0 auto var(--space-6);
		background: linear-gradient(135deg, var(--primary-100) 0%, var(--primary-200) 100%);
		color: var(--primary-600);
		border-radius: var(--radius-2xl);
	}

	h1 {
		font-size: var(--font-size-3xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-primary);
		margin-bottom: var(--space-3);
	}

	.subtitle {
		font-size: var(--font-size-base);
		color: var(--text-secondary);
		line-height: var(--line-height-relaxed);
		margin-bottom: var(--space-8);
	}

	.login-button {
		width: 100%;
		margin-bottom: var(--space-6);
	}

	.spinner {
		animation: spin 1s linear infinite;
	}

	.error-container {
		margin-bottom: var(--space-6);
	}

	.info-box {
		display: flex;
		gap: var(--space-3);
		padding: var(--space-4);
		background-color: var(--bg-info);
		border: 1px solid var(--primary-200);
		border-radius: var(--radius-lg);
		text-align: left;
	}

	.info-box svg {
		flex-shrink: 0;
		color: var(--primary-600);
		margin-top: 2px;
	}

	.info-box p {
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		line-height: var(--line-height-relaxed);
		margin: 0;
	}

	.info-link {
		color: var(--primary-600);
		font-weight: var(--font-weight-medium);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.info-link:hover {
		color: var(--primary-700);
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.login-container {
			padding: var(--space-4);
		}

		.login-card {
			padding: var(--space-8);
		}

		h1 {
			font-size: var(--font-size-2xl);
		}

		.login-icon {
			width: 80px;
			height: 80px;
		}

		.login-icon svg {
			width: 48px;
			height: 48px;
		}
	}
</style>
