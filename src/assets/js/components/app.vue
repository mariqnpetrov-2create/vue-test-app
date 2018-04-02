<template>
	<div id="root">
		<pageHeader></pageHeader>

		<router-view></router-view>

		<pageFooter></pageFooter>
	</div><!-- /#root -->
</template>

<script>
import pageHeader from './header.vue';
import pageFooter from './footer.vue';

export default {
  name: 'app',

  data () {
    return {

    }
  },
  components: {
  	pageHeader,
  	pageFooter
  }
}
</script>

<style lang="css" scoped>

</style>
