import { defineStore } from 'pinia';
import { computed } from 'vue';
import { getMe } from '@/api/me.js';

export const useMyStore = defineStore('me', () => {
	const meResponse = getMe();

	const me = computed(() => {
		return meResponse.data.value;
	});

	const username = computed(() => {
		return me.value?.username;
	});

	const displayName = computed(() => {
		return me.value?.displayName;
	});

	const bio = computed(() => {
		return me.value?.bio;
	});

	const birthday = computed(() => {
		return me.value?.birthday;
	});

	const id = computed(() => {
		return me.value?.id;
	});

	const email = computed(() => {
		return me.value?.email;
	});

	return { me, username, displayName, bio, birthday, id, email, refresh: meResponse.execute };
});