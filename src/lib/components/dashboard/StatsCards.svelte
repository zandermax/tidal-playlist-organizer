<script lang="ts">
	import type { Playlist } from '$lib/types/tidal';
	import Icon from '$lib/components/icons/Icon.svelte';

	interface Props {
		playlists: Playlist[];
	}

	let { playlists }: Props = $props();

	// Calculate statistics
	const totalPlaylists = $derived(playlists.length);
	const totalTracks = $derived(
		playlists.reduce((sum, p) => sum + (p.attributes.numberOfItems || 0), 0)
	);

	// Calculate total duration (if we had duration data)
	// For now we'll estimate: average 3.5 minutes per track
	const estimatedMinutes = $derived(totalTracks * 3.5);
	const estimatedHours = $derived(Math.floor(estimatedMinutes / 60));

	// Find most recently updated playlist
	const lastUpdated = $derived(() => {
		if (playlists.length === 0) return 'N/A';

		const mostRecent = playlists.reduce((latest, p) => {
			const currentDate = new Date(p.attributes.lastModifiedAt || 0);
			const latestDate = new Date(latest.attributes.lastModifiedAt || 0);
			return currentDate > latestDate ? p : latest;
		}, playlists[0]);

		const date = new Date(mostRecent.attributes.lastModifiedAt || 0);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (diffDays === 0) return 'Today';
		if (diffDays === 1) return 'Yesterday';
		if (diffDays < 7) return `${diffDays} days ago`;
		if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
		return `${Math.floor(diffDays / 30)} months ago`;
	});
</script>

<div class="stats-cards">
	<div class="stat-card">
		<div class="stat-icon">
			<Icon name="folder" size={24} />
		</div>
		<div class="stat-content">
			<div class="stat-label">Playlists</div>
			<div class="stat-value">{totalPlaylists}</div>
		</div>
	</div>

	<div class="stat-card">
		<div class="stat-icon">
			<Icon name="music-note" size={24} />
		</div>
		<div class="stat-content">
			<div class="stat-label">Total Tracks</div>
			<div class="stat-value">{totalTracks.toLocaleString()}</div>
		</div>
	</div>

	<div class="stat-card">
		<div class="stat-icon">
			<Icon name="clock" size={24} />
		</div>
		<div class="stat-content">
			<div class="stat-label">Est. Duration</div>
			<div class="stat-value">{estimatedHours}h</div>
		</div>
	</div>

	<div class="stat-card">
		<div class="stat-icon">
			<Icon name="calendar" size={24} />
		</div>
		<div class="stat-content">
			<div class="stat-label">Last Updated</div>
			<div class="stat-value">{lastUpdated()}</div>
		</div>
	</div>
</div>

<style>
	.stats-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--space-4);
		margin-bottom: var(--space-8);
	}

	.stat-card {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-5);
		background-color: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		transition: all var(--transition-fast);
	}

	.stat-card:hover {
		border-color: var(--border-default);
		box-shadow: var(--shadow-sm);
	}

	.stat-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background-color: var(--primary-50);
		color: var(--primary-600);
		border-radius: var(--radius-lg);
		flex-shrink: 0;
	}

	.stat-content {
		flex: 1;
		min-width: 0;
	}

	.stat-label {
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
		color: var(--text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: var(--space-1);
	}

	.stat-value {
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-primary);
		line-height: 1;
	}

	@media (max-width: 1024px) {
		.stats-cards {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.stats-cards {
			grid-template-columns: 1fr;
			gap: var(--space-3);
			margin-bottom: var(--space-6);
		}

		.stat-card {
			padding: var(--space-4);
		}

		.stat-icon {
			width: 40px;
			height: 40px;
		}

		.stat-value {
			font-size: var(--font-size-xl);
		}
	}
</style>
