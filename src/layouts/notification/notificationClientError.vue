<template>
	<Notification :timestamp='timestamp' :is-read='isRead'>
		<template #icon>
			<div class='rounded-full border border-red-600 bg-neutral-100 p-2'>
				<ExclamationTriangleIcon class='h-4 w-4' />
			</div>
		</template>
		<template #message>
			{{ $t('notification.clientErrorMessage') }}
		</template>
		<template #content>
			<div class='p-2 bg-neutral-100 rounded-lg'>
				<p class='text-sm font-medium'>{{ details }}</p>
			</div>
		</template>
	</Notification>
</template>

<script setup>
import Notification from '@/layouts/notification/notification.vue';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline/index.js';
import { NotificationInstance } from '@/utils/classes/notificationInstance.js';
import { computed } from 'vue';

const props = defineProps({
	notification: {
		type: NotificationInstance
	}
});

const timestamp = computed(() => {
	return props.notification.timestamp;
});

const details = computed(() => {
	return props.notification.details;
});

const isRead = computed(() => {
	return props.notification.isRead;
});
</script>