<script lang="ts">
	import type { Playlist } from '$lib/types/tidal';
	import { formatDate } from '$lib/utils/tidal-utils';

	interface Props {
		playlist: Playlist;
		coverUrl: string | null;
	}

	let { playlist, coverUrl }: Props = $props();

	const attrs = playlist.attributes;
	const trackCount = attrs.numberOfItems || 0;
	const lastModified = attrs.lastModifiedAt ? formatDate(attrs.lastModifiedAt) : 'Unknown';
	const tidalUrl = attrs.externalLinks?.[0]?.href || attrs.url || '#';
</script>

<a href={tidalUrl} target="_blank" class="playlist-card">
	<div class="playlist-cover">
		{#if coverUrl}
			<img src={coverUrl} alt={attrs.name} />
		{:else}
			<span>♪</span>
		{/if}
	</div>
	<div class="playlist-info">
		<div class="playlist-name" title={attrs.name}>{attrs.name}</div>
		<div class="playlist-meta">
			<span>🎵 {trackCount} tracks</span>
		</div>
		<div class="playlist-date">Updated: {lastModified}</div>
	</div>
</a>

<style>
	.playlist-card {
		background: white;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s, box-shadow 0.2s;
		cursor: pointer;
		text-decoration: none;
		display: block;
	}

	.playlist-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
	}

	.playlist-cover {
		width: 100%;
		height: 250px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 3em;
		font-weight: bold;
	}

	.playlist-cover img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.playlist-info {
		padding: 15px;
	}

	.playlist-name {
		font-size: 1.1em;
		font-weight: 600;
		color: #333;
		margin-bottom: 8px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.playlist-meta {
		font-size: 0.9em;
		color: #666;
		display: flex;
		justify-content: space-between;
		margin-bottom: 5px;
	}

	.playlist-date {
		font-size: 0.85em;
		color: #999;
	}

	@media (max-width: 768px) {
		.playlist-cover {
			height: 150px;
		}
	}
</style>
