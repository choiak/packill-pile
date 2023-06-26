import en from '@/locale/en/en.js';
import zhTW from '@/locale/zh-TW/zh-TW.js';
import { createI18n } from 'vue-i18n';
import { useSettingsStore } from '@/store/settings.js';
import { storeToRefs } from 'pinia';

export const messages = { en, 'zh-TW': zhTW };

export function installI18n(app) {
	const settingsStore = useSettingsStore();
	const { locale } = storeToRefs(settingsStore);

	const i18n = createI18n({
		legacy: false,
		globalInjection: true,
		locale: locale.value,
		fallbackLocale: 'en',
		messages,
	});
	app.use(i18n);
	return i18n;
}