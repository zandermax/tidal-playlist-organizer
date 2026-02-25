<script lang="ts">
	import alertCircleIcon from '$lib/components/icons/AlertCircleIcon.svg?raw';

	interface Props {
		message: string | null;
	}

	let { message }: Props = $props();
</script>

{#if message}
	<div class="error animate-fade-in">
		<span class="error-icon">{@html alertCircleIcon}</span>
		<span>{message}</span>
	</div>
{/if}

<style>
	.error {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
		padding: var(--space-4);
		background-color: var(--error-50);
		color: var(--error-700);
		border: 1px solid var(--error-200);
		border-left: 4px solid var(--error-500);
		border-radius: var(--radius-lg);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
	}

	.error-icon {
		display: inline-flex;
		width: 20px;
		height: 20px;
		flex-shrink: 0;
		margin-top: 2px;
		--color-ink: var(--error-500);
	}

	.error span:last-child {
		flex: 1;
	}
</style>
