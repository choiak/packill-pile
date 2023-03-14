import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useUserStore = defineStore('user', () => {
	let user = reactive({
		id: '',
		username: '',
		displayName: '',
	});

	return { user };
});
