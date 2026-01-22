<script lang="ts">
	interface Props {
		message?: string;
	}

	let { message = 'Loading...' }: Props = $props();
</script>

<div class="loading">
	<div class="spinner"></div>
	<p>{message}</p>
</div>

<style>
	.loading {
		text-align: center;
		padding: 40px;
		color: #666;
	}

	.spinner {
		display: inline-block;
		width: 40px;
		height: 40px;
		border: 4px solid rgba(102, 126, 234, 0.3);
		border-radius: 50%;
		border-top-color: #667eea;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.loading p {
		margin-top: 15px;
	}
</style>
