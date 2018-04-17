<template>
	<div class="container">
		<b-form @submit.prevent="submit" @reset="reset" class="assignment-form">
			<b-form-group
				label="Name"
                label-for="name">
				<b-form-input id="name"
                  type="text"
                  v-model="form.name"
                  required></b-form-input>
    		</b-form-group>

    		<b-form-group
    			label="Description"
    			label-for="text">

				<b-form-textarea id="text"
                     v-model="form.description"
                     :rows="2"
                     :max-rows="6"
                     required>
	    		</b-form-textarea>
    		</b-form-group>

    		<b-form-group
    			v-for="(step, index) in form.steps" :key="index" >
    			<label :for="`step${index}`">{{index + 1}}.</label>

				<b-form-input :id="`step${index}`"
                  type="text"
                  v-model="form.steps[index]"
                  required v-focus></b-form-input>
    		</b-form-group>

			<b-form-group>
				<b-button @click="addStep">Add Step</b-button>
			</b-form-group>

    		<div class="form-actions">
    			<b-button type="reset">Reset</b-button>

    			<b-button type="submit">Submit</b-button>
    		</div><!-- /.form-actions -->
		</b-form>
	</div><!-- /.container -->
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'addAssignment',

  data () {
    return {
    	form: {
	    	description: '',
	    	name: '',
	    	steps: []
    	}
    }
  },
  methods: {
  	submit() {
  		const {name, description, steps} = this.form;

  		firebase.database().ref('assignments/' + name).set({
  			description,
  			steps
  		});

  		this.$store.state.assignments[name] = {
  			description,
  			steps
  		};

  		this.reset();
  	},
  	reset() {
  		this.form = {
	    	description: '',
	    	name: '',
	    	steps: []
    	}
  	},
  	addStep() {
  		this.form.steps.push('');
  	}
  }
}
</script>

<style lang="css" scoped>
.form-actions { text-align: right; }
</style>
