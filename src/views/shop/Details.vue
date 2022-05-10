<template>
  <body>
  <WebHeader></WebHeader>
  <div class="section1 tradeDetail_section1">
    <div class="banxin">
      <div class="detail-head-left">
        <div class="img-box">
          <img :src="details.picture"/>
        </div>
        <div>
          <h1>{{details.name}}</h1>
          <input type="hidden" id="project_type" value="2">
          <input type="hidden" id="project_name" value="校园闲鸭">
          <input type="hidden" id="order_id">
          <p>价格：<b>￥{{details.price}}</b></p>
          <p>购买后可在我的订单中下载源码</p>
          <div class="type-tags">
            <span v-if="details.platform_name=='网页'?true:false" class="type-cloudcode" title="网页" ></span>
            <span v-if="details.platform_name=='微信小程序'?true:false" class="type-webapp"  title="微信小程序" ></span>
            <span v-if="details.platform_name=='APP'?true:false" class="type-iphone "  title="APP" ></span>
            <ul style="position: relative;left: 10px;margin-top:5px">
            <li v-for="(item,index) in details.label">{{item}}</li>
          </ul>
          </div>
        </div>
      </div>
      <div class="detail-head-right">
        <button v-if="is_buy" class="btn btn-lg btn-addapp"  @click="download">下载</button>
        <button v-if="!is_buy" class="btn btn-lg btn-addapp"  @click="buy">购买</button>
      </div>
    </div>
  </div>
  <div class="section2 tradeDetail_section2">
    <div class="banxin">
      <div>
        <p class="title">项目介绍</p>
        <p v-html="details.project_introduce"></p>
      </div>
      <div>
        <p class="title">项目展示</p>
        <ul>
          <li v-for="(item,index) in details.project_display">
            <a class="preview" :href="item" target="_blank" title="项目截图展示"><img :src="item" /></a>
          </li>
        </ul>
      </div>
      <div v-if="details.project_experience">
        <p class="title">项目体验</p>
        <ol>
          <li>
            <span>{{details.platform_name}}：</span>
            <a class="preview_wechat" href="/uploads/attached/app/logo/20190905/58320ec1-d01c-d258-e650-5b9058e935b6.jpg"  target="_blank" title="小程序二维码">
              {{details.project_experience}}
              <img v-if="false" src="../../assets/picture/58320ec1-d01c-d258-e650-5b9058e935b6.jpg" alt="" />
            </a>
          </li>
        </ol>
      </div>
    </div>
  </div>
  <div class="section3 tradeDetail_section3">
    <div class="banxin" style="max-width: 1000px;">
      <div>
        <p>
          <img src="../../assets/picture/trade5.png" alt="" />
        </p>
        <ul>
          <li>创建帐号</li>
<!--          <li>浏览项目</li>-->
          <li>购买项目</li>
          <li>创建应用</li>
          <li>查看详情</li>
        </ul>
        <ul>
          <li>（注册Bmob帐号）</li>
<!--          <li>（查看项目列表）</li>-->
          <li>（在线购买对应项目）</li>
          <li>（完善应用相关配置）</li>
          <li>（下载源码/产品说明书）</li>
        </ul>
        <p style="height:30px"></p>
        <p>注意事项:</p>

        <p>1、官方已对源码进行了初步审核，有且仅保证项目可正常运行，但不保证个别功能的完善性等，购买后，均不支持退款;</p>
        <p>2、平台将依据来保障交易的安全及买卖双方的权益;</p>
        <p>3、非平台线上交易的项目,出现任何后果均与平台无关。</p>
      </div>
    </div>
  </div>
  <BottomNews></BottomNews>
  </body>
</template>
<script>
import ShopIndex from "./ShopIndex";
import BottomNews from "../../components/BottomNews";
import WebHeader from "../../components/WebHeader";
import WebBottom from "../../components/WebBottom";
const moment = require("moment")

export default {
  name: "Details",
  components: { BottomNews, WebHeader},
  data(){
    return{
      details:"",
      is_buy:false,
      shop_id:'',
      but_message:"购买",
      download_links:""
  }
  },
  methods:{
    download(){
      window.location.href = this.download_links
    },
    //插入一条数据
    insert_shop(shop_data){
      console.log(shop_data,"shop")
      this.$Get('/view/shoporder/insertOne',{shop_data}).then((res)=>{
        this.$fire({title: "提示", text: "购买成功", type: "success", timer: 3000})
        this.check_buy()
      })
    },
    async check_buy(){
      //判断是否登入
      var user=localStorage.getItem('user')
      if(!user){
        this.is_buy=false
        return
      }else{
        user=JSON.parse(localStorage.getItem('user'))
        //判断是否购买
        var own=user._id
        var result=await this.$Get('/view/shoporder/findOne',{own:own,shop:this.shop_id})
        console.log(result,"resu")
        if(result){
          this.is_buy=true
          this.download_links=result.shop.download_links
        }
      }

    },
    async buy(){
      //判断是否登入
      var user=localStorage.getItem('user')
      if(!user){
        this.$router.push('/user/login')
        return
      }else{
        user=JSON.parse(localStorage.getItem('user'))
      }
      var own=user._id
      var shop=this.details
      var shop_data={
        own:own,
        shop: shop.objectId,
        orderId:"",
        shop_name:shop.name,
        shopMoney:shop.price,
        payMoney:'',
        remarks:"普通购买"
      }
      //判断价格，如果价格为零，直接下载
      if(shop.price==0) {
        shop_data.payMoney = 0
        this.insert_shop(shop_data)
        return
      }
      //判断是否为vip
      var server_time=await this.$Get('/api/server_time')
      var user=await this.$Post('/view/user/findOne',{phone:user.phone})
      if(Date.parse(server_time)>Date.parse(moment(user.vipAt).format('YYYY-MM-DD HH:mm:ss'))){
        //不是vip会员
        this.$confirm("你还不是会员，是否开通会员？", "提示", "question")
          .then((r= boolean) => {
            this.$router.push('/user/vip')
          })
          .catch(() => {
            this.$router.push({name:'Pay',params: {type:"shopPay",shopPay_data:shop_data}})
            shop_data.payMoney=shop_data.shopMoney
            console.log(shop_data,"shop")
            //this.$alert(`取消会员操作，前往支付${shop_data.price}`);
            //插入订单数据
            //this.insert_shop(shop_data)
            //this.$fire({title: "提示", text: "非会员购买成功", type: "success", timer: 3000})
            console.log("OK not selected.");
          });
        return
      }
      //是会员，价格不为零，完整项目或者是模板
      if(this.details.is_complete==true){
        //是会员，完整项目
        if(user.vip_type==1){
          shop_data.payMoney=shop_data.shopMoney *0.9
          shop_data.remarks='月度会员，完整项目9折下载'
          alert("完整项目，月度会员,9折")
        }else if(user.vip_type==2){
          shop_data.payMoney=shop_data.shopMoney*0.7
          shop_data.remarks='年度会员，完整项目7折下载'
          alert("完整项目，年度会员，7折")
        }else if(user.vip_type==3){
          shop_data.payMoney=shop_data.shopMoney*0.5
          shop_data.remarks='三年会员，完整项目5折下载'
          alert("完整项目，三年会员,5折")
        }
        //this.$fire({title: "提示", text: "完整项目，员购买成功", type: "success", timer: 3000})
      }else{
        //是模板
        if(user.vip_type==1){
          shop_data.payMoney=shop_data.shopMoney*0.5
          shop_data.remarks='月度会员，模板5折下载'
          alert("模板，月度会员,5折")
        }else if(user.vip_type==2){
          shop_data.payMoney=shop_data.shopMoney*0.2
          shop_data.remarks='年度会员，模板2折下载'
          alert("模板，年度会员，2折")
        }else if(user.vip_type==3){
          shop_data.payMoney=shop_data.shopMoney*0.01
          shop_data.remarks='三年会员，模板0.1折下载'
          alert("模板，三年会员,0.1折")
        }

        //this.$fire({title: "提示", text: "模板，员购买成功", type: "success", timer: 3000})
      }
      this.$router.push({name:'Pay',params: {type:"shopPay",shopPay_data:shop_data}})
      //this.insert_shop(shop_data)
    }
  },
  created() {
    this.shop_id=this.$route.query.id
    var details={}
    this.$Get("/view/shop/findOne",{"id":this.$route.query.id}).then(res=>{
        details.objectId=res._id,
        details.name=res.shop_name,
        details.picture=res.picture,
        details.price=res.price,
        details.label=res.label,
        details.project_introduce=res.project_introduce,
        details.project_display=res.project_display,
        details.project_experience=res.project_experience,
        details.platform_name=res.platform_id.platform_name,
        details.is_complete=res.is_complete,
        this.details=details
    })
    //滚动了置顶
    window.scrollTo(0,0);
    this.check_buy()
  },

}
</script>

<style scoped>
.tradeDetail_section2 .banxin > div p:nth-of-type(2) {
  line-height: 28px;
  font-size: 16px;
  margin-bottom: 60px;
}

</style>
