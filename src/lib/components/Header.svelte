<script lang="ts">
	interface Props {
		title: string;
		subtitle: string;
	}

	let { title, subtitle }: Props = $props();
</script>

<div class="header">
	<h1>{title}</h1>
	<p>{subtitle}</p>
</div>

<style>
	.header {
		text-align: center;
		color: white;
		margin-bottom: 40px;
	}

	.header h1 {
		font-size: 2.5em;
		margin-bottom: 10px;
	}

	.header p {
		font-size: 1.2em;
		opacity: 0.9;
	}

	@media (max-width: 768px) {
		.header h1 {
			font-size: 2em;
		}
	}
</style>
