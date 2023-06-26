import qs from 'qs';
import { useFetchValidated } from '@/utils/fetch.js';
import { useMyStore } from '@/store/me.js';
import { computed, toRefs, unref } from 'vue';

export function getMe(query = {}, config = {}) {
	const queryString = computed(() => {
		return qs.stringify(unref(query), {
			encodeValuesOnly: true,
		});
	});

	const url = computed(() => {
		return `api/users/me?${queryString.value}`;
	});

	return useFetchValidated(url, config).get().json();
}

export function updateMe(content, query = {}, config = {}) {
	const myStore = useMyStore();
	const { myId } = toRefs(myStore);
	const queryString = computed(() => {
		return qs.stringify(unref(query), {
			encodeValuesOnly: true, // prettify URL
		});
	});

	const url = computed(() => {
		return `api/users/${myId.value}?${queryString.value}`;
	});

	const payload = computed(() => {
		return unref(content);
	});

	return useFetchValidated(url, config).put(payload).json();
}

export function updateMyPassword(
	currentPassword,
	newPassword,
	confirmationPassword,
	config = {},
) {
	const payload = computed(() => {
		return {
			currentPassword: unref(currentPassword),
			password: unref(newPassword),
			passwordConfirmation: unref(confirmationPassword),
		};
	});

	return useFetchValidated('api/auth/change-password?', config)
		.post(payload)
		.json();
}

export function updateMyPackage(packageId, query = {}, config = {}) {
	const myStore = useMyStore();
	const { myId } = toRefs(myStore);

	const queryString = computed(() => {
		return qs.stringify(unref(query), {
			encodeValuesOnly: true,
		});
	});

	const url = computed(() => {
		return `api/users/${myId.value}?${queryString.value}`;
	});

	const payload = computed(() => {
		return {
			currentPackage: {
				set: [unref(packageId)],
			},
		};
	});

	return useFetchValidated(url, config).put(payload).json();
}
