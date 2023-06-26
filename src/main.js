import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router/index';
import 'highlight.js/styles/github.css';
import InstantSearch from 'vue-instantsearch/vue3/es';
import * as Sentry from '@sentry/vue';
import { handleError, handleVueError } from '@/utils/error.js';
import { installI18n } from '@/locale/index.js';

window.onerror = (message, source, line, column, error) => {
	handleError(error, message, source, line, column);
};

const app = createApp(App);

// Sentry.init({
// 	app,
// 	dsn: '--DSN--',
// 	integrations: [new Sentry.BrowserTracing({
// 		routingInstrumentation: Sentry.vueRouterInstrumentation(router),
// 	}), new Sentry.Replay()], // Performance Monitoring
// 	tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
// 	// Session Replay
// 	replaysSessionSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
// 	replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });

app.config.errorHandler = (error, instance, info) => {
	handleVueError(error, info);
};

app.use(router);

const pinia = createPinia();
app.use(pinia);

export const i18n = await installI18n(app);

app.use(InstantSearch);

app.directive('focus', {
	mounted: function(el) {
		el.focus();
	},
});

app.mount('#app');
