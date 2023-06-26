import { createI18n } from 'vue-i18n';
import { useSettingsStore } from '@/store/settings.js';
import { storeToRefs } from 'pinia';

export const SUPPORTED_LOCALES = ['en', 'zh-TW'];

export async function installI18n(app) {
	const settingsStore = useSettingsStore();
	const { loadLocaleMessages } = settingsStore;
	const { locale } = storeToRefs(settingsStore);

	const i18n = createI18n({
		legacy: false,
		globalInjection: true,
		locale: locale.value,
		fallbackLocale: 'en',
	});
	await loadLocaleMessages(i18n);
	app.use(i18n);
	return i18n;
}