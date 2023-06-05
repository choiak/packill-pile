import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		VueI18nPlugin()
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		proxy: {
			'/devServer': {
				target: 'http://127.0.0.1:1337',
				changeOrigin: true,
				secure: false,
				rewrite: path => path.replace(/^\/devServer/, ''),
			},
		},
	},
});
