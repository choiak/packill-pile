import { createFetch } from '@vueuse/core';
import { handleApiError } from '@/utils/error.js';
import { useMyStore } from '@/store/me.js';
import { storeToRefs } from 'pinia';

export const useFetch = createFetch({
	baseUrl: '/devServer',
	timeout: 5000,
	options: {
		onFetchError(ctx) {
			handleApiError(ctx);
		},
	},
});

export const useFetchValidated = createFetch({
	baseUrl: '/devServer',
	timeout: 5000,
	options: {
		beforeFetch({ options, cancel }) {
			const myStore = useMyStore();
			const { token } = storeToRefs(myStore);
			if (!token.value || !token.value.length) {
				cancel();
			}
			options.headers = {
				...options.headers,
				Authorization: `Bearer ${token.value}`,
			};
			return { options };
		},
		onFetchError(ctx) {
			handleApiError(ctx);
		},
	},
});
