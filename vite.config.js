import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), VueI18nPlugin()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		proxy: {
			'/devServer': {
				target: 'https://d448-182-239-103-32.ngrok-free.app/',
				changeOrigin: true,
				secure: true,
				rewrite: (path) => path.replace(/^\/devServer/, ''),
			},
		},
	},
});
