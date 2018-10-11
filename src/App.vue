<template>
  <div id="app">
    <Sidebar />
    <router-view/>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar';

export default {
  name: 'App',
  components: {
    Sidebar,
  },
};
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';

body {
  background-color: darkslategray;
  color: lightsteelblue;
}
</style>
