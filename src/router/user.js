const User = () => import('@/views/user/user.vue');
const Activities = () => import('@/layouts/activity/activities.vue');
const Projects = () => import('@/layouts/user/projects.vue');

export default [
	{
		name: 'User',
		path: '/users/:username',
		component: User,
		redirect: {
			name: 'UserActivities',
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
];
