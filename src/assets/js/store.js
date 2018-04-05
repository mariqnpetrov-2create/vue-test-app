import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLogged: false,
		user: {}
	},
	getters: {
		getUserType(state) {
			return state.user.type;
		}
	},
	mutations: {
		login(state, data) {
			state.isLogged = true;
			state.user = {
				email: data.email,
				phoneNumber: data.phoneNumber,
				photoURL: data.photoURL,
				displayName: data.displayName,
				type: data.type
			};
		},
		logout(state) {
			state.isLogged = false;
			state.user = {};
		}
	},
	actions: {
		login(context, user) {
			firebase.database().ref('/users/' + user.uid).once('value')
				.then((snapshot) => {
					Object.assign(user, snapshot.val());

					context.commit('login', user);
				});
		},

		logout(context) {
			firebase.auth().signOut()
				.then(() => {
		  			context.commit('logout');
		  		});
		}
	}
});
