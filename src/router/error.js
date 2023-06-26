const Unauthorized = () => import('@/views/error/401.vue');
const Forbidden = () => import('@/views/error/403.vue');
const NotFound = () => import('@/views/error/404.vue');

export default [
	{
		name: '401',
		path: '/401',
		component: Unauthorized,
	},
	{
		name: '403',
		path: '/403',
		component: Forbidden,
	},
	{
		name: '404',
		path: '/404',
		component: NotFound,
	},
];
