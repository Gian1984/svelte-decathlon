import {writable} from 'svelte/store';
export const term = writable('');
export const cache = writable([]);
export const timeout = writable(false);
