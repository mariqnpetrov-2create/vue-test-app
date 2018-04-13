<template>
	<intro></intro>
</template>

<script>
import intro from '../components/intro.vue';
import login from '../components/login.vue';

export default {

  name: 'home',

  data () {
    return {

    }
  },
  components: {
  	intro,
  	login
  }
}
</script>

<style lang="css" scoped>

</style>
