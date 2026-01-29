<script lang="ts">
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
	<svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
		<circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" />
		<path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
	</svg>
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
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round" />
				<line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round" />
			</svg>
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
