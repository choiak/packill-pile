import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useUserStore = defineStore(
	'user',
	() => {
		let user = reactive({
			id: '',
			username: '',
			displayName: '',
		});

		return { user };
	},
	{
		persist: {
			storage: sessionStorage,
		},
	},
);

export const useInfoStore = defineStore('info', () => {
	const url = {
		strapi: 'http://localhost:1337',
	};

	return { url };
});
