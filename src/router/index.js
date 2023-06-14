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
import NotFound from '@/views/error/404.vue';
import Forbidden from '@/views/error/403.vue';
import Unauthorized from '@/views/error/401.vue';
import Security from '@/layouts/settings/security.vue';
import Activities from '@/layouts/activity/activities.vue';
import Projects from '@/layouts/user/projects.vue';
import Subscription from '@/layouts/settings/subscription.vue';
import DeleteAccount from '@/layouts/settings/deleteAccount.vue';
import Blog from '@/views/blog/blog.vue';
import Announcement from '@/views/blog/announcement.vue';
import Quiz from '@/views/quiz/quiz.vue';
import Topics from '@/views/topic/topics.vue';

const routes = [{
	name: 'Login', path: '/login', component: Login,
}, {
	name: 'Register', path: '/register', component: Register,
}, {
	name: 'ForgetPassword', path: '/forget-password', component: ForgetPassword,
}, {
	name: 'ResetPassword', path: '/reset-password', component: ResetPassword,
}, {
	name: 'DeleteAccount', path: '/delete-account', component: DeleteAccount,
}, {
	name: 'Dashboard', path: '/dashboard', component: Dashboard,
}, {
	name: 'User', path: '/users/:username', component: User, redirect: {
		name: 'UserActivities',
	}, children: [{
		name: 'UserActivities', path: 'activities', component: Activities,
	}, {
		name: 'userProjects', path: 'projects', component: Projects,
	}],
}, {
	name: 'UserSettings', path: '/settings', component: UserSettings, redirect: {
		name: 'SettingsGeneral',
	}, children: [{
		name: 'SettingsGeneral', path: 'general', component: General,
	}, {
		name: 'SettingsSecurity', path: 'security', component: Security,
	}, {
		name: 'SettingsSubscription', path: 'subscription', component: Subscription,
	}],
}, {
	name: 'Workspace', path: '/workspace/:topicId/:problemId?/:fragment?',
	component: Workspace,
}, {
	name: 'Topic', path: '/topic/:id',
}, {
	name: 'Problem', path: '/problems/:id',
}, {
	name: 'Quiz', path: '/quizzes/:id', component: Quiz,
}, {
	name: 'Packages', path: '/packages', component: Packages,
}, {
	name: 'Package', path: '/packages/:id', component: Package,
}, {
	name: 'Blog', path: '/blog', component: Blog,
}, {
	name: 'Announcement', path: '/blog/:announcementId', component: Announcement,
}, {
	name: 'Topics', path: '/topics', component: Topics,
}, {
	name: '401', path: '/401', component: Unauthorized,
}, {
	name: '403', path: '/403', component: Forbidden,
}, {
	name: '404', path: '/404', component: NotFound,
}, {
	path: '/:pathMatch(.*)*', redirect: '/404',
}];

const router = createRouter({
	history: createWebHistory(), routes,
});

router.beforeEach(async (to, from) => {
	if (to.name !== 'Login' && to.name !== 'Register' && to.name !== 'ForgetPassword' && !(await validateToken())) {
		return { name: 'Login' };
	}
});

export default router;
