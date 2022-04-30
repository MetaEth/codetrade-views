

<template>
  <keep-alive include="Index" >
    <router-view v-if="isRouterAlive"></router-view>
  </keep-alive>


</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isRouterAlive: true,
    };
  },
  provide() {
    //提供
    return {
      reload: this.reload,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },

}
</script>
<style scoped></style>
