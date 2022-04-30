<template>
  <div class="section-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="login-form-cd-style2">
            <div class="login-form-cd-style2-form">
              <h2>重置密码</h2>
              <div action="">

                <div class="single-field">
                  <input type="number" v-model="repeat_data.phone" maxlength="11" placeholder="手机号">
                  <i class="bi bi-telephone-fill"></i>
                </div>



                <div class="single-field">
                  <input class="input" type="email" v-model="repeat_data.smscode" maxlength="6" placeholder="验证码">
                  <i class="bi bi-envelope-fill"></i>
                  <i v-if="is_send" @click="accessVerify" class="send">{{btn}}</i>
                  <i v-if="!is_send" class="send">{{btn}}</i>
                </div>
                <div class="single-field">
                  <input type="password" v-model="repeat_data.password" maxlength="12" placeholder="密码">
                  <i class="bi bi-lock-fill"></i>
                </div>
                <div class="single-field">
                  <input type="password" v-model="repeat_data.repeat_password" maxlength="12" placeholder="确认密码">
                  <i class="bi bi-lock-fill"></i>
                </div>
                <div class="single-field mb-0">
                  <button class="button-1" @click="onsubmit">确定</button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var util = require("../../utils/util.js");
export default {
  name: 'ResetPassword',
  data(){
    return{
      btn: '发送',
      is_send:true,
      repeat_data:{
        phone:"",
        smscode:"",
        password:"",
        repeat_password:""
      }
    }
  },
  methods:{
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
    },
    async accessVerify (){
      //计时器
      if(!util.checkPhone(this.repeat_data.phone)){
        alert("请输入正确的手机号码!")
        return
      }
      //判断用户是否注册
      var result=await this.$Post('view/user/findOne',{phone: this.repeat_data.phone})
      if(!result){
        alert("该号码没被注册！")
        return
      }
      //计时器
      this.is_send=false
      var result=await this.$Get('/api/tencentcloud/sendsms',{phone:this.repeat_data.phone,smsType:"resetPassword"})
      if(result.code==200){
        this.$fire({title: "提示", text: "验证码发送成功", type: "success", timer: 1500})
        console.log(result,"result")
        this.codeInterval();
      }else{
        this.is_send=true
        this.$fire({title: "提示", text: "验证码发送失败", type: "question", timer: 1500})
      }
    },
    async onsubmit(){
      var repeat_data=this.repeat_data
      if(repeat_data.phone=="" || repeat_data.smscode=="" || repeat_data.password=="" || repeat_data.repeat_password==""){
        alert("请填写完整的信息!")
        return
        //判断手机
      }else if(!util.checkPhone(repeat_data.phone)){
        alert("请输入正确的手机号码!")
        return
        //验证码
      }else if(repeat_data.password !=repeat_data.repeat_password){
        alert("两次密码不一致！")
        return;
      }
      this.$Post("/view/user/updateOne",{smscode:repeat_data.smscode,phone:repeat_data.phone,password: repeat_data.password}).then(res=>{
        if(res.n==1){
          this.$fire({title: "提示", text: "密码重置成功", type: "success", timer: 1000})
          setTimeout(() => {
            this.$router.push('/user/login')
          },800)
        }else{
          alert("密码重置失败,验证码或者号码无效！")
        }
        console.log(res,"00000")
      })

    }
  }
}
</script>

<style scoped>
.login-form-cd-style2-form .single-field i.send {
  background:#b85a52;
  font-size: 15px;
  position: absolute;
  /* left: 290px; */
  left: unset;
  right: 10px;
  top: 15%;
  align-items: center;
  color: #fff;
  border-radius: 12px;
  border-right: 0px solid #eee;
}
</style>
