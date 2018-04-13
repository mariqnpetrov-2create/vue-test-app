<template>
	<div class="container">
		<div class="assignments">
			<div class="assignment" v-for="(data, name, index) in $store.state.assignments" ref="name" :key="index">
				<h3>{{name}}</h3>

				<p>{{data.description}}</p>

				<b-button @click="enable(name)" v-if="isAssigned(name)">Assign</b-button>

        <span v-else>Assignment added</span>
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
  methods: {
  	enable(name) {
  		firebase.database().ref('users/' + this.$store.state.user.id + '/assignments').push({
        name,
        step: 0
      })
      .then((response) => {
        this.$store.commit('addUserAssignment', {
          name,
          id: response.key
        });
      });

  	},
  	isAssigned(name) {
      return !this.$store.state.user.assignments.some(el => el.name == name);
  	}
  }
}
</script>

<style lang="css" scoped>
  .assignment { margin-bottom: 50px; }
</style>
