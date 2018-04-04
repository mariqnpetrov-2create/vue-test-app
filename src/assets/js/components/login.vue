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
  			const redirect = this.$route.query.redirect;

			this.$store.commit('login', user);

  			if ( redirect ) {
  				this.$router.push(redirect);
  			} else {
  				this.$router.push('/');
  			}
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
