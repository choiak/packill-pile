import { defineStore } from 'pinia';
import { useSessionStorage } from '@vueuse/core';

export const useErrorStore = defineStore('error', () => {
		const Type = Object.freeze({
			api: 'api',
			global: 'global',
			vue: 'vue',
		});

		const errors = useSessionStorage('errors', []);

		function push(errorObject) {
			errors.value.push(errorObject);
		}

		function clear() {
			errors.value = [];
		}

		return { Type, errors, clear, push };
	}
);