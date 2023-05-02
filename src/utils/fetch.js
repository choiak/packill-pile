import { getToken } from '@/api/auth.js';
import { createFetch } from '@vueuse/core';

export const useFetchValidated = createFetch({
	baseUrl: '',
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
// const cacheMap = reactive(new Map())
// const useCachedFetch = (key, url, config) => {
// 	const info = useFetch(url, {skip: true, ...config});
//
// 	const update = () => cacheMap.set(key, info.response.value);
// 	const clear = () => cacheMap.set(key, undefined);
//
// 	const fetch = async () => {
// 		try {
// 			await info.fetch()
// 			update()
// 		} catch {
// 			clear()
// 		}
// 	}
//
// 	const response = computed(() => cacheMap.get(key))
// 	const data = computed(() => response.value?.data)
//
// 	if (response.value === null) fetch()
//
// 	return { ...info, fetch, data, response, clear }
// }
