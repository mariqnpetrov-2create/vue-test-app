<template>
	<div class="container">
        <b-form @submit.prevent="login" class="form">
            <h2>Login</h2>

            <b-form-group
              label="Email"
              label-for="email">
              <b-form-input id="email"
                  type="text"
                  v-model="email"
                  required></b-form-input>
              </b-form-group>

              <b-form-group
                label="Password"
                label-for="password">

              <b-form-input id="password"
                  type="password"
                  v-model="password"
                  :rows="2"
                  :max-rows="6"
                  required>
                  </b-form-input>
              </b-form-group>

              <b-form-group>
                  <b-button type="submit">Log In</b-button>
              </b-form-group>
        </b-form>
	</div><!-- /.container -->
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

			this.$store.dispatch('login', user);

			this.$router.push(redirect ? redirect : '/');
  		},
  		(err) => {
  			alert(err.message);
  		});
  	}
  }
}
</script>

<style lang="css" scoped>
  .form { max-width: 500px; margin: 0 auto; }
  .form h2 { text-align: center; }
</style>
