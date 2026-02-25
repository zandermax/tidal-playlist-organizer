<script lang="ts">
	import { TAG_COLORS } from '$lib/stores/organization';
	import closeIcon from '$lib/components/icons/CloseIcon.svg?raw';

	interface Props {
		label: string;
		color?: string;
		removable?: boolean;
		onRemove?: () => void;
		size?: 'sm' | 'md';
	}

	let { label, color = 'blue', removable = false, onRemove, size = 'md' }: Props = $props();

	const colorScheme = $derived(TAG_COLORS.find((c) => c.name === color) || TAG_COLORS[4]);

	function handleRemove(event: Event) {
		event.preventDefault();
		event.stopPropagation();
		if (onRemove) {
			onRemove();
		}
	}
</script>

<span
	class="tag-chip"
	class:size-sm={size === 'sm'}
	style="--tag-bg: {colorScheme.bg}; --tag-text: {colorScheme.text}; --tag-border: {colorScheme.border};"
>
	<span class="tag-label">{label}</span>
	{#if removable}
		<button class="tag-remove" onclick={handleRemove} type="button">
			<span class="remove-icon">{@html closeIcon}</span>
		</button>
	{/if}
</span>

<style>
	.tag-chip {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1);
		padding: var(--space-1) var(--space-2);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
		color: var(--tag-text);
		background-color: var(--tag-bg);
		border: 1px solid var(--tag-border);
		border-radius: var(--radius-full);
		white-space: nowrap;
		transition: all var(--transition-fast);
	}

	.tag-chip.size-sm {
		padding: 2px var(--space-2);
		font-size: 11px;
	}

	.tag-label {
		line-height: 1;
	}

	.tag-remove {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2px;
		color: inherit;
		opacity: 0.6;
		border-radius: var(--radius-full);
		transition: all var(--transition-fast);
	}

	.tag-remove:hover {
		opacity: 1;
		background-color: rgba(0, 0, 0, 0.1);
	}

	.remove-icon {
		display: inline-flex;
		width: 12px;
		height: 12px;
	}
</style>
