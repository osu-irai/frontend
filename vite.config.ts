import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 5077,
		proxy: {
			'/api': {
				target: 'http://localhost:5076',
				changeOrigin: false,
			},
			'/oauth': {
				target: 'http://localhost:5076',
				changeOrigin: false,
			}
		},
		cors: true,
	}
});
