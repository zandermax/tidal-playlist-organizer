<script lang="ts">
	interface Props {
		message?: string;
	}

	let { message = 'Loading...' }: Props = $props();
</script>

<div class="loading animate-fade-in">
	<div class="spinner"></div>
	<p>{message}</p>
</div>

<style>
	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--space-24);
		text-align: center;
		min-height: 400px;
	}

	.spinner {
		display: inline-block;
		width: 48px;
		height: 48px;
		border: 4px solid var(--primary-200);
		border-radius: 50%;
		border-top-color: var(--primary-600);
		animation: spin 0.8s linear infinite;
	}

	.loading p {
		margin-top: var(--space-4);
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
	}

	@media (max-width: 768px) {
		.loading {
			padding: var(--space-16);
			min-height: 300px;
		}

		.spinner {
			width: 40px;
			height: 40px;
		}
	}
</style>
