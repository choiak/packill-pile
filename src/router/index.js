import { createRouter, createWebHistory } from 'vue-router';
import { validateToken } from '@/api/auth.js';
import Login from '@/views/session/login.vue';
import Register from '@/views/session/register.vue';
import ForgetPassword from '@/views/session/forgetPassword.vue';
import ResetPassword from '@/views/session/resetPassword.vue';
import Dashboard from '@/views/pile/dashboard.vue';
import User from '@/views/user/user.vue';
import Workspace from '@/views/workspace/workspace.vue';
import Packages from '@/views/workspace/packages.vue';
import Package from '@/views/workspace/package.vue';
import UserSettings from '@/views/settings/settings.vue';
import General from '@/layouts/settings/general.vue';
import NotFound from '@/views/pile/404.vue';
import Security from '@/layouts/settings/security.vue';
import Activities from '@/layouts/user/activities.vue';
import Projects from '@/layouts/user/projects.vue';

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
		name: 'ResetPassword',
		path: '/reset-password',
		component: ResetPassword,
	},
	{
		name: 'Dashboard',
		path: '/dashboard',
		component: Dashboard,
	},
	{
		name: 'User',
		path: '/users/:username',
		component: User,
		redirect: {
			name: 'UserActivity',
		},
		children: [
			{
				name: 'UserActivities',
				path: 'activities',
				component: Activities,
			},
			{
				name: 'userProjects',
				path: 'projects',
				component: Projects,
			},
		],
	},
	{
		name: 'UserSettings',
		path: '/settings',
		component: UserSettings,
		redirect: {
			name: 'SettingsGeneral',
		},
		children: [
			{
				name: 'SettingsGeneral',
				path: 'general',
				component: General,
			},
			{
				name: 'SettingsSecurity',
				path: 'security',
				component: Security,
			},
		],
	},
	{
		name: 'Workspace',
		path: '/workspace/:topicId/:problemId?',
		component: Workspace,
	},
	{
		name: 'Topic',
		path: '/topics/:id',
	},
	{
		name: 'Problem',
		path: '/problems/:id',
	},
	{
		name: 'Packages',
		path: '/packages',
		component: Packages,
	},
	{
		name: 'Package',
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
	},
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
