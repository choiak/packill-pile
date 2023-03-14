import { createRouter, createWebHistory } from 'vue-router';
import { validate } from '@/api/auth.js';
import Login from '@/views/session/login.vue';
import Register from '@/views/session/register.vue';
import ForgetPassword from '@/views/session/forgetPassword.vue';
import Index from '@/layouts/pile/index.vue';
import User from '@/views/pile/user.vue';
import Workspace from '@/views/pile/workspace.vue';
import Packages from '@/views/pile/packages.vue';
import Package from '@/views/pile/package.vue';

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
		path: '/user/:id',
		component: User,
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
		path: '/package/:id',
		component: Package,
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
		!(await validate())
	) {
		return { name: 'Login' };
	}
});

export default router;
