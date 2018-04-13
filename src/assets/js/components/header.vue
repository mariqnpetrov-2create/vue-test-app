<template>
	<header class="header">
		<b-navbar toggleable="md" type="dark" variant="info">
			<div class="container">
				<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

				<router-link to="/" class="navbar-brand">
					<img src="https://2create.info/images/logo.png" alt="" width="35" height="35">
				</router-link>

				<b-collapse is-nav id="nav_collapse" class="navigation" v-if="user">
					<b-navbar-nav class="ml-auto">
						<li class="nav-item" v-if="isLogged">
							<router-link class="nav-link" to="/assignments">All Assignments</router-link>
						</li>

						<li class="nav-item" v-if="isLogged">
							<router-link class="nav-link" to="/my-assignments">My Assignments</router-link>
						</li>

						<li class="nav-item" v-if="user.type == 'admin'">
							<router-link class="nav-link" to="/add-assignment">Add Assignment</router-link>
						</li>

						<li class="nav-item" v-if="!isLogged">
							<router-link class="nav-link" to="/login">Login</router-link>
						</li>

						<li class="nav-item" v-if="!isLogged">
							<router-link class="nav-link" to="/signup">Sign Up</router-link>
						</li>

						<b-nav-item-dropdown text="Profile" v-if="isLogged">
							<span>Logged in as {{user.displayName ? user.displayName : user.email}}</span>

							<a href="#" @click.prevent="signOut" class="dropdown-item">Sign Out</a>
						</b-nav-item-dropdown>

						<li class="nav-item" v-if="isLogged">
							<a href="#" @click.prevent="signOut" class="nav-link">Sign Out</a>
						</li>
					</b-navbar-nav>
				</b-collapse>
			</div><!-- /.container -->
		</b-navbar>
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

<style lang="css">
	.header a { text-decoration: none; }

	.navigation .dropdown-menu span { display: block; padding: 4px 24px; }
</style>
