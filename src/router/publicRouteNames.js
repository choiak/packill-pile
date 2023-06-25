import auth from '@/router/auth.js';
import error from '@/router/error.js';

export default [
	...auth.map(route => route.name),
	...error.map(route => route.name),
];