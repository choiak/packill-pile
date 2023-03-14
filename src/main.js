import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router/index';
import VueClickAway from 'vue3-click-away';
import hl from 'highlight.js';
import 'highlight.js/styles/stackoverflow-light.css';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(VueClickAway);

app.directive('highlight', function (el) {
	const blocks = el.querySelectorAll('code');
	blocks.forEach((block) => {
		hl.highlightBlock(block);
	});
});

app.mount('#app');
