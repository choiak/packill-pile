import { defineStore } from 'pinia';
import { useSessionStorage } from '@vueuse/core';

export const useErrorStore = defineStore('error', () => {
	const errors = useSessionStorage('errors', []);

	function push(errorInstance) {
		errors.value.push(errorInstance);
	}

	function clear() {
		errors.value = [];
	}

	return { errors, clear, push };
});