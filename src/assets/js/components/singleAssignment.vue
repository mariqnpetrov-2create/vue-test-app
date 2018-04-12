<template>
	<div class="container">
		<b-button-group>
			<b-button @click="goBack" variant="info">Back</b-button>

			<b-button @click="restart" variant="danger">Reset</b-button>
		</b-button-group>

		<h2>{{name}}</h2>

		<h5>{{assignment.description}}</h5>

		<ol v-if="stepIndex > 0">
			<li v-for="(step, index) in assignment.steps" :key="index" v-if="stepIndex > index">
				{{step}}
			</li>
		</ol>

		<h4 v-if="assignment.steps[stepIndex]">
			{{stepIndex + 1}}. {{assignment.steps[stepIndex]}}

			<b-button @click="moveToNext">Go To Next Step</b-button>
		</h4>

		<h4 v-else="assignment.steps[stepIndex]">
			Congratulations! <br />You have completed the assignment.
		</h4>
	</div><!-- /.container -->
</template>

<script>
import firebase from 'firebase';

export default {

  name: 'singleAssignment',

  data() {
    return {
    	stepIndex: 0,
    	assignment: {
    		description: '',
    		steps: []
    	},
    	id: ''
    }
  },
  computed: {
  	name() {
  		return this.$route.params.name;
  	}
  },
  created() {
  	this.$store.commit('toggleOffMainPage');

  	this.$store.dispatch('getAssignments').then(() => {
		this.assignment = this.$store.state.assignments[this.$route.params.name];
	});

  	//Check if the user is already logged.
	if ( this.$store.state.isLogged ) {
		this.getData();
	} else {
		this.$store.watch(state => {
			return state.isLogged;
		}, () => {
			this.getData();
		});
	}
  },
  methods: {
  	goBack() {
  		this.$router.push('/my-assignments');
  	},
  	moveToNext() {
  		this.stepIndex++;

  		firebase.database().ref('users/' + this.$store.state.user.id + '/assignments/' + this.id).update({
			step: this.stepIndex
		});
  	},
  	getData() {
  		const assignment = this.$store.state.user.assignments.find(el => el.name == this.$route.params.name);

		this.id = assignment.id;

		this.stepIndex = assignment.step;
  	},
  	restart() {
  		this.stepIndex = 0;

  		firebase.database().ref('users/' + this.$store.state.user.id + '/assignments/' + this.id).update({
			step: 0
		});
  	}
  },
  beforeRouteLeave (to, from, next) {
  	this.$store.commit('toggleOnMainPage');

  	next();
  }
}
</script>

<style lang="css" scoped>
ol { list-style-position: inside; }
</style>
