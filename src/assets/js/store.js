import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLogged: false,
		user: null,
		assignments: null,
		isMainPage: true
	},
	getters: {
		isLogged(state) {
			return state.isLogged;
		}
	},
	mutations: {
		login(state, data) {
			const assignments = [];
			const {email, phoneNumber, photoURL, displayName, type, uid} = data;

			for ( let key in data.assignments) {
				data.assignments[key].id = key;

				assignments.push(data.assignments[key])
			}

			state.isLogged = true;
			state.user = {
				email,
				phoneNumber,
				photoURL,
				displayName,
				type,
				id: data.uid,
				assignments
			};

			console.log(state.user);
		},
		logout(state) {
			state.isLogged = false;
			state.user = {};
		},
		getAssignments(state, assignments) {
			state.assignments = assignments;
		},
		addUserAssignment(state, data) {
			state.user.assignments.push({
				name: data.name,
				id: data.id,
				step: 0
			});
		},
		toggleOnMainPage(state) {
			state.isMainPage = true;
		},
		toggleOffMainPage(state) {
			state.isMainPage = false;
		},
		updateStep(state, data) {
			const target = state.user.assignments.find(el => el.name == data.name);

			target.step = data.stepIndex;
		}
	},
	actions: {
		login(context, user) {
			return firebase.database().ref('/users/' + user.uid).once('value')
				.then((snapshot) => {
					Object.assign(user, snapshot.val());

					context.commit('login', user);

					context.dispatch('getAssignments');
				});
		},

		logout(context) {
			firebase.auth().signOut()
				.then(() => {
		  			context.commit('logout');
		  		});
		},

		getAssignments(context) {
			return firebase.database().ref('assignments').once('value')
				.then((snapshot) => {
					context.commit('getAssignments', snapshot.val());
				});
		}
	}
});
