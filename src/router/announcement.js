const Blog = () => import('@/views/blog/blog.vue');
const Announcement = () => import('@/views/blog/announcement.vue');

export default [
	{
		name: 'Blog',
		path: '/blog',
		component: Blog,
	},
	{
		name: 'Announcement',
		path: '/blog/:announcementId',
		component: Announcement,
	},
]