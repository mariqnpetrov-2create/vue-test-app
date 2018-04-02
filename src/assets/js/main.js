// main.js
import Vue from 'vue';
import App from './components/app.vue';
import BootstrapVue from 'bootstrap-vue';
import router from './router';
import config from './config';
import firebase from 'firebase';

let app;

Vue.use(BootstrapVue);

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged((user) => {
	if ( !app ) {
		app = new Vue({
			el: '#app',
			render: h => h(App),
			router
		});
	}
},
(err) => {
	alert(err.message);
});
