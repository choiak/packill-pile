<template>
	<VenustDropdown :options='dropdownOptions' :modifier='dropdownModifiers'>
		<template #toggler>
			<div class='relative'>
				<slot />
				<div class='rounded-full bg-blue-600 h-2 w-2 animate-pulse absolute right-0 top-0' v-if='hasUnread'/>
			</div>
		</template>
		<template #container>
			<div class='w-[500px] rounded-xl shadow-lg bg-white border'>
				<div class='flex items-center justify-between p-4'>
					<h5 class='font-bold'>{{ $t('notification.notification') }}</h5>
					<button class='flex space-x-1 items-center' @click.prevent='readAll'>
						<CheckIcon class='w-4 h-4 text-blue-600 stroke-2' />
						<label class='text-sm font-medium text-blue-600'>{{ $t("notification.markAllAsRead") }}</label>
					</button>
				</div>
				<div class='border-t-2 p-4 space-y-2 overflow-auto max-h-[700px]'>
					<component v-for='notification in notifications' :is='getNotificationComponent(notification.type)' :notification='notification'/>
				</div>
			</div>
		</template>
	</VenustDropdown>
</template>

<script setup>
import VenustDropdown from '@/components/venust/dropdown/venustDropdown.vue';
import { useNotificationStore } from '@/store/notification.js';
import NotificationClientError from '@/layouts/notification/notificationClientError.vue';
import NotificationServerError from '@/layouts/notification/notificationServerError.vue';
import { CheckIcon } from '@heroicons/vue/24/outline/index.js';
import { NotificationType } from '@/utils/classes/notificationType.js';
import { storeToRefs } from 'pinia';

const notificationStore = useNotificationStore();
const { notifications, hasUnread } = storeToRefs(notificationStore);
const { readAll } = notificationStore;

const dropdownOptions = { placement: 'right' };
const dropdownModifiers = {
	name: 'flip',
	options: {
		fallbackPlacements: ['left', 'bottom', 'left'],
	},
};

function getNotificationComponent(type) {
	switch (type) {
		case NotificationType.CLIENT_ERROR:
			return NotificationClientError;
		case NotificationType.SERVER_ERROR:
			return NotificationServerError;
	}
}
</script>
