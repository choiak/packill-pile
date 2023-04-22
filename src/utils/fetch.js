import { ref, unref, isRef, watchEffect } from 'vue';
import axios from 'axios';
import { getToken } from '@/api/auth.js';

export const useFetch = (url, config = {}, validate) => {
	const data = ref();
	const response = ref();
	const error = ref();
	const loading = ref();

	const urlValue = unref(url);

	if (validate) {
		config['headers'] = {
			Authorization: `Bearer ${getToken()}`,
		};
	}

	const doFetch = async () => {
		loading.value = true;
		try {
			const result = await axios({
				url: urlValue,
				...config,
			});
			response.value = result;
			data.value = result.data;
		} catch (e) {
			error.value = e;
		} finally {
			loading.value = false;
		}
	};

	if (isRef(url)) {
		watchEffect(doFetch);
	} else {
		doFetch();
	}

	return { response, data, error, loading, retry: doFetch };
};

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
