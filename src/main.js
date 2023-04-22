import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import './style.css';
import App from './App.vue';
import router from './router/index';
import 'highlight.js/styles/stackoverflow-light.css';
import InstantSearch from 'vue-instantsearch/vue3/es';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(router);
app.use(pinia);
app.use(InstantSearch);

app.directive('focus', {
	mounted: function (el) {
		el.focus();
	},
});

app.mount('#app');
