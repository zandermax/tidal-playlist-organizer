<script lang="ts">
	import { authStore } from '$lib/stores/auth';
	import ErrorMessage from './ErrorMessage.svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import musicNoteIcon from '$lib/components/icons/MusicNoteIcon.svg?raw';
	import infoIcon from '$lib/components/icons/InfoIcon.svg?raw';

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
			<span class="hero-icon">{@html musicNoteIcon}</span>
		</div>

		<h1>Welcome to Tidal Library</h1>
		<p class="subtitle">
			Connect your Tidal account to view and organize your playlists in a professional library
			interface.
		</p>

		<button
			onclick={handleLogin}
			disabled={isLoggingIn}
			class="btn btn-primary btn-lg login-button"
		>
			{#if isLoggingIn}
				<span class="spinner"><SpinnerIcon /></span>
				Connecting...
			{:else}
				<span class="btn-icon">{@html musicNoteIcon}</span>
				Login with Tidal
			{/if}
		</button>

		{#if error}
			<div class="error-container">
				<ErrorMessage message={error} />
			</div>
		{/if}

		<div class="info-box">
			<span class="info-icon">{@html infoIcon}</span>
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

	.hero-icon {
		display: inline-flex;
		width: 64px;
		height: 64px;
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
		display: inline-flex;
		width: 20px;
		height: 20px;
	}

	.btn-icon {
		display: inline-flex;
		width: 20px;
		height: 20px;
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
		--color-ink: var(--primary-600);
	}

	.info-icon {
		display: inline-flex;
		width: 16px;
		height: 16px;
		flex-shrink: 0;
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

		.hero-icon {
			width: 48px;
			height: 48px;
		}
	}
</style>
