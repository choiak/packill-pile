import { defineStore } from 'pinia';
import { useSessionStorage } from '@vueuse/core';

export const useErrorStore = defineStore('error', () => {
	const errors = useSessionStorage('errors', []);

	function push(errorObject) {
		errors.value.push(errorObject);
	}

	function clear() {
		errors.value = [];
	}

	return { errors, clear, push };
});