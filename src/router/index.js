import { createRouter, createWebHistory } from 'vue-router';
import { validateToken } from '@/api/auth.js';
import Login from '@/views/session/login.vue';
import Register from '@/views/session/register.vue';
import ForgetPassword from '@/views/session/forgetPassword.vue';
import Index from '@/layouts/workspace/index.vue';
import User from '@/views/user/user.vue';
import Workspace from '@/views/workspace/workspace.vue';
import Packages from '@/views/workspace/packages.vue';
import Package from '@/views/workspace/package.vue';
import UserSettings from '@/views/user/userSettings.vue';
import NotFound from '@/views/pile/404.vue';

const routes = [
	{
		name: 'Login',
		path: '/login',
		component: Login,
	},
	{
		name: 'Register',
		path: '/register',
		component: Register,
	},
	{
		name: 'ForgetPassword',
		path: '/forget-password',
		component: ForgetPassword,
	},
	{
		name: 'Dashboard',
		path: '/dashboard',
		component: Index,
	},
	{
		name: 'User',
		path: '/users/:id',
		component: User,
	},
	{
		name: 'UserSettings',
		path: '/settings',
		component: UserSettings,
	},
	{
		name: 'Workspace',
		path: '/workspace/:topicId',
		component: Workspace,
	},
	{
		name: 'Packages',
		path: '/packages',
		component: Packages,
	},
	{
		name:'Package',
		path: '/packages/:id',
		component: Package,
	},
	{
		name: '404',
		path: '/404',
		component: NotFound,
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/404',
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(async (to, from) => {
	if (
		to.name !== 'Login' &&
		to.name !== 'Register' &&
		to.name !== 'ForgetPassword' &&
		!(await validateToken())
	) {
		return { name: 'Login' };
	}
});

export default router;
