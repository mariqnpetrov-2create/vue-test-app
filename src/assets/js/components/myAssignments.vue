<template>
	<div class="container" v-if="isLogged">
		<div class="assignments" v-if="isMainPage">
			<h3 v-if="$store.state.user.assignments.length">Your Assignments:</h3>

			<h3 v-else>You don't have any assignments.</h3>

			<ul class="list-assignments">
				<li v-for="(assignment, index) in $store.state.user.assignments" :key="index">
					<h5>{{assignment.name}}</h5>

          <div class="actions">
            <router-link :to="{ path: assignment.id }" append class="btn btn-secondary">Start</router-link>

            <b-button @click.prevent="unAssign(assignment.id)">Unassign</b-button>
          </div><!-- /.actions -->
				</li>
			</ul><!-- /.list-assignments -->
		</div><!-- /.assignments -->

		<router-view />
	</div><!-- /.container -->
</template>

<script>
import { mapGetters } from 'vuex';
export default {

  name: 'myAssignments',

  data () {
    return {

    }
  },
  computed: {
  	isMainPage() {
  		return this.$store.state.isMainPage;
  	},
  	...mapGetters(['isLogged'])
  },
  mounted() {
  	if ( !this.$route.params.name ) {
  		this.$store.commit('toggleOnMainPage');
  	}
  },
  methods: {
    unAssign(id) {
      this.$store.commit('deleteAssignment', id);
    }
  }
}
</script>

<style lang="css" scoped>
	.list-assignments li ~ li { margin-top: 30px; }
	.list-assignments a { text-decoration: none; }
	.list-assignments h5 { text-transform: capitalize; }
</style>
