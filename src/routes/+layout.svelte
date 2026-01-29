<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/design-system.css';
	import '$lib/styles/themes/light.css';
	import '$lib/styles/animations.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global(body) {
		min-height: 100vh;
	}
</style>
