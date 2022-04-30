<template>
<div>
  <div v-if="userChoose" class="main-left">
    <div>
      <div>
        <p class="biaoti pd1" @click="back">
          <b><-返回首页</b>
        </p>
      </div>
      <ul style="font-size: 13px;font-weight: 500" class="subnav">
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
    back(){
      this.$router.push('/')
      console.log("hello")
    },
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

<style scoped src="../../assets/css/kk.css">
.subul{
  list-style-position: inside;
  font-size: 13px;
  font-weight: 500;
}
</style>
