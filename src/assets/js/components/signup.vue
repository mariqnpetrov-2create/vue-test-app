<template>
	<div class="form">
		<input type="email" class="field" placeholder="Email" v-model="email">

		<input type="password" class="field" placeholder="Password" v-model="password">

		<!-- <input type="password" class="field" placeholder="Retype Password" v-model="password"> -->

		<button @click="signUp">Sign Up</button>
	</div><!-- /.form -->
</template>

<script>
import firebase from 'firebase';

export default {

  name: 'signup',

  data () {
    return {
    	email: '',
    	password: ''
    }
  },

  methods: {
  	signUp() {
  		firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
  			.then((user) => {
	  			this.$store.commit('login', user);

	  			this.$router.push('/');

	  			return user;
	  		},
	  		(error) => {
	  			alert(error.message);
	  		})
	  		.then(({email, uid}) => {
	  			firebase.database().ref('users/' + uid).set({
	  				type: 'user'
	  			});
	  		});
  	}
  }
}
</script>

<style lang="css" scoped>
</style>
