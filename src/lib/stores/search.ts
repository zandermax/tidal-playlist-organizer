import { writable } from 'svelte/store';

function createSearchStore() {
	const { subscribe, set } = writable('');

	return {
		subscribe,
		set: (value: string) => set(value)
	};
}

export const searchStore = createSearchStore();
