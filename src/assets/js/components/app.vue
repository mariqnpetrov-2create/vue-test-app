<template>
	<div id="root">
		<pageHeader></pageHeader>

		<div class="main">
      <router-view></router-view>
    </div><!-- /.main -->

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
.main { padding: 50px 0; }
</style>
