<script lang="ts">
	import Icon from '$lib/components/icons/Icon.svelte';

	interface Props {
		message: string | null;
	}

	let { message }: Props = $props();
</script>

{#if message}
	<div class="error animate-fade-in">
		<Icon name="alert-circle" size={20} />
		<span>{message}</span>
	</div>
{/if}

<style>
	.error {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		--color-ink: var(--error-500);
		padding: var(--space-4);
		background-color: var(--error-50);
		color: var(--error-700);
		border: 1px solid var(--error-200);
		border-left: 4px solid var(--error-500);
		border-radius: var(--radius-lg);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
	}

	.error span:last-child {
		flex: 1;
	}
</style>
