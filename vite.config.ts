import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 5077,
		proxy: {
			'/api': 'http://localhost:5076',
		}
	}
});
