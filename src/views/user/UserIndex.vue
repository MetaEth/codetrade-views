<template>
<div>
  <div v-if="userChoose" class="main-left">
    <div>
      <div>
        <p class="biaoti pd1">
          <b>用户管理</b>
        </p>
      </div>
      <ul class="subnav">
        <li @click="swith_tab({index:index})" v-for="(item,index) in swich_type" v-bind:class="current_tab===index?'on':''"><a>{{item}}</a></li>
      </ul>
    </div>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'UserIndex',
  data () {
    return {
      userChoose:false,
      current_tab: 0,
      swich_type: ['用户信息', '我的订单']
    }
  },
  methods: {
    swith_tab (event) {
      this.current_tab = event.index
      if(event.index==0){
        this.$router.push('/user/details')
      }else if(event.index==1){
        this.$router.push('/user/order')
      }
    },
  },
  created () {
    this.$bus.$on("userChoose",(data)=>{
      this.userChoose=data
    });
  }
}
</script>

<style scoped>

/*.pd1 {*/
/*  padding: 0 10px;*/
/*}*/

/*.biaoti {*/
/*  padding: 0 10px;*/
/*  margin: 0;*/
/*  height: 47px;*/
/*  line-height: 47px;*/
/*  font-size: 14px;*/
/*}*/
/*.news-subnav .badge {*/
/*  margin-right: 10px;*/
/*  background: #c0c1c2;*/
/*}*/
</style>
