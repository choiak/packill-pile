<template>
	<div
		class="rounded-full border-2 border-transparent p-0.5"
		v-if="isLoading"
	>
		<div
			class="h-[64px] w-[64px] animate-pulse rounded-full bg-slate-200"
		/>
	</div>
	<div
		class="rounded-full border-2 p-0.5"
		:class="{
			'border-neutral-300': !isOnline,
			'border-dashed': !isOnline,
			'border-teal-600': isOnline,
		}"
		v-else
	>
		<div class="h-[64px] w-[64px] overflow-hidden rounded-full">
			<img
				v-if="avatarUrlRelative"
				:src="avatarUrlFull"
				class="h-full w-full object-cover object-center"
			/>
		</div>
	</div>
</template>

<script setup>
import { getUserAvatar } from '@/api/user.js';
import { computed, ref, watch } from 'vue';
import { useInfoStore } from '@/store/index.js';

const infoStore = useInfoStore();
const props = defineProps({
	userId: Number,
});

const userAvatar = ref();
const isOnline = ref(false); //dummy

if (props.userId) {
	userAvatar.value = getUserAvatar(props.userId);
}

watch(props, (newProps) => {
	if (newProps.userId) {
		userAvatar.value = getUserAvatar(newProps.userId);
	}
});

const isLoading = computed(() => {
	return userAvatar.value?.loading || !props.userId;
});

const attributes = computed(() => {
	return userAvatar.value?.data?.avatar;
});

const avatarUrlRelative = computed(() => {
	return attributes.value?.url;
});

const avatarUrlFull = computed(() => {
	return infoStore.url.strapi + avatarUrlRelative.value;
});
</script>
