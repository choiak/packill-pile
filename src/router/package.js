const Packages = () => import('@/views/workspace/packages.vue');
const Package = () => import('@/views/workspace/package.vue');

export default [
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
];
