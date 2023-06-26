import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { SUPPORTED_LOCALES } from '@/locale/index.js';
import { nextTick, watch } from 'vue';
import { i18n } from '@/main.js';

export const useSettingsStore = defineStore('settings', () => {
	const locale = useLocalStorage('locale', getLocale());

	function getLocale() {
		const browserLocales = navigator.languages;
		const availableLocales = SUPPORTED_LOCALES;
		const bestFitLocale = browserLocales.filter(locale => availableLocales.includes(locale))[0];
		return bestFitLocale || 'en';
	}

	function setLocale(newLocale) {
		locale.value = newLocale;
	}

	async function loadLocaleMessages(i18n) {
		const messages = await import(`@/locale/${locale.value}/${locale.value}.js`);
		i18n.global.setLocaleMessage(locale.value, messages.default);
		return nextTick();
	}

	watch(locale, async (newLocale) => {
		await loadLocaleMessages(i18n);
		i18n.global.locale.value = newLocale;
	});

	return { locale, setLocale, loadLocaleMessages };
});