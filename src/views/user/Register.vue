<template>
  <div class="section-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="login-form-cd-style2">
            <div class="login-form-cd-style2-form">
              <h2>注册会员</h2>
              <div action="">
                <div class="single-field">
                  <input v-model="register_data.username" maxlength="10" placeholder="用户名">
                  <i class="bi bi-person-circle"></i>
                </div>
                <div class="single-field">
                  <input type="number" placeholder="手机号" maxlength="11" v-model="register_data.phone" >
                  <i class="bi bi-telephone-fill"></i>
                </div>
                <div class="single-field">
                  <input type="email" v-model="register_data.smscode" maxlength="6" placeholder="验证码">
                  <i class="bi bi-envelope-fill"></i>
                  <i v-if="is_send" @click="accessVerify" class="send">{{btn}}</i>
                  <i v-if="!is_send" class="send">{{btn}}</i>
                </div>
                <div class="single-field">
                  <input type="password" v-model="register_data.password" maxlength="12" placeholder="密码">
                  <i class="bi bi-lock-fill"></i>
                </div>
<!--                <div class="single-field">-->
<!--                  <input type="password" v-model="register_data.repeat_password" maxlength="12" placeholder="确认密码">-->
<!--                  <i class="bi bi-lock-fill"></i>-->
<!--                </div>-->
                <div class="single-field mb-0">
                  <button class="button-1" @click="onsubmit">注册会员</button>
                </div>
              </div>
            </div>
            <div class="login-form-cd-style2-botm">
              <router-link to="/user/login">返回登入</router-link>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '../../utils/util'

export default {
  name: 'Register',
  data () {
    return {
      btn: '发送',
      is_send:true,
      register_data:{
        username:"",
        phone:"",
        smscode:"",
        password:"",
      }
    }
  },
  methods: {
    async onsubmit() {
      var register_data=this.register_data
      if(register_data.username=="" || register_data.phone=="" || register_data.smscode=="" || register_data.password==""){
        alert("请填写完整的信息!")
        return
        //判断手机
      }else if(!util.checkUsername(register_data.username)){
        alert("请输入正确的用户名!")
        return
      }
      else if(!util.checkPhone(register_data.phone)){
        alert("请输入正确的手机号码!")
        return
        //验证码
      }else if(register_data.password.length<6){
        alert("密码不能小于六位！")
        return;
      }
      //查找是否已经注册
      var result=await this.$Post("/view/user/findOne",{phone: register_data.phone})
      if(result){
        alert("此号码已经被注册")
        return
      }
      this.$Post("/view/user/insertOne",register_data).then(res=>{
        if(res.code==400){
          alert("注册失败，验证码或手机无效！")
          console.log(res,"res")
        }else {
          this.$fire({title: "提示", text: "恭喜您注册成功", type: "success", timer: 1000})
          delete res['password']
          delete res['createdAt']
          localStorage.setItem('user',JSON.stringify(res))
          setTimeout(() => {
            this.$router.push('/')
          },800)
        }
      })
    },
    async accessVerify (){
      if(!util.checkPhone(this.register_data.phone)){
        alert("请输入正确的手机号码!")
        return
      }
      //计时器
      this.is_send=false
      var result=await this.$Get('/api/tencentcloud/sendsms',{phone:this.register_data.phone,smsType:"register"})
      if(result.code==200){
        this.$fire({title: "提示", text: "验证码发送成功", type: "success", timer: 1500})
        console.log(result,"result")
        this.codeInterval();
      }else{
        this.$fire({title: "提示", text: "验证码发送失败", type: "question", timer: 1500})
      }
    },
    //重新获取验证码倒计时
    codeInterval() {
      const TIME_COUNT = 119;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.btn = this.count--+"S"
          } else {
            this.is_send=true
            clearInterval(this.timer);
            this.timer = null;
            this.btn="发送"
          }
        }, 1000);
      }
    }
  }
}
</script>

<style scoped>
.login-form-cd-style2-form .single-field i.send {
  background: #5f3afc;
  font-size: 15px;
  width: 16%;
  text-align: left;
  left: 290px;
  top: 15%;
  color: #fff;
  border-radius: 12px;

}
</style>
