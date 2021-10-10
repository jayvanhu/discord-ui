import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/components'),
		}
	},
	server: {
		// todo conditionally set these based on docker env?
		host: '0.0.0.0',
		watch: {
			usePolling: true,
		},
		proxy: {
			'/graphql': 'http://backend:8080',
			'/api': 'http://backend:8080',
		},
	},
	plugins: [react()],
})
