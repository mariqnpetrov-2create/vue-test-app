<template>
	<div class="form">
		<input type="email" class="field" placeholder="Email" v-model="email">

		<input type="password" class="field" placeholder="Password" v-model="password">

		<button @click="login">Log In</button>
	</div><!-- /.form -->
</template>

<script>
import firebase from 'firebase';

export default {

  name: 'login',

  data () {
    return {
    	email: '',
    	password: ''
    }
  },
  methods: {
  	login() {
  		firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
  			alert(`Logged in as ${user.email}`)

  			this.$router.push(this.$route.query.redirect);
  		},
  		(err) => {
  			alert(err.message);
  		});
  	}
  }
}
</script>

<style lang="css" scoped>
</style>
