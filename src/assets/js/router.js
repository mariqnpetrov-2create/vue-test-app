import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';

import Home from './views/home.vue';
import Login from './components/login.vue';
import Signup from './components/signup.vue';
import shop from './components/shop.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '*',
		redirect: '/'
	},
	{
		path: '/',
		component: Home
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/signup',
		component: Signup
	},
	{
		path: '/shop',
		component: shop,
		meta: {
			requiresAuth: true
		}
	}
];

const router = new VueRouter({
	routes
});

router.beforeEach((to, from, next) => {
	const currentUser = firebase.auth().currentUser;
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	console.log(!currentUser, requiresAuth);
	if ( !currentUser && requiresAuth ) {
		next({
			path: 'login',
			query: {
				redirect: to.fullPath
			}
		});
	} else {
		next();
	}
});

export default router;
