import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	plugins: [
		sveltekit(),
		viteStaticCopy({
		  targets: [
			  {
				  src: 'node_modules/jeep-sqlite/dist/jeep-sqlite/jeep-sqlite.esm.js',
					dest: 'vendor'
				},
			  {
				  src: 'node_modules/jeep-sqlite/dist/jeep-sqlite/p-2873ae8c.js',
					dest: 'vendor'
				},
			  {
				  src: 'node_modules/jeep-sqlite/dist/jeep-sqlite/p-e1255160.js',
					dest: 'vendor'
				}
			]
		}),
	]
});
