import { useErrorStore } from '@/store/error.js';
import router from '@/router/index.js';

export function handleError(error, message, source, line, column) {
	const errorStore = useErrorStore();
	let errorObject = {
		type: errorStore.Type.global,
	};

	if (error instanceof Error) {
		const { name } = error;
		errorObject = {
			...errorObject, name: name, error: message, source, line, column,
		};
	} else {
		errorObject = {
			...errorObject, name: 'GlobalError', error: JSON.stringify(error), source, line, column,
		};
	}
	errorStore.push(errorObject);
}

export function handleVueError(error, info) {
	const errorStore = useErrorStore();
	let errorObject = {
		type: errorStore.Type.vue,
	};

	if (error instanceof Error) {
		const { name, message } = error;
		errorObject = {
			...errorObject, name: name, error: message, info,
		};
	} else {
		errorObject = {
			...errorObject, name: 'VueError', error: JSON.stringify(error), info,
		};
	}
	errorStore.push(errorObject);
}

export function handleApiError(ctx) {
	const errorStore = useErrorStore();
	const { error, response, data } = ctx;
	const { status, url } = response;

	switch (true) {
		case(status === 401):
			router.replace('/401');
			break;
		case(status === 404):
			router.replace('/404');
			break;
		case(status === 403):
			router.replace('/403');
			break;
	}

	errorStore.push({
		type: errorStore.Type.api, url, status, name: error.name, error: error?.message || JSON.stringify(error), data,
	});
}