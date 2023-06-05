import { useErrorStore } from '@/store/error.js';
import router from '@/router/index.js';
import { ErrorInstance } from '@/utils/classes/errorInstance.js';
import { ErrorType } from '@/utils/classes/errorType.js';
import { useNotificationStore } from '@/store/notification.js';
import { NotificationInstance } from '@/utils/classes/notificationInstance.js';
import { NotificationType } from '@/utils/classes/notificationType.js';
import i18n from '@/locale/index.js';

export function handleError(error, message, source, line, column) {
	const errorStore = useErrorStore();
	const notificationStore = useNotificationStore();

	const errorInstance = new ErrorInstance(ErrorType.GLOBAL, error?.name || 'GlobalError', message || JSON.stringify(error), {
		source, line, column,
	});

	errorStore.push(errorInstance);
	const clientErrorMessage = i18n.global.t('notification.clientErrorMessage');
	notificationStore.unshift(new NotificationInstance(NotificationType.CLIENT_ERROR, clientErrorMessage, `${error?.name || 'GlobalError'}: ${message || JSON.stringify(error)}`));
}

export function handleVueError(error, info) {
	const errorStore = useErrorStore();
	const notificationStore = useNotificationStore();

	const errorInstance = new ErrorInstance(ErrorType.VUE, error?.name || 'VueError', error?.message || JSON.stringify(error), { info });

	errorStore.push(errorInstance);
	const clientErrorMessage = i18n.global.t('notification.clientErrorMessage');
	notificationStore.unshift(new NotificationInstance(NotificationType.CLIENT_ERROR, clientErrorMessage, `${error?.name || 'VueError'}: ${error?.message || JSON.stringify(error)}`));
}

export async function handleApiError(ctx) {
	const errorStore = useErrorStore();
	const notificationStore = useNotificationStore();
	const { error, response, data } = ctx;
	const { status, url } = response;

	switch (true) {
		case(status === 401): {
			router.replace('/401');
			break;
		}
		case(status === 404): {
			router.replace('/404');
			break;
		}
		case(status === 403): {
			router.replace('/403');
			break;
		}
		case(status >= 400): {
			const clientErrorMessage = i18n.global.t('notification.clientErrorMessage');
			notificationStore.unshift(new NotificationInstance(NotificationType.CLIENT_ERROR, clientErrorMessage, `${status}: ${error.message}`));
			break;
		}
		case(status >= 500): {
			const serverErrorMessage = i18n.global.t('notification.serverErrorMessage');
			notificationStore.unshift(new NotificationInstance(NotificationType.SERVER_ERROR, serverErrorMessage, `${status}: ${error.message}`));
			break;
		}
	}

	errorStore.push(new ErrorInstance(ErrorType.API, error.name, error.message, {
		url, status, data,
	}));
}