<script lang="ts">
	import Icon from '$lib/components/icons/Icon.svelte';
	import type { IconName } from '$lib/components/icons/icons.js';

	type EmptyStateIcon = 'music' | 'search' | 'folder' | 'filter';

	interface Props {
		title: string;
		description?: string;
		icon?: EmptyStateIcon;
		actionLabel?: string;
		onAction?: () => void;
	}

	let { title, description, icon = 'music', actionLabel, onAction }: Props = $props();

	const iconMap: Record<EmptyStateIcon, IconName> = {
		music: 'music-note',
		search: 'search',
		folder: 'folder',
		filter: 'filter'
	};
</script>

<div class="empty-state animate-fade-in">
	<span class="empty-icon"><Icon name={iconMap[icon]} size={64} /></span>
	<h3 class="empty-title">{title}</h3>
	{#if description}
		<p class="empty-description">{description}</p>
	{/if}
	{#if actionLabel && onAction}
		<button class="btn btn-primary" onclick={onAction}>
			{actionLabel}
		</button>
	{/if}
</div>

<style>
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--space-24) var(--space-6);
		text-align: center;
		min-height: 400px;
	}

	.empty-icon {
		color: var(--text-tertiary);
		opacity: 0.5;
		margin-bottom: var(--space-6);
	}

	.empty-title {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--text-secondary);
		margin-bottom: var(--space-2);
	}

	.empty-description {
		font-size: var(--font-size-sm);
		color: var(--text-tertiary);
		margin-bottom: var(--space-6);
		max-width: 400px;
	}

	@media (max-width: 768px) {
		.empty-state {
			padding: var(--space-16) var(--space-4);
			min-height: 300px;
		}

		.empty-icon {
			transform: scale(0.8);
		}

		.empty-title {
			font-size: var(--font-size-lg);
		}
	}
</style>
