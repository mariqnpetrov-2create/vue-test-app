<template>
	<div class="container" v-if="isLogged">
		<b-form @submit.prevent="update" class="form">
          <h2>Profile</h2>

          <p>Email {{user.email}}</p>

			<b-form-group
				label="Name"
				label-for="name">
				<b-form-input id="name"
				    type="text"
					v-model="user.displayName">

				</b-form-input>
        	</b-form-group>

        	<b-form-group
				label="Change Avatar"
				label-for="avatar">
				<b-form-file id="avatar"
				    accept="image/jpeg, image/png, image/gif"
					v-model="user.photoURL"
					@change="onFileChange">

				</b-form-file>

				<div class="avatar-preview" v-if="image">
					<img :src="image"/>
				</div><!-- /.avatar-preview -->
        	</b-form-group>

            <b-form-group>
                <b-button type="submit">Update</b-button>
            </b-form-group>

            <b-alert variant="success" show v-if="updateMessage">{{updateMessage}}</b-alert>
      </b-form>
	</div><!-- /.container -->
</template>

<script>
import { mapGetters } from 'vuex';
export default {

  name: 'profile',

  data () {
    return {
    	image: null,
    	updateMessage: null
    }
  },
  computed: {
  	user() {
  		return this.$store.state.user;
  	},
  	...mapGetters(['isLogged'])
  },
  methods: {
  	update() {
  		this.$store.commit('updateUser', this.user);

  		this.image = null;

  		this.updateMessage = 'Profile updated';

  		setTimeout(() => {
  			this.updateMessage = null;
  		}, 3000);
  	},
	onFileChange(e) {
		const files = e.target.files || e.dataTransfer.files;

		if (!files.length) {
			return;
		}

		this.createImage(files[0]);
	},
	createImage(file) {
		const image = new Image();
		const reader = new FileReader();

		reader.onload = (e) => {
			this.image = e.target.result;

			this.user.imageFile = file;
		};

		reader.readAsDataURL(file);
	}
  }
}
</script>

<style lang="css" scoped>
.avatar-preview { display: inline-block; max-width: 400px; height: auto; padding: 10px; border: 1px solid #ccc; margin-top: 20px; }
</style>
