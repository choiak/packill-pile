import { getToken } from '@/api/auth.js';
import { createFetch } from '@vueuse/core';
import { handleApiError } from '@/utils/error.js';

export const useFetch = createFetch({
	baseUrl: '/devServer',
	timeout: 5000,
	options: {
		onFetchError(ctx) {
			handleApiError(ctx);
		},
	},
})

export const useFetchValidated = createFetch({
	baseUrl: '/devServer',
	timeout: 5000,
	options: {
		beforeFetch({ options, cancel }) {
			const token = getToken();
			if (!token) {
				cancel();
			}
			options.headers = {
				...options.headers,
				Authorization: `Bearer ${getToken()}`,
			};
			return { options };
		},
		onFetchError(ctx) {
			handleApiError(ctx);
		},
	},
});
