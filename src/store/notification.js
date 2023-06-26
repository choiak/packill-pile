import { defineStore } from 'pinia';
import { useSessionStorage } from '@vueuse/core';
import { NotificationInstance } from '@/utils/classes/notificationInstance.js';
import { computed } from 'vue';

export const useNotificationStore = defineStore('notification', () => {
	const notifications = useSessionStorage('notifications', [], {
		serializer: {
			read: (value) => {
				const valueParsed = JSON.parse(value);
				return valueParsed.map(
					(v) =>
						new NotificationInstance(
							v.type,
							v.message,
							v.details,
							v.shouldShowToast,
							v.isRead,
							new Date(v.timestamp),
						),
				);
			},
			write: (value) => JSON.stringify(value),
		},
	});

	const hasUnread = computed(() => {
		return notifications.value.some((notification) => !notification.isRead);
	});

	function unshift(notificationInstance) {
		notifications.value.unshift(notificationInstance);
	}

	function readAll() {
		notifications.value.forEach((notification) => {
			if (!notification.isRead) {
				notification.read();
			}
		});
	}

	function clear() {
		notifications.value = [];
	}

	return { notifications, hasUnread, unshift, clear, readAll };
});
