<script lang="ts">
	import { icons } from './icons.js';
	import type { IconName } from './icons.js';

	interface Props {
		name: IconName;
		size?: number;
	}

	let { name, size = 16 }: Props = $props();
</script>

<span class="icon" style="width:{size}px;height:{size}px">{@html icons[name]}</span>

<style>
	.icon {
		display: inline-flex;
		flex-shrink: 0;
	}
</style>
