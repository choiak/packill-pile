import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
	const id = ref();
	const username = ref();
	const displayName = ref();

	return { id, username, displayName };
});