const Topics = () => import('@/views/topic/topics.vue');

export default [
	{
		name: 'Topic',
		path: '/topic/:id',
	},
	{
		name: 'Topics',
		path: '/topics',
		component: Topics,
	},
];
