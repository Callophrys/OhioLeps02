// src/lib/store.ts
import { writable } from 'svelte/store';
import type { ObservationRecord } from '$lib/types';

export const records = writable<ObservationRecord[]>([]);
// export const records = writable<{
//   id: number; text: string; count: number; synced: boolean
// }[]>([]);

