import { getToken } from '@/api/auth.js';
import { createFetch } from '@vueuse/core';

export const useFetchValidated = createFetch({
	baseUrl: 'http://localhost:1337',
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
	},
});
