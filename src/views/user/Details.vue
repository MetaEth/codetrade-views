<template>
  <div class="bodyk">
    <div v-if="user" class="main-right container">
      <div class="box-sh  mt  order-table">
        <form class="form-horizontal" id="user-form" role="form" action="/account/index" onsubmit="return account.validateAll()" method="post">
          <div class="form-group">
            <label class="col-sm-2 control-label nopd  col-lg-1 mt8">用户名称：</label>
            <div class="col-sm-10 col-lg-5">
              <input type="text" class="form-control" v-model="user.username" disabled>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label nopd  col-lg-1 mt8">手机号码：</label>
            <div class="col-sm-10 col-lg-5">
              <input type="text" class="form-control" value="15918711236" disabled>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label nopd  col-lg-1 mt8">余额：</label>
            <div class="col-sm-10 col-lg-5">
              <input type="text" class="form-control" v-model="user.money"  disabled>
            </div>
          </div>
          <div v-if="user.vipAt !='否' " class="form-group">
            <label class="col-sm-2 control-label nopd  col-lg-1 mt8">vip类型：</label>
            <div class="col-sm-10 col-lg-5">
              <input type="text" class="form-control" v-model="user.vip_type"  disabled>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label nopd  col-lg-1 mt8">是否vip：</label>
            <div class="col-sm-10 col-lg-5" style="position:relative;">

              <input type="text" class="form-control" v-model="user.vipAt" disabled>
              <button type="button" class="btn btn-link" style="position:absolute;right:20px;top:8px;">
                <a href="/user/vip">开通</a>

              </button>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label nopd  col-lg-1 mt8">创建时间：</label>
            <div class="col-sm-10 col-lg-5">
              <input type="text" class="form-control" v-model="user.createdAt" disabled>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-offset-1 col-sm-10 col-lg-5">
              <button type="submit" class="btn bg-blue save-btn">保存</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
const moment = require("moment")
export default {
  name: 'Details',
  data(){
    return{
      user:null,
      shopOrder:[]
    }
  },
  methods:{
    swith_tab (event) {
      this.current_tab = event.index
    },
    async get_user(){
      //this.user=JSON.parse(localStorage.getItem("user"))
      //服务器时间戳
      var server_time=await this.$Get('/api/server_time')
      var user=await this.$Post('/view/user/findOne',{phone:JSON.parse(localStorage.getItem("user")).phone})
      user.createdAt=moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss');
      user.vipAt=moment(user.vipAt).format('YYYY-MM-DD HH:mm:ss');
      //不是vip
      if(Date.parse(server_time)>Date.parse(user.vipAt)){
        user.vipAt="否"
      }else{
        if(user.vip_type==1){
          user.vip_type="月度会员"
          user.vipAt="Vip到期时间："+user.vipAt
        }else if(user.vip_type==2){
          user.vip_type="年度会员"
          user.vipAt="Vip到期时间："+user.vipAt
        }else if(user.vip_type==3){
          user.vip_type="三年会员"
          user.vipAt="Vip到期时间："+user.vipAt
        }
      }
      this.user=user
    },

  },
  created () {
    this.$bus.$emit("userChoose",true);
    this.get_user()
  }
}
</script>
<style scoped src="../../assets/css/kk.css">

</style>



