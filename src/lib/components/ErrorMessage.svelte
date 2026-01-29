<script lang="ts">
	interface Props {
		message: string | null;
	}

	let { message }: Props = $props();
</script>

{#if message}
	<div class="error animate-fade-in">
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
			<circle cx="12" cy="12" r="10" stroke-width="2" />
			<line x1="12" y1="8" x2="12" y2="12" stroke-width="2" stroke-linecap="round" />
			<line x1="12" y1="16" x2="12.01" y2="16" stroke-width="2" stroke-linecap="round" />
		</svg>
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

	.error svg {
		flex-shrink: 0;
		color: var(--error-500);
		margin-top: 2px;
	}

	.error span {
		flex: 1;
	}
</style>
