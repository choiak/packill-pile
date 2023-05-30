import { defineStore } from 'pinia';

export const useInfoStore = defineStore('info', () => {
	const url = {
		strapi: 'http://localhost:1337',
	};

	return { url };
});
