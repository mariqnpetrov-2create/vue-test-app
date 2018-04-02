<template>
	<header class="header">
		<div class="container">
			<a href="#" class="logo"></a>

			<nav class="navigation">
				<ul>
					<li>
						<router-link to="/">Home</router-link>
					</li>

					<li>
						<router-link to="/login">Login</router-link>
					</li>

					<li>
						<router-link to="/signup">Sign Up</router-link>
					</li>

					<li>
						<a href="#" @click.prevent="signOut">Sign Out</a>
					</li>

					<li>
						<router-link to="/store">Store</router-link>
					</li>
				</ul>
			</nav><!-- /.navigation -->
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
  methods: {
  	signOut() {
  		firebase.auth().signOut().then(() => {
  			// Redirect to Login if the current page requires Auth
  			if ( this.$router.history.current.meta.requiresAuth ) {
  				this.$router.push('/login');
  			}
  		});
  	}
  }
}
</script>

<style lang="css" scoped>

</style>
