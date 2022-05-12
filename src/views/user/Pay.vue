<template>
  <div   class="web_qrcode_area"  >
    <span class="web_qrcode_wrp">
        <!-- 默认 -->
      <div v-if="!payStatus" class="js_status js_wx_default_tip" >
          <div class="web_qrcode_tips"><i class="web_qrcode_tips_logo"></i>使用微信扫一扫支付</div>
          <div class="web_qrcode_app_wrp">
            「<strong class="web_qrcode_app">金额：{{payMoney}}元</strong>」
          </div>
        <canvas id="canvas"></canvas>
        <!--        <img class="web_qrcode_img" src="../assets/picture/48d9b9cc33ea4be196371d8fdca87b85.gif"/>-->
        </div>
      <!-- 扫码成功 -->
        <div v-if="payStatus"  class="js_status js_wx_after_scan">
          <i class="web_qrcode_msg_icon web_qrcode_msg_icon_success"></i>
          <h1 class="web_qrcode_msg_title">支付成功</h1>
          <p class="web_qrcode_msg_desc">{{btn}}秒后返回</p>
        </div>
      <!-- 取消登录 -->
        <div v-if="false"  class="js_status js_wx_after_cancel">
          <i class="web_qrcode_msg_icon web_qrcode_msg_icon_error"></i>
          <h1 class="web_qrcode_msg_title">你已取消此次支付</h1>
          <div class="web_qrcode_msg_opr">
            <a  class="weui-btn weui-btn_primary">重试</a>
          </div>
        </div>
      </span>
    <span class="weui-vertical-helper"></span>
  </div>
</template>
<script>
//导入socket
import io from 'socket.io-client'

//导入二维码库
import QRCode from "qrcode"
export default {
  name: 'Pay',
  data(){
    return{
      btn:6,//倒计时
      payStatus:false,
      payMoney:'',
      description:'',
      socket:''
    }
  },
  methods:{
    //支付成功后返回倒计时
    codeInterval() {
      const TIME_COUNT = 6;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.btn = this.count--
            if (this.count==0){
              this.$router.back()
            }
          } else {
            this.is_send=true
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    //生成socketId
    create_SocketId(){
      return new Promise((resolve,reject)=>{
        // 创建链接
        this.socket = io()
        this.socket.on("payStatus",data=>{
          if(data){
            this.payStatus=true
            this.codeInterval()
            console.log(data,"支付状态")
          }else{
            console.log("未支付")
          }
        })
        this.socket.on('socketId',socket_id=>{
          resolve(socket_id)
          this.server=socket_id
          console.log('我的socket_id是：'+socket_id)
        })
        //this.socket.connect();
      })
    },
    async useqrcode(){
      var payType=sessionStorage.getItem("payType")
      var result =await this.$Post('/api/pay/wechatpay',{payType:payType,payMoney:this.payMoney, description:this.description})
      if(result.status!=200){
        alert("请求失败，请刷新浏览器")
        return
      }
      //生成了订单号，然后写入数据
      this.create_order(result.order_id,this.socket_id)
      console.log(result,"result")
      let code_url=result.code_url
      let opts = {
        errorCorrectionLevel: "L",//容错级别
        type: "image/png",//生成的二维码类型
        quality: 0.3,//二维码质量
        margin: 1,//二维码留白边距
        width: 180,//宽
        height: 180,//高
        color: {
          dark: "#0e0d0d",//前景色
          light: "#fff"//背景色
        }
      };
      var canvas=document.getElementById("canvas")
      QRCode.toCanvas(canvas,code_url,opts,function(error){
        if(error){
          console.log(error)
        }else{
          console.log("success!")
        }
      });
    },
   async create_order(order_id){
      var socket_id=await this.create_SocketId()
     console.log(socket_id,"pppp")
      var payType=sessionStorage.getItem("payType")
      if(payType=="vipPay"){
        var params=JSON.parse(sessionStorage.getItem("vipPay_data"))
        params.orderId=order_id
        params.socketId=socket_id
        this.$Post('/api/pay/all_viporder',params)
      }else if(payType=="shopPay"){
        var params=JSON.parse(sessionStorage.getItem("shopPay_data"))
        params.orderId=order_id
        params.socketId=socket_id
        this.$Post('/api/pay/all_shoporder',params)
      }

    }
  },
  beforeDestroy(){
    console.log("离开了")
    //离开断开socket连接
    this.socket.disconnect()
  },
  mounted(){
    // 组件挂载的时候，调用生成二维码函数
     this.useqrcode()
  },

  created () {
    //判断是刷新页面还是路由跳转
    var parmas=this.$route.params
    if(Object.keys(parmas).length != 0){
      sessionStorage.setItem("payType",parmas.type)
      //路由跳转,判断商品跳转还是vip跳转
      if(parmas.type=="shopPay"){
        sessionStorage.setItem("shopPay_data",JSON.stringify(parmas.shopPay_data))
        this.payMoney=Number(parmas.shopPay_data.payMoney).toFixed(2)
        this.description=parmas.shopPay_data.shop_name
        //商品支付
        // console.log("商品支付")
      }else if(parmas.type=="vipPay"){
        //vip支付
        sessionStorage.setItem("vipPay_data",JSON.stringify(parmas.vipPay_data))
        this.payMoney=Number(parmas.vipPay_data.payMoney).toFixed(2)
        this.description=parmas.vipPay_data.remarks
        // console.log("vip支付")
      }

    }else{
      var payType=sessionStorage.getItem("payType")
      console.log(payType,"PPPP")
      if (payType=="shopPay"){
        this.payMoney=Number(JSON.parse(sessionStorage.getItem("shopPay_data")).payMoney).toFixed(2)
        this.description=JSON.parse(sessionStorage.getItem("shopPay_data")).shop_name
      }else if(payType=="vipPay"){
        this.payMoney=Number(JSON.parse(sessionStorage.getItem("vipPay_data")).payMoney).toFixed(2)
        this.description=JSON.parse(sessionStorage.getItem("vipPay_data")).remarks
      }else{
        alert("非法入口，出错")
      }
      // console.log("刷新或其他进入")
    }
  }
}
</script>

<style scoped>

.web_qrcode_area {
  height: 100%;
  text-align: center
}

.weui-vertical-helper {
  width: 0;
  height: 100%;
  overflow: hidden
}

.web_qrcode_wrp,.weui-vertical-helper {
  display: inline-block;
  vertical-align: middle
}

.web_qrcode_wrp {
  text-align: center;
  line-height: 1.4;
  min-width: 200px;
  max-width: 75%;
  color: #000;
  color: rgba(0,0,0,.9);
  margin-top:150px;
}

.web_qrcode_tips {
  margin-right: 10px;
  font-size: 17px;
  font-weight: 400;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center
}

.web_qrcode_tips_logo {
  display: inline-block;
  vertical-align: bottom;
  font-size: 24px;
  width: 1em;
  height: 1em;
  margin-right: 8px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='0 0 24 24'%3E  %3Cdefs%3E    %3Cpath id='0f20791c-6774-4e52-920f-6b6d8404b4dc-a' d='M6.724 0h10.552c2.338 0 3.186.243 4.04.7A4.766 4.766 0 0 1 23.3 2.684c.458.855.701 1.703.701 4.04v10.553c0 2.338-.243 3.186-.7 4.04a4.766 4.766 0 0 1-1.983 1.983c-.855.458-1.703.701-4.04.701H6.723c-2.338 0-3.186-.243-4.04-.7A4.766 4.766 0 0 1 .7 21.316c-.457-.854-.7-1.702-.7-4.039V6.723c0-2.338.243-3.186.7-4.04A4.766 4.766 0 0 1 2.684.7C3.538.243 4.386 0 6.723 0z'/%3E    %3ClinearGradient id='0f20791c-6774-4e52-920f-6b6d8404b4dc-b' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3E      %3Cstop offset='0%25' stop-color='%2302E36F'/%3E      %3Cstop offset='100%25' stop-color='%2305CD65'/%3E      %3Cstop offset='100%25' stop-color='%2307C160'/%3E    %3C/linearGradient%3E  %3C/defs%3E  %3Cg fill='none' fill-rule='evenodd'%3E    %3Cmask id='0f20791c-6774-4e52-920f-6b6d8404b4dc-c' fill='%23fff'%3E      %3Cuse xlink:href='%230f20791c-6774-4e52-920f-6b6d8404b4dc-a'/%3E    %3C/mask%3E    %3Cpath fill='url(%230f20791c-6774-4e52-920f-6b6d8404b4dc-b)' d='M0 0h24v24H0z' mask='url(%230f20791c-6774-4e52-920f-6b6d8404b4dc-c)'/%3E    %3Cpath fill='%23FFF' d='M19.095 17.63c1.141-.826 1.87-2.05 1.87-3.408 0-2.49-2.423-4.51-5.411-4.51-2.989 0-5.411 2.02-5.411 4.51 0 2.49 2.422 4.51 5.41 4.51.618 0 1.214-.089 1.767-.248a.543.543 0 0 1 .447.06l1.184.683c.033.02.065.034.104.034.1 0 .18-.08.18-.18 0-.045-.017-.09-.028-.132l-.244-.91a.36.36 0 0 1 .132-.409M13.75 13.5a.721.721 0 1 1 0-1.442.721.721 0 0 1 0 1.443M9.493 4.734c3.24 0 5.925 1.977 6.414 4.562a7.206 7.206 0 0 0-.353-.01c-3.27 0-5.922 2.21-5.922 4.936 0 .46.077.904.218 1.326a7.687 7.687 0 0 1-2.476-.288.651.651 0 0 0-.536.071l-1.421.82a.245.245 0 0 1-.125.041.216.216 0 0 1-.217-.216c0-.054.021-.107.035-.158l.292-1.092a.433.433 0 0 0-.159-.49C3.876 13.243 3 11.775 3 10.145c0-2.989 2.907-5.412 6.493-5.412zm7.865 7.323a.721.721 0 1 1 0 1.443.721.721 0 0 1 0-1.443zM7.328 7.548a.866.866 0 1 0 0 1.732.866.866 0 0 0 0-1.732zm4.33 0a.866.866 0 1 0 0 1.731.866.866 0 0 0 0-1.73z' mask='url(%230f20791c-6774-4e52-920f-6b6d8404b4dc-c)'/%3E  %3C/g%3E%3C/svg%3E")
}

.web_qrcode_app_wrp {
  font-size: 22px;
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 500;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  letter-spacing: 1px
}

.web_qrcode_app {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  max-width: 10em
}

.web_qrcode_img {
  width: 200px;
  height: 200px;
  border-radius: 4px
}

.web_qrcode_msg_title {
  font-size: 22px;
  font-weight: 500;
  margin-top: 24px;
  letter-spacing: 1px
}

.web_qrcode_msg_desc {
  font-size: 16px;
  margin-top: 8px
}

.web_qrcode_msg_opr {
  margin-top: 24px
}

.web_qrcode_msg_icon {
  display: inline-block;
  vertical-align: bottom;
  font-size: 10px;
  width: 9.6em;
  height: 9.6em;
  background-size: cover;
  background-repeat: no-repeat
}

.web_qrcode_msg_icon_success {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E  %3Cpath fill='%2307C160' fill-rule='evenodd' d='M48 8c22.091 0 40 17.909 40 40S70.091 88 48 88 8 70.091 8 48 25.909 8 48 8zm17.691 26.16L43.294 56.557 32.23 45.494 28 49.724l12.475 12.484.16.152a4 4 0 0 0 5.497-.15l23.81-23.8-4.251-4.25z'/%3E%3C/svg%3E")
}

.web_qrcode_msg_icon_error {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E  %3Cpath fill='%23FA5151' fill-rule='evenodd' d='M48 8c22.091 0 40 17.909 40 40S70.091 88 48 88 8 70.091 8 48 25.909 8 48 8zm0 4.8c-19.44 0-35.2 15.76-35.2 35.2 0 19.44 15.76 35.2 35.2 35.2 19.44 0 35.2-15.76 35.2-35.2 0-19.44-15.76-35.2-35.2-35.2zm0 48.813c1.904 0 3.34 1.436 3.34 3.34 0 1.875-1.436 3.34-3.34 3.34a3.302 3.302 0 0 1-3.34-3.34c0-1.904 1.465-3.34 3.34-3.34zm2.637-35.888l-.352 28.242h-4.57l-.352-28.242h5.274z'/%3E%3C/svg%3E")
}

@media (prefers-color-scheme:dark) {
  .web_qrcode_type_page_self {
    background: #191919
  }

  .web_qrcode_wrp {
    color: #fff;
    color: hsla(0,0%,100%,.8)
  }
}
.weui-btn_primary {
  background-color: #07c160;

}
.weui-btn {
  position: relative;
  display: block;
  width: 184px;
  margin-left: auto;
  margin-right: auto;
  padding: 8px 24px;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 17px;
  text-align: center;
  text-decoration: none;
  color: #fff;
  line-height: 1.88235294;
  border-radius: 8px;
  -webkit-tap-highlight-color: rgba(0,0,0,0)
}

.weui-btn:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.1);
  border-radius: 8px
}

</style>
