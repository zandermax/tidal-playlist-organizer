<script lang="ts">
	interface Props {
		title: string;
		description?: string;
		icon?: 'music' | 'search' | 'folder' | 'filter';
		actionLabel?: string;
		onAction?: () => void;
	}

	let { title, description, icon = 'music', actionLabel, onAction }: Props = $props();

	const icons = {
		music: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
			<path d="M9 18V5l12-2v13M9 13c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>`,
		search: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
			<circle cx="11" cy="11" r="8" stroke-width="2"/>
			<path d="m21 21-4.35-4.35" stroke-width="2" stroke-linecap="round"/>
		</svg>`,
		folder: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
			<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>`,
		filter: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
			<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>`
	};
</script>

<div class="empty-state animate-fade-in">
	<div class="empty-icon">
		{@html icons[icon]}
	</div>
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
