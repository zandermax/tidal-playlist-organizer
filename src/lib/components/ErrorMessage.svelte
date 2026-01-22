<script lang="ts">
	interface Props {
		message: string | null;
	}

	let { message }: Props = $props();
</script>

{#if message}
	<div class="error">{message}</div>
{/if}

<style>
	.error {
		background: #ffebee;
		color: #c62828;
		padding: 15px;
		border-radius: 8px;
		margin-bottom: 20px;
		border-left: 4px solid #c62828;
	}
</style>
