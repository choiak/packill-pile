const Login = () => import('@/views/session/login.vue');
const Register = () => import('@/views/session/register.vue');
const ForgetPassword = () => import('@/views/session/forgetPassword.vue');
const ResetPassword = () => import('@/views/session/resetPassword.vue');

export default [
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

];