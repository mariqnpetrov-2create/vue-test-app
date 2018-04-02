// main.js
import Vue from 'vue';
import App from './components/app.vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import { routes } from './router.js';

Vue.use(VueRouter);
Vue.use(BootstrapVue);

const router = new VueRouter({
	routes
})

new Vue({
	el: '#app',
	render: h => h(App),
	router
});
