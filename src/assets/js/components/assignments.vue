<template>
	<div class="container">
		<div class="assignments">
			<div class="assignment" v-for="(data, name, index) in $store.state.assignments" ref="name" :key="index" v-if="isAssigned(name)">
				<h3>{{name}}</h3>

				<p>{{data.description}}</p>

				<b-button @click="enable(name)">Assign</b-button>
			</div><!-- /.assignment -->
		</div><!-- /.assignments -->
	</div><!-- /.container -->
</template>

<script>
import firebase from 'firebase';

export default {

  name: 'assignments',

  data () {
    return {
    }
  },
  computed: {

  },
  methods: {
  	enable(name) {
  		firebase.database().ref('users/' + this.$store.state.user.id + '/assignments').push({
        name,
        step: 0
      });

		  this.$store.commit('addUserAssignment', name);
  	},
  	isAssigned(name) {
      console.log(!this.$store.state.user.assignments.some(el => el.name == name));
      return !this.$store.state.user.assignments.some(el => el.name == name);
  	}
  }
}
</script>

<style lang="css" scoped>
</style>
