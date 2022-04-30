<template>
  <div class="section-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="login-form-cd-style2">
            <div class="login-form-cd-style2-form">
              <h2>会员登入</h2>
              <!--form标签-->
              <div action="">
                <div class="single-field">
                  <input  type="number"  placeholder="手机号" maxlength="11" v-model="login_data.phone">
                  <i class="bi bi-telephone-fill"></i>
                </div>
                <div class="single-field">
                  <input  type="password"  placeholder="密码" maxlength="12" v-model="login_data.password">
                  <i class="bi bi-lock-fill"></i>
                </div>
                <div class="single-field mb-0">
                  <button @click="onsubmit()" class="button-1">登入</button>
                </div>
              </div>
            </div>
            <div class="login-form-cd-style2-botm">
                <router-link to="/user/register">注册会员</router-link>
                <router-link to="/user/resetpassword">重置密码 !</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return {
      login_data:{
        phone:"",
        password:""
      }
    }
  },
  methods:{
    async onsubmit(){
      var login_data=this.login_data
      if(login_data.phone=="" || login_data.password==""){
        alert("请输入登入信息！")
        return
      }
      var result=await this.$Post('/api/login',login_data)
      var server_time=await this.$Get('/api/server_time')
      console.log(result,"result")
      if (result.status === 200) {
        if(Date.parse(server_time)>Date.parse(result.data.userInfo.vipAt)){
          result.data.userInfo.vipAt="否"
        }else{
          result.data.userInfo.vipAt="Vip到期时间为："+result.data.userInfo.vipAt
        }
        localStorage.setItem('token', result.data.token)
        localStorage.setItem("user",JSON.stringify(result.data.userInfo))
        this.$fire({title: "提示", text: "登入成功", type: "success", timer: 1000, width: 300})
        setTimeout(() => {
          this.$router.back(-1)
        },800)
      }
      else{
        alert("信息不正确，登入失败！")
        console.log("登录失败")
      }
    }
  },

}
</script>

<style scoped>

</style>
