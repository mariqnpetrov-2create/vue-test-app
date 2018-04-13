<template>
	<div class="assignment-single">
		<b-button-group class="actions">
			<b-button @click="goBack" variant="info">Back</b-button>

			<b-button @click="restart" variant="danger">Reset</b-button>
		</b-button-group>

		<h2>{{assignment.name}}</h2>

		<h5 class="description">{{assignment.description}}</h5>

		<ol v-if="stepIndex > 0" class="steps">
			<li v-for="(step, index) in assignment.steps" :key="index" v-if="stepIndex > index">
				{{step}}
			</li>
		</ol>

		<h4 v-if="assignment.steps[stepIndex]">
			{{stepIndex + 1}}. {{assignment.steps[stepIndex]}}
			<br /><br />

			<b-button @click="moveToNext">Go To Next Step</b-button>
		</h4>

		<h4 v-else="assignment.steps[stepIndex]">
			Congratulations! <br />You have completed the assignment.
		</h4>
	</div><!-- /.assignment-single -->
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
    		steps: [],
    		name: ''
    	},
    	id: ''
    }
  },
  created() {
  	this.$store.commit('toggleOffMainPage');

	if ( this.$store.state.assignments ) {
		this.getData();
	} else {
		this.$store.watch(state => {
			return state.assignments;
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

  		this.$store.commit('updateStep', {
  			stepIndex: this.stepIndex,
  			name: this.assignment.name
  		});

  		firebase.database().ref('users/' + this.$store.state.user.id + '/assignments/' + this.id).update({
			step: this.stepIndex
		});
  	},
  	getData() {
  		const assignment = this.$store.state.user.assignments.find(el => el.id == this.$route.params.id);

  		this.setData(assignment);
  	},
  	setData(data) {
		this.assignment = {
			...this.$store.state.assignments[data.name],
			name: data.name
		};

		this.id = data.id;

		this.stepIndex = data.step;
  	},
  	restart() {
  		this.stepIndex = 0;

  		this.$store.commit('updateStep', {
  			stepIndex: 0,
  			name: this.assignment.name
  		});

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
.steps { margin-bottom: 20px; list-style-position: inside; }

.actions { margin-bottom: 40px; }

.description { margin-bottom: 15px; }
</style>
