import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', () => {
	const lang = 'en';
	return { lang };
});