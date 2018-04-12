<template>
	<div class="container">
		<ul class="list-assignments" v-if="isMainPage">
			<li v-for="(assignment, index) in $store.state.user.assignments" :key="index">
				<h4>{{assignment.name}} <router-link :to="{ path: assignment.name }" append>go</router-link></h4>
			</li>
		</ul><!-- /.list-assignments -->

		<router-view />
	</div><!-- /.container -->
</template>

<script>
export default {

  name: 'myAssignments',

  data () {
    return {

    }
  },
  computed: {
  	isMainPage() {
  		return this.$store.state.isMainPage;
  	}
  },
  mounted() {
  	if ( !this.$route.params.name ) {
  		this.$store.commit('toggleOnMainPage');
  	}
  }
}
</script>

<style lang="css" scoped>
</style>
