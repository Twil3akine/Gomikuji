import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react()
	],
	resolve: {
		alias: {
			"@": "/src",
		},
	},
	server: {
		host: '0.0.0.0',
		port: 5566,
		watch: {
			usePolling: true,
		}
	},
})
