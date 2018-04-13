import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';

import Home from './views/home.vue';
import Login from './components/login.vue';
import Signup from './components/signup.vue';
import Shop from './components/shop.vue';
import Assignments from './components/assignments.vue';
import AddAssignment from './components/addAssignment.vue';
import myAssignments from './components/myAssignments.vue';
import singleAssignment from './components/singleAssignment.vue';

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
		path: '/assignments',
		component: Assignments,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/my-assignments',
		component: myAssignments,
		meta: {
			requiresAuth: true
		},
		children: [{
			// path: ':name',
			path: ':id',
			component: singleAssignment,
			meta: {
				requiresAuth: true
			}
		}]
	},
	{
		path: '/add-assignment',
		component: AddAssignment,
		meta: {
			requiresAuth: true,
			requiresAdmin: true
		}
	}
];

const router = new VueRouter({
	routes
});

router.beforeEach((to, from, next) => {
	const currentUser = firebase.auth().currentUser;

	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

	if ( !currentUser && requiresAuth ) {
		next({
			path: 'login',
			query: {
				redirect: to.fullPath
			}
		});
	} else if ( requiresAdmin ) {
		firebase.database().ref('/users/' + currentUser.uid).once('value')
			.then((snapshot) => {
				if ( snapshot.val().type  == 'admin' ) {
					next();
				} else {
					next('/');
				}
			});
	} else {
		next();
	}
});

export default router;
