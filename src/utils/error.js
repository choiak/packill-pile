import { useErrorStore } from '@/store/error.js';
import router from '@/router/index.js';
import { ErrorInstance } from '@/utils/classes/errorInstance.js';
import { ErrorType } from '@/utils/classes/errorType.js';

export function handleError(error, message, source, line, column) {
	const errorStore = useErrorStore();
	let errorObject;

	if (error instanceof Error) {
		const { name } = error;
		errorObject = new ErrorInstance(ErrorType.GLOBAL, name, message, {
			source, line, column,
		});
	} else {
		errorObject = new ErrorInstance(ErrorType.GLOBAL, 'GlobalError', JSON.stringify(error), {
			source, line, column,
		});
	}
	errorStore.push(errorObject);
}

export function handleVueError(error, info) {
	const errorStore = useErrorStore();
	let errorObject;

	if (error instanceof Error) {
		const { name, message } = error;
		errorObject = new ErrorInstance(ErrorType.VUE, name, message, { info });
	} else {
		errorObject = new ErrorInstance(ErrorType.VUE, 'VueError', JSON.stringify(error), { info });
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

	errorStore.push(new ErrorInstance(ErrorType.API, error.name, error?.message || JSON.stringify(error), { url, status, data }));
}