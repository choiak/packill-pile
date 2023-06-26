import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { messages } from '@/locale/index.js';
import { watch } from 'vue';
import { i18n } from '@/main.js';

export const useSettingsStore = defineStore('settings', () => {
	const locale = useLocalStorage('locale', getLocale());

	function getLocale() {
		const browserLocales = navigator.languages;
		const availableLocales = Object.keys(messages);
		const bestFitLocale = browserLocales.filter(locale => availableLocales.includes(locale))[0];
		return bestFitLocale || 'en';
	}

	function setLocale(newLocale) {
		locale.value = newLocale;
	}

	watch(locale, (newLocale) => {
		i18n.global.locale.value = newLocale;
	});

	return { locale, setLocale };
});