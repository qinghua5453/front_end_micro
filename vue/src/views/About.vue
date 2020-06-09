<template>
  <div class="about">
    <h1>This is about page</h1>
  </div>
</template>
<script>
import actions from "../shared/actions.js";
export default {
  mounted () {
    console.log('about')
    actions.onGlobalStateChange((state) => {
      console.log('state', state)
    }, true)
  }
}
</script>
<style scoped>
  .about {
    color: #7265e6;
  }
</style>
