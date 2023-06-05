import en from '@/locale/en/en.js';
import zhHant from '@/locale/zhHant/zhHant.js';
import { createI18n } from 'vue-i18n';

const messages = { en, zhHant };

const i18n = createI18n({
	locale: 'zhHant',
	fallbackLocale: 'en',
	messages,
});

export default i18n;