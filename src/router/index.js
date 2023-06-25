import { createRouter, createWebHistory } from 'vue-router';
import { validateToken } from '@/api/auth.js';
import announcement from '@/router/announcement.js';
import auth from '@/router/auth.js';
import error from '@/router/error.js';
import pack from '@/router/package.js';
import problem from '@/router/problem.js';
import quiz from '@/router/quiz.js';
import settings from '@/router/settings.js';
import topic from '@/router/topic.js';
import user from '@/router/user.js';
import publicRouteNames from '@/router/publicRouteNames.js';

const Dashboard = () => import('@/views/pile/dashboard.vue');
const Workspace = () => import('@/views/workspace/workspace.vue');

const routes = [
	...announcement,
	...auth,
	...error,
	...pack,
	...problem,
	...quiz,
	...settings,
	...topic,
	...user,
	{
		name: 'Dashboard',
		path: '/dashboard',
		component: Dashboard,
	},
	{
		name: 'Workspace',
		path: '/workspace/:topicId/:problemId?/:fragment?',
		component: Workspace,
	}, {
		path: '/:pathMatch(.*)*',
		redirect: '/404',
	},
];

const router = createRouter({
	history: createWebHistory(), routes,
});

router.beforeEach(async (to) => {
	if (!publicRouteNames.includes(to.name) && !(await validateToken())) {
		return { name: 'Login' };
	}
});

export default router;
