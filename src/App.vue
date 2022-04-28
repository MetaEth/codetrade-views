

<template>
<!--      <router-view v-if="isRouterAlive"></router-view>-->
  <keep-alive include="Index" >
    <router-view v-if="isRouterAlive"></router-view>
  </keep-alive>

  <!-- vue3.0配置 -->
<!--  <router-view v-slot="{ Component }">-->
<!--    <keep-alive>-->
<!--      <component :is="Component"  v-if="$route.meta.keepAlive"/>-->
<!--    </keep-alive>-->
<!--    <component :is="Component"  v-if="!$route.meta.keepAlive"/>-->
<!--  </router-view>-->
<!--  <router-view v-slot="{ Component }">-->
<!--    <keep-alive include="Data">-->
<!--      <component :is="Component"/>-->
<!--    </keep-alive>-->
<!--  </router-view>-->

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
