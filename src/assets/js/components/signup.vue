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
  		firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
  			console.log(user.email);
  			alert(`${user.email} created`);
  		},
  		(error) => {
  			alert(error.message);
  		});
  	}
  }
}
</script>

<style lang="css" scoped>
</style>
