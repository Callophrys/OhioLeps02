import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, normalizePath } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit()
	]
});
