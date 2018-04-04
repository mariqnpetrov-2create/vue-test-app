import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLogged: false,
		user: {}
	},
	mutations: {
		login(state, data) {
			state.isLogged = true;
			state.user = data;
		},
		logout(state) {
			state.isLogged = false;
			state.user = {}
		}
	}
});
