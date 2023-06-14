import qs from 'qs';
import  { useFetchValidated } from '@/utils/fetch.js';
import { computed, unref} from 'vue';

export function getQuiz(id, query = {}, config = {}) {
	const queryString = computed(() => {
		return qs.stringify(
			unref(query),
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
	})

	const url = computed(() => {
		return `api/quizzes	/${unref(id)}?${unref(queryString)}`;
	});

	return useFetchValidated(url, config).get().json();
}