import en from '@/locale/en/en.js';
import zhTW from '@/locale/zh-TW/zh-TW.js';
import { createI18n } from 'vue-i18n';
import { watch } from 'vue';

const messages = { en, 'zh-TW': zhTW };

const i18n = createI18n({
	legacy: false,
	globalInjection: true,
	locale: getLang(),
	fallbackLocale: 'en',
	messages,
});

function getLang() {
	const browserLocales = navigator.languages;
	const availableLocales = Object.keys(messages);
	const bestFitLocale = browserLocales.filter(locale => availableLocales.includes(locale))[0];

	return localStorage.getItem('locale') || bestFitLocale || 'en';
}

watch(i18n.global.locale, (locale) => {
	localStorage.setItem('locale', locale);
});

export default i18n;