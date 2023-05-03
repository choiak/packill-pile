<template>
	<div
		class='rounded-full border-2 border-transparent p-0.5'
		v-if='isLoading'
	>
		<div
			class='animate-pulse rounded-full bg-slate-200' :class='sizeStyle'
		/>
	</div>
	<div
		class='rounded-full border-2 p-0.5 w-fit'
		:class="{
			'border-neutral-300 border-dashed': !isOnline,
			'border-teal-600': isOnline,
		}"
		v-else
	>
		<div class='overflow-hidden rounded-full' :class='sizeStyle'>
			<img
				v-if='avatarUrl'
				:src='avatarUrlFull'
				class='h-full w-full object-cover object-center'
				:alt="`${displayName}'s Avatar`"
			/>
		</div>
	</div>
</template>

<script setup>
import { getUserById } from '@/api/user.js';
import { computed, onUnmounted, ref, watch } from 'vue';
import { useInfoStore } from '@/store/index.js';

const infoStore = useInfoStore();
const props = defineProps({
	userId: Number,
	size: {
		validator(value) {
			return ['sm', 'lg', null].includes(value);
		},
	},
});

const propUserId = computed(() => {
	return props.userId;
});

const userResponse = getUserById(propUserId, {
	populate: ['avatar'],
	fields: ['displayName'],
}, { immediate: false });
const isOnline = ref(false);

if (propUserId.value) {
	userResponse.execute();
}

watch(propUserId, (oldUserId, newUserId) => {
	if (newUserId !== oldUserId) {
		userResponse.execute();
	}
});

const isLoading = computed(() => {
	return userResponse.isFetching.value || !propUserId.value;
});

const user = computed(() => {
	return userResponse.data.value;
});

const displayName = computed(() => {
	return user.value?.displayName;
});

const avatar = computed(() => {
	return user.value?.avatar;
});

const avatarUrl = computed(() => {
	return avatar.value?.url;
});

const avatarUrlFull = computed(() => {
	return infoStore.url.strapi + avatarUrl.value;
});

const sizeStyle = computed(() => {
	switch (props.size) {
		case 'sm':
			return 'h-12 w-12';
		case 'lg':
			return 'h-20 w-20';
		default:
			return 'h-16 w-16';
	}
});

onUnmounted(() => {
	if (userResponse.canAbort.value) {
		userResponse.abort();
	}
});
</script>
