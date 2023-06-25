const UserSettings = () => import('@/views/settings/settings.vue');
const General = () => import('@/layouts/settings/general.vue');
const Security = () => import('@/layouts/settings/security.vue');
const Subscription = () => import('@/layouts/settings/subscription.vue');
const DeleteAccount = () => import('@/layouts/settings/deleteAccount.vue');

export default [
	{
		name: 'UserSettings',
		path: '/settings',
		component: UserSettings,
		redirect: {
			name: 'SettingsGeneral',
		},
		children: [
			{
				name: 'SettingsGeneral', path: 'general', component: General,
			},
			{
				name: 'SettingsSecurity', path: 'security', component: Security,
			},
			{
				name: 'SettingsSubscription', path: 'subscription', component: Subscription,
			},
		],
	},
	{
		name: 'DeleteAccount',
		path: '/delete-account',
		component: DeleteAccount,
	},
];