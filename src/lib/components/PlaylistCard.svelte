<script lang="ts">
	import type { Playlist } from '$lib/types/tidal';
	import { formatDate } from '$lib/utils/tidal-utils';
	import type { ViewMode } from '$lib/stores/viewPreferences';

	interface Props {
		playlist: Playlist;
		coverUrl: string | null;
		viewMode?: ViewMode;
		selected?: boolean;
		onSelect?: (id: string, selected: boolean) => void;
		tags?: string[];
	}

	let {
		playlist,
		coverUrl,
		viewMode = 'grid',
		selected = false,
		onSelect,
		tags = []
	}: Props = $props();

	const attrs = $derived(playlist.attributes);
	const trackCount = $derived(attrs.numberOfItems || 0);
	const lastModified = $derived(attrs.lastModifiedAt ? formatDate(attrs.lastModifiedAt) : 'Unknown');
	const tidalUrl = $derived(attrs.externalLinks?.[0]?.href || attrs.url || '#');

	function handleCheckboxChange(event: Event) {
		event.preventDefault();
		event.stopPropagation();
		if (onSelect) {
			onSelect(playlist.id, !selected);
		}
	}

	function handleCheckboxClick(event: MouseEvent) {
		event.stopPropagation();
	}

	function handleCheckboxKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			if (onSelect) {
				onSelect(playlist.id, !selected);
			}
		}
	}

	function handleCardClick(event: MouseEvent) {
		// Allow checkbox clicks to be handled separately
		const target = event.target as HTMLElement;
		if (target.closest('.select-checkbox')) {
			event.preventDefault();
			return;
		}
	}
</script>

<div class="playlist-card" class:selected data-view={viewMode}>
	<div
		class="select-checkbox"
		role="button"
		tabindex="0"
		onclick={handleCheckboxClick}
		onkeydown={handleCheckboxKeyDown}
	>
		<input type="checkbox" checked={selected} onchange={handleCheckboxChange} />
	</div>

	<a href={tidalUrl} target="_blank" class="card-link" onclick={handleCardClick}>
		<div class="playlist-cover">
			{#if coverUrl}
				<img src={coverUrl} alt={attrs.name} loading="lazy" />
			{:else}
				<div class="cover-placeholder">
					<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path
							d="M9 18V5l12-2v13M9 13c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
			{/if}
		</div>

		<div class="playlist-info">
			<div class="info-main">
				<div class="playlist-name" title={attrs.name}>{attrs.name}</div>

				{#if viewMode === 'grid'}
					<div class="playlist-meta">
						<span class="meta-item">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
								<path
									d="M9 18V5l12-2v13M9 13c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							{trackCount} tracks
						</span>
					</div>
					<div class="playlist-date">{lastModified}</div>

					{#if tags.length > 0}
						<div class="tags">
							{#each tags.slice(0, 3) as tag}
								<span class="tag">{tag}</span>
							{/each}
						</div>
					{/if}
				{/if}

				{#if viewMode === 'list'}
					<div class="list-columns">
						<span class="list-col tracks">{trackCount} tracks</span>
						<span class="list-col date">{lastModified}</span>
						{#if tags.length > 0}
							<div class="list-col tags">
								{#each tags.slice(0, 2) as tag}
									<span class="tag">{tag}</span>
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</a>

	<div class="card-actions">
		<button class="action-button" title="Edit playlist" onclick={(e) => e.stopPropagation()}>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path
					d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
		<button class="action-button" title="Add to folder" onclick={(e) => e.stopPropagation()}>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path
					d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
		<button class="action-button" title="Share" onclick={(e) => e.stopPropagation()}>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<circle cx="18" cy="5" r="3" stroke-width="2" />
				<circle cx="6" cy="12" r="3" stroke-width="2" />
				<circle cx="18" cy="19" r="3" stroke-width="2" />
				<line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke-width="2" />
				<line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke-width="2" />
			</svg>
		</button>
	</div>
</div>

<style>
	.playlist-card {
		position: relative;
		background-color: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		transition: all var(--transition-fast);
		overflow: hidden;
	}

	.playlist-card:hover {
		border-color: var(--border-default);
		box-shadow: var(--shadow-md);
	}

	.playlist-card.selected {
		border-color: var(--primary-500);
		box-shadow: 0 0 0 2px var(--primary-100);
	}

	.select-checkbox {
		position: absolute;
		top: var(--space-3);
		left: var(--space-3);
		z-index: 2;
		cursor: pointer;
		opacity: 0;
		transition: opacity var(--transition-fast);
	}

	.playlist-card:hover .select-checkbox,
	.playlist-card.selected .select-checkbox {
		opacity: 1;
	}

	.select-checkbox input[type='checkbox'] {
		width: 20px;
		height: 20px;
		cursor: pointer;
		accent-color: var(--primary-500);
	}

	.card-link {
		display: flex;
		text-decoration: none;
		color: inherit;
	}

	/* Grid View */
	.playlist-card[data-view='grid'] {
		display: flex;
		flex-direction: column;
	}

	.playlist-card[data-view='grid'] .card-link {
		flex-direction: column;
		flex: 1;
	}

	.playlist-card[data-view='grid'] .playlist-cover {
		width: 100%;
		aspect-ratio: 1;
		flex-shrink: 0;
	}

	.playlist-card[data-view='grid']:hover {
		transform: translateY(-2px);
	}

	/* List View */
	.playlist-card[data-view='list'] {
		display: flex;
		align-items: center;
		padding: var(--space-3);
		border-radius: var(--radius-md);
	}

	.playlist-card[data-view='list'] .card-link {
		flex: 1;
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}

	.playlist-card[data-view='list'] .playlist-cover {
		width: 64px;
		height: 64px;
		flex-shrink: 0;
		border-radius: var(--radius-md);
	}

	.playlist-card[data-view='list'] .playlist-info {
		flex: 1;
		padding: 0;
	}

	.playlist-card[data-view='list'] .select-checkbox {
		position: static;
		opacity: 1;
		margin-right: var(--space-3);
	}

	/* Compact View */
	.playlist-card[data-view='compact'] {
		display: flex;
		flex-direction: column;
	}

	.playlist-card[data-view='compact'] .card-link {
		flex-direction: column;
		flex: 1;
	}

	.playlist-card[data-view='compact'] .playlist-cover {
		width: 100%;
		aspect-ratio: 1;
	}

	.playlist-card[data-view='compact'] .playlist-info {
		padding: var(--space-2) var(--space-3);
	}

	.playlist-card[data-view='compact'] .playlist-name {
		font-size: var(--font-size-sm);
	}

	.playlist-card[data-view='compact'] .playlist-meta,
	.playlist-card[data-view='compact'] .playlist-date,
	.playlist-card[data-view='compact'] .tags {
		display: none;
	}

	/* Cover */
	.playlist-cover {
		position: relative;
		background-color: var(--bg-secondary);
		overflow: hidden;
	}

	.playlist-cover img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.cover-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-tertiary);
		background: linear-gradient(135deg, var(--primary-100) 0%, var(--primary-200) 100%);
	}

	/* Info */
	.playlist-info {
		padding: var(--space-4);
		flex: 1;
	}

	.playlist-name {
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		color: var(--text-primary);
		margin-bottom: var(--space-2);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.playlist-meta {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		margin-bottom: var(--space-2);
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
	}

	.playlist-date {
		font-size: var(--font-size-xs);
		color: var(--text-tertiary);
		margin-bottom: var(--space-2);
	}

	/* List Columns */
	.list-columns {
		display: flex;
		align-items: center;
		gap: var(--space-6);
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
	}

	.list-col {
		flex-shrink: 0;
	}

	.list-col.tracks {
		width: 100px;
	}

	.list-col.date {
		width: 120px;
	}

	.list-col.tags {
		display: flex;
		gap: var(--space-2);
	}

	/* Tags */
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.tag {
		padding: var(--space-1) var(--space-2);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
		color: var(--tag-blue-text);
		background-color: var(--tag-blue-bg);
		border: 1px solid var(--tag-blue-border);
		border-radius: var(--radius-full);
		white-space: nowrap;
	}

	/* Actions */
	.card-actions {
		position: absolute;
		top: var(--space-3);
		right: var(--space-3);
		display: flex;
		gap: var(--space-2);
		opacity: 0;
		transition: opacity var(--transition-fast);
		z-index: 2;
	}

	.playlist-card:hover .card-actions {
		opacity: 1;
	}

	.playlist-card[data-view='list'] .card-actions {
		position: static;
		opacity: 1;
		margin-left: auto;
	}

	.action-button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-2);
		color: var(--text-secondary);
		background-color: var(--bg-surface);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
		box-shadow: var(--shadow-sm);
	}

	.action-button:hover {
		color: var(--text-primary);
		background-color: var(--bg-hover);
		border-color: var(--border-strong);
	}

	@media (max-width: 768px) {
		.playlist-card[data-view='list'] {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-3);
		}

		.playlist-card[data-view='list'] .card-link {
			flex-direction: column;
			width: 100%;
		}

		.playlist-card[data-view='list'] .playlist-cover {
			width: 100%;
			height: auto;
			aspect-ratio: 1;
		}

		.list-columns {
			flex-wrap: wrap;
		}

		.card-actions {
			opacity: 1;
		}
	}
</style>
