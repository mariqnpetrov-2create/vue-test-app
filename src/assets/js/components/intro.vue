<template>
	<div class="intro">
		<div class="container" v-if="isLogged">
			<h1>Hello</h1>

			<h5>1. Go to <router-link to="/assignments">All Assignments</router-link> page and select the one you want to work on.</h5>

			<h5>2. When an assignments is selected - it is added to your account and you can start it here - <router-link to="/my-assignments">My Assignments</router-link>.</h5>

			<h5>3. Each assignment has only one active task. You need to complete it before moving to the next one!</h5>

			<h5 class="danger">4. Don't cheat!</h5>
		</div><!-- /.container -->

		<div class="container" v-else>
			<h1>Hello</h1>

			<h2>Please Login/Sign Up</h2>
		</div><!-- /.container -->
	</div><!-- /.intro -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'intro',

  data() {
    return {

    }
  },
  computed: {
  	...mapGetters(['isLogged'])
  }
}
</script>

<style lang="css" scoped>
.intro { text-align: center; }

.danger { color: #ff1000; }
</style>
