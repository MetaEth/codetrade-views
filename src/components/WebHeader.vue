<template>
  <div class="header nobg">
    <div class="banxin">
      <a @click="backIndex" class="logo">
        <img src="../assets/picture/logo.png"/>
      </a>
      <div class="header-right" id="min-nav">

         <div v-if="is_login" class="login-register">
          <router-link :to="{path:'/user/login'}">登入</router-link>
          <router-link :to="{path:'/user/register'}">注册</router-link>
        </div>

        <ul v-if="!is_login" class="nav" id="nav">
          <li  class=""><span></span><a href="/user/details">欢迎：{{username}}</a></li>
          <li class="" @click="user_exit"><span></span><a>退出</a></li>
          <!--
          <li class="on"><span></span><a href="/">首页</a></li>
          <li  class="" >
            <span></span><a href="/cloud" class="hidden-xs">产品</a>
          </li>
          <li class=""><span></span><a href="/shop/index">源码</a></li>
          <li class=""><span></span><a href="/prices">价格</a></li>
          <li class=""><span></span><a href="http://doc.bmob.cn" target="_blank">文档</a></li>
          <li class=" hidden-xs"><span></span><a href="/downloads">下载</a></li>
          -->

        </ul>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'WebHeader',
  inject: ["reload"],
  methods: {
    backIndex(){
      this.$router.push('/')
    },
    user_exit(){
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      console.log("退出登入")
      this.is_login=false
      this.reload()
    },
    get_user(){
      var user=localStorage.getItem('user')
      if(user){
        this.is_login=false
        this.username=JSON.parse(user).username
      }else{
        this.is_login=true
      }
    }
  },

  activated() {
    // 页面每次进入将手机动态验证码置为空
    this.get_user()
  },
  data(){
    return{
      is_login:null,
      username:''
    }
  },
  created () {
    this.get_user()
  }
}
</script>

<style scoped>

</style>
