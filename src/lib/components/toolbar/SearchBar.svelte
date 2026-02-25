<script lang="ts">
	import Icon from '$lib/components/icons/Icon.svelte';

	interface Props {
		value?: string;
		onSearch?: (value: string) => void;
		placeholder?: string;
	}

	let { value = $bindable(''), onSearch, placeholder = 'Search...' }: Props = $props();

	let timeoutId: number | undefined;

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const newValue = target.value;

		// Clear existing timeout
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		// Debounce the search
		timeoutId = setTimeout(() => {
			value = newValue;
			if (onSearch) {
				onSearch(newValue);
			}
		}, 300) as unknown as number;
	}

	function clearSearch() {
		value = '';
		if (onSearch) {
			onSearch('');
		}
	}
</script>

<div class="search-bar">
	<span class="search-icon"><Icon name="search" size={16} /></span>
	<input
		type="search"
		class="search-input"
		{placeholder}
		{value}
		oninput={handleInput}
		autocomplete="off"
	/>
	{#if value}
		<button class="clear-button" onclick={clearSearch} type="button">
			<Icon name="close" size={14} />
		</button>
	{/if}
</div>

<style>
	.search-bar {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		max-width: 400px;
	}

	.search-icon {
		position: absolute;
		left: var(--space-3);
		color: var(--text-tertiary);
		pointer-events: none;
		display: flex;
	}

	.search-input {
		flex: 1;
		padding: var(--space-2) var(--space-10) var(--space-2) var(--space-10);
		font-size: var(--font-size-sm);
		color: var(--text-primary);
		background-color: var(--bg-surface);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
	}

	.search-input:hover {
		border-color: var(--border-strong);
	}

	.search-input:focus {
		outline: none;
		border-color: var(--primary-500);
		box-shadow: 0 0 0 3px var(--primary-100);
	}

	.search-input::placeholder {
		color: var(--text-tertiary);
	}

	.clear-button {
		position: absolute;
		right: var(--space-3);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-1);
		color: var(--text-tertiary);
		border-radius: var(--radius-sm);
		transition: all var(--transition-fast);
	}

	.clear-button:hover {
		color: var(--text-primary);
		background-color: var(--bg-hover);
	}


</style>
