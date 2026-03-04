<script lang="ts">
	import PlaylistCard from '../PlaylistCard.svelte';
	import type { Playlist } from '$lib/types/tidal';
	import type { ViewMode } from '$lib/stores/viewPreferences.store';
	import Icon from '$lib/components/icons/Icon.svelte';

	interface Props {
		playlists: Playlist[];
		coverUrls: Map<string, string | null>;
		viewMode?: ViewMode;
		selectedIds?: Set<string>;
		onSelect?: (id: string, selected: boolean) => void;
		loading?: boolean;
	}

	let {
		playlists,
		coverUrls,
		viewMode = 'grid',
		selectedIds = new Set(),
		onSelect,
		loading = false
	}: Props = $props();

	function getCoverUrl(playlist: Playlist): string | null {
		return coverUrls.get(playlist.id) || null;
	}

	function isSelected(id: string): boolean {
		return selectedIds.has(id);
	}

	// Mock tags for demonstration - will be replaced with real data
	const mockTags: Record<string, string[]> = {};
</script>

{#if loading}
	<div class="playlist-grid" data-view={viewMode}>
		{#each Array(6) as _, i}
			<div class="skeleton-card" data-view={viewMode}>
				<div class="skeleton skeleton-cover"></div>
				<div class="skeleton-info">
					<div class="skeleton skeleton-heading"></div>
					<div class="skeleton skeleton-text"></div>
					<div class="skeleton skeleton-text" style="width: 60%;"></div>
				</div>
			</div>
		{/each}
	</div>
{:else if playlists.length === 0}
	<div class="empty-message">
		<span class="empty-icon"><Icon name="music-note" size={64} /></span>
		<h3>No playlists found</h3>
		<p>Try adjusting your search or filters</p>
	</div>
{:else}
	<div class="playlist-grid" data-view={viewMode}>
		{#each playlists as playlist, i (playlist.id)}
			<div class="grid-item animate-fade-in-up" style="animation-delay: {Math.min(i * 30, 300)}ms">
				<PlaylistCard
					{playlist}
					coverUrl={getCoverUrl(playlist)}
					{viewMode}
					selected={isSelected(playlist.id)}
					{onSelect}
					tags={mockTags[playlist.id] || []}
				/>
			</div>
		{/each}
	</div>
{/if}

<style>
	.playlist-grid {
		display: grid;
		gap: var(--space-5);
		animation: fadeIn var(--transition-base);
	}

	.playlist-grid[data-view='grid'] {
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	}

	.playlist-grid[data-view='compact'] {
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: var(--space-4);
	}

	.playlist-grid[data-view='list'] {
		grid-template-columns: 1fr;
		gap: var(--space-2);
	}

	.grid-item {
		opacity: 0;
		animation-fill-mode: forwards;
	}

	/* Skeleton Loading */
	.skeleton-card {
		background-color: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.skeleton-card[data-view='grid'],
	.skeleton-card[data-view='compact'] {
		display: flex;
		flex-direction: column;
	}

	.skeleton-card[data-view='list'] {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-3);
	}

	.skeleton-cover {
		width: 100%;
		aspect-ratio: 1;
	}

	.skeleton-card[data-view='list'] .skeleton-cover {
		width: 64px;
		height: 64px;
		flex-shrink: 0;
		border-radius: var(--radius-md);
	}

	.skeleton-info {
		padding: var(--space-4);
	}

	.skeleton-card[data-view='compact'] .skeleton-info {
		padding: var(--space-2) var(--space-3);
	}

	.skeleton-card[data-view='list'] .skeleton-info {
		flex: 1;
		padding: 0;
	}

	/* Empty State */
	.empty-message {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--space-24) var(--space-6);
		text-align: center;
		color: var(--text-tertiary);
	}

	.empty-icon {
		margin-bottom: var(--space-6);
		opacity: 0.5;
	}

	.empty-message h3 {
		margin-bottom: var(--space-2);
		color: var(--text-secondary);
	}

	.empty-message p {
		color: var(--text-tertiary);
	}

	@media (max-width: 1024px) {
		.playlist-grid[data-view='grid'] {
			grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		}
	}

	@media (max-width: 768px) {
		.playlist-grid[data-view='grid'] {
			grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
			gap: var(--space-4);
		}

		.playlist-grid[data-view='compact'] {
			grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
			gap: var(--space-3);
		}
	}
</style>
