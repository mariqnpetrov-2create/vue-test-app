<template>
	<header class="header">
		<div class="container">
			<a href="#" class="logo"></a>

			<nav class="navigation">
				<ul>
					<li>
						<router-link to="/">Home</router-link>
					</li>

					<li v-if="!isLogged">
						<router-link to="/login">Login</router-link>
					</li>

					<li v-if="!isLogged">
						<router-link to="/signup">Sign Up</router-link>
					</li>

					<li v-if="isLogged">
						<a href="#" @click.prevent="signOut">Sign Out</a>
					</li>

					<li>
						<router-link to="/shop">Shop</router-link>
					</li>

					<li v-if="user.type == 'admin'">
						<router-link to="/add-assignment">Add Assignment</router-link>
					</li>
				</ul>
			</nav><!-- /.navigation -->

			<div class="user" v-if="isLogged">
				Logged in as {{user.displayName ? user.displayName : user.email}}

				{{user.type}}
			</div><!-- /.user -->
		</div><!-- /.container -->
	</header><!-- /.header -->
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'pageHeader',

  data () {
    return {

    }
  },
  computed: {
  	isLogged() {
  		return this.$store.state.isLogged;
  	},
  	user() {
  		return this.$store.state.user;
  	}
  },
  methods: {
  	signOut() {
  		this.$store.dispatch('logout');

  		// Redirect to Login if the current page requires Auth
		if ( this.$router.history.current.meta.requiresAuth ) {
			this.$router.push('/login');
		}
  	}
  }
}
</script>

<style lang="css" scoped>

</style>
