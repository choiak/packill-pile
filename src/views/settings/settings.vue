<template>
	<Index>
		<div class="flex h-full flex-col">
			<Dock>
				<div>
					<h5 class="font-medium">Settings</h5>
					<p class="text-sm">
						Tweak your settings to obtain an optimal learning
						experience
					</p>
				</div>
			</Dock>
			<div class="flex-1 space-y-8 overflow-auto p-6">
				<div class="flex items-baseline space-x-4">
					<router-link
						to="/settings/general"
						class="relative before:absolute before:-bottom-2 before:left-1/2 before:h-1 before:w-4 before:-translate-x-1/2 before:rounded-full before:bg-blue-600"
						:class="{
							'text-2xl': route.path === '/settings/general',
							'font-bold': route.path === '/settings/general',
							'before:hidden': route.path !== '/settings/general',
						}"
					>
						General
					</router-link>
					<router-link
						to="/settings/security"
						class="relative before:absolute before:-bottom-2 before:left-1/2 before:h-1 before:w-4 before:-translate-x-1/2 before:rounded-full before:bg-blue-600"
						:class="{
							'text-2xl': route.path === '/settings/security',
							'font-bold': route.path === '/settings/security',
							'before:hidden':
								route.path !== '/settings/security',
						}"
					>
						Security
					</router-link>
					<router-link to="/settings/subscription">
						Subscription
					</router-link>
					<router-link to="/settings/email">
						Notifications
					</router-link>
				</div>
				<router-view />
			</div>
		</div>
	</Index>
</template>

<script setup>
import Index from '@/layouts/utils/index.vue';
import {
	ChevronUpIcon,
	IdentificationIcon,
	AtSymbolIcon,
	FaceSmileIcon,
	FingerPrintIcon,
	CheckIcon,
	EnvelopeIcon,
} from '@heroicons/vue/24/outline/index.js';
import VenustExpandable from '@/components/venust/expandable/expandable.vue';
import VenustInput from '@/components/venust/input/venustInput.vue';
import { computed, reactive, ref, watch } from 'vue';
import SettingsValidationPrompt from '@/layouts/user/settingsValidationPrompt.vue';
import { requestWIthValidation } from '@/utils/request.js';
import VenustTextarea from '@/components/venust/textarea/venustTextarea.vue';
import VenustFileInput from '@/components/venust/fileInput/venustDragDrop.vue';
import UserCard from '@/layouts/user/profileCard.vue';
import Dock from '@/layouts/dock/dock.vue';
import { getMe } from '@/api/me.js';
import Account from '@/layouts/settings/general.vue';
import router from '@/router/index.js';
import { useRoute } from 'vue-router';

const route = useRoute();

// const validationState = ref(false);
//
// function getValidationState(value) {
// 	validationState.value = value;
// }
//
// watch(validationState, async (newState) => {
// 	if (newState === true) {
// 		await putUserData();
// 	}
// });
//
// async function putUserData() {
// 	const pendingPutData = {};
// 	const userDataKeys = Object.keys(userObject);
// 	userDataKeys.forEach(key => {
// 		if (userObject[key] !== userObjectOld[key]) {
// 			pendingPutData[key] = userObject[key];
// 		}
// 	});
// 	console.log(pendingPutData);
//
// 	await requestWIthValidation
// 		.put(`/api/users/${userObjectOld.id}`, pendingPutData)
// 		.then(res => {
// 			window.location.reload();
// 			console.log(res);
// 		});
// }
</script>
