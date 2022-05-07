<template>
  <div>
    <div class="vipcontm minwd">
      <div class="wrap">
        <div class="smtitle">VIP服务选择</div>
        <div class="wpd">
          <div class="main clearfix" >
            <dl @click="cls({price:48.00,price_index:0})" v-bind:class="price_class==0? `zprt zpt1 on `:'zprt zpt1'" data-beshared="4">
              <dt>
                <span><b>月度会员</b></span>
                <span>
                            <b><strong>48.00元</strong>/月</b>
                            <i>原价：88元</i>
                        </span>
                <ins>立即开通</ins>
              </dt>
              <dd>
                <b>·</b><i>会员有效期30天</i>
              </dd>
              <dd>
                <b>·</b><i>模板专区下载享受5折优惠</i>
              </dd>
              <dd style="color: red;">
                <b>·</b><i>完整项目专区下载享受9折优惠</i>
              </dd>
              <dd style="color: red;">
                <!--                <b>·</b><i>赠送云瑶网100书币</i>-->
              </dd>
              <dd>
                <i>&nbsp;&nbsp;&nbsp;&nbsp;*VIP会员仅限VIP专区内使用*&nbsp;&nbsp;&nbsp;&nbsp;</i>
              </dd>
              <em><img src="../../assets/picture/szs1.png"></em>
            </dl>
            <dl @click="cls({price:98.00,price_index:1})" v-bind:class="price_class==1?'zprt zpt2 on':'zprt zpt2'"  data-beshared="10">
              <dt>
                <span><b>年度会员</b></span>
                <span>
                            <b><strong>98.00元</strong>/年</b>
                            <i>原价：298元</i>
                        </span>
                <ins>立即开通</ins>
              </dt>
              <dd>
                <b>·</b><i>会员有效期365天</i>
              </dd>
              <dd>
                <b>·</b><i>模板专区下载享受2折优惠</i>
              </dd>
              <dd style="color: red;">
                <b>·</b><i>完整项目专区下载享受7折优惠</i>
              </dd>
              <dd style="color: red;">
                <!--                <b>·</b><i>赠送云瑶网200书币</i>-->
              </dd>
              <dd>
                <i>&nbsp;&nbsp;&nbsp;&nbsp;*VIP会员仅限VIP专区内使用*&nbsp;&nbsp;&nbsp;&nbsp;</i>
              </dd>
              <!---->
              <em><img src="../../assets/picture/szs2.png"></em>
            </dl>
            <dl @click="cls({price:198.00,price_index:2})" v-bind:class="price_class==2?'zprt zpt3 on':'zprt zpt3'" data-beshared="30">
              <dt>
                <span><b>三年会员</b></span>
                <span>
                            <b><strong>198.00元</strong>/终身</b>
                            <i>原价：698元</i>
                        </span>
                <ins>立即开通</ins>
              </dt>
              <dd>
                <b>·</b><i>会员有效期1098天</i>
              </dd>
              <dd>
                <b>·</b><i>模板专区下载享受0.1折优惠</i>
              </dd>
              <dd style="color: red;">
                <b>·</b><i>完整项目专区下载享受5折优惠</i>
              </dd>
              <dd style="color: red;">
                <!--                <b>·</b><i>赠送云瑶网500书币</i>-->
              </dd>
              <dd>
                <i>&nbsp;&nbsp;&nbsp;&nbsp;*VIP会员仅限VIP专区内使用*&nbsp;&nbsp;&nbsp;&nbsp;</i>
              </dd>

              <em><img src="../../assets/picture/szs3.png"></em>
            </dl>
          </div>
          <div class="viprice">
            <span>应付金额：<b id="shouldPayMoneyId">{{price}}</b></span>

          </div>
          <div class="btn">
            <a @click="pay_btn({pay_index:0})" v-bind:class="pay_class==0?'wx on':'wx'" data-value="31" rel="nofollow">微信支付</a>
            <a @click="pay_btn({pay_index:1})" v-bind:class="pay_class==1?'zfb on':'zfb'" data-value="27" rel="nofollow">支付宝支付</a></div>
            <div @click="submitbtn" class="submitbtn">
              <input type="submit" name="dosubmit" id="dosubmit" class="webtn" value="确认提交" />
            </div>
        </div>
      </div>
    </div>
    <div class="cztips">
      <div class="wrap">
        <div class="smtitle">服务说明</div>
        <ul>
          <li><i>1、</i><span>VIP会员可享受打折优惠下载，根据会员等级可在有效期内下载资源并享受相对应的优惠；</span></li>
          <li>
            <i>2、</i>
            <span>一旦申请VIP会员不予退还或者退换；</span>
          </li>
          <li><i>3、</i><span>开通VIP会员后，即时生效，到期时间按照您的开通日顺延，可到账户中心查看到期时间；</span></li>
          <li><i>4、</i><span>VIP会员到期以后自动失效，请在有效期内使用。</span></li>
          <li><i>5、</i><span>充值成功后，若使用中出现问题，可通过闲鸭QQ交流群联系站长。</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Vip',
  data(){
    return{
      price_class:0,
      pay_class:0,
      price:'48.00',
    }
  },
  methods:{
    pay_btn(e){
      this.pay_class=e.pay_index
    },
    cls(e){
      this.price_class=e.price_index
      this.price=e.price.toFixed(2)
    },
    async submitbtn(){
      var phone=JSON.parse(localStorage.getItem('user')).phone
      var user=await this.$Post('/view/user/findOne',{phone:phone})
      var vipAtTimestamp=Date.parse(user.vipAt)
      var serverTimestamp=Date.parse(await this.$Get('/api/server_time'))
      console.log(vipAtTimestamp,serverTimestamp)
      var params={
        own:JSON.parse(localStorage.getItem('user'))._id,
        orderId:'',
        payMoney:this.price,
        vip_type:'',
        vipAt:'',
        remarks:''
      }
      var price_type=this.price_class
      var pay_type=this.pay_class
      if(price_type==0){
        params.vip_type=1
        params.remarks="月度会员"
        params.vipAt=new Date((vipAtTimestamp>serverTimestamp?vipAtTimestamp:serverTimestamp)+30 * 24 * 60 * 60 * 1000)  //30天
      }else if(price_type==1){
        params.vip_type=2
        params.remarks="年度会员"
        params.vipAt=new Date((vipAtTimestamp>serverTimestamp?vipAtTimestamp:serverTimestamp)+365 * 24 * 60 * 60 * 1000) //一年
      }else if(price_type==2){
        params.vip_type=3
        params.remarks="三年会员"
        params.vipAt=new Date((vipAtTimestamp>serverTimestamp?vipAtTimestamp:serverTimestamp)+1098 * 24 * 60 * 60 * 1000) //十年
      }
      console.log(params,"pa")
      if(pay_type==0){
        this.$router.push({name:'Pay',params: {type:"vipPay",vipPay_data:params}})
        console.log("微信支付")
      }else if(pay_type==1){
        console.log("支付宝支付")
      }

      // var result =await this.$Post('/api/pay',params)
      // if(result.status==200){
      //   this.$fire({title: "提示", text: "购买成功", type: "success", timer: 3000})
      // }

    }
  }
}
</script>





<style scoped>
body {
  margin: 0;
  padding: 0;
  font-size: 16px;
  color: #191919;
  font-weight: normal;
  font-style: normal;
  background: #E6E6E6;
  font-family: 'Roboto', sans-serif;
}
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  font-family: "Microsoft YaHei", "Helvetica neue", Arial;
  vertical-align: baseline;
  outline: none;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}


nav, footer, section, header, article {
  display: block;
}

i, em, ins, u {
  font-style: normal;
  text-decoration: none
}

*:focus {
  outline: none
}

.wrap {
  margin: 0 auto;
  width: 1200px;
}

.minwd {
  min-width: 1200px;
}

.none {
  display: none
}

.fl {
  float: left
}

.fr {
  float: right
}

.clearfix {
  *zoom: 1;
}

.clearfix:before, .clearfix:after {
  display: table;
  content: "";
  line-height: 0;
}

.clearfix:after {
  clear: both;
}

/*******公共样式结束*********/

@media (min-width: 1601px) {
  .wrap {
    width: 1600px;
  }

  .minwd {
    min-width: 1600px;
  }

}




.vipcontm {
  padding: 80px 0 30px;
  background: #fff;
}

.vipcontm .wpd {
  width: 1200px;
  margin: 0 auto
}

.vipcontm .smtitle {
  text-align: center;
  font-size: 26px;
  color: #010101;
  line-height: 50px;
  font-weight: bold;
  background: url(../../assets/images/tlebgs.png) no-repeat center;
}

.vipcontm .main {
  padding-top: 45px;
}

.vipcontm .main dl {
  float: left;
  margin: 0 45px;
  height: 430px;
  width: 300px;
  border: 1px solid transparent;
  box-shadow: 0 0 15px rgba(0, 0, 0, .1);
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.vipcontm .main dl em {
  display: none;
  position: absolute;
  bottom: -2px;
  right: -2px;
}

.vipcontm .main dl em img {
  display: block;
}

.vipcontm .main dt {
  color: #fff;
  height: 205px;
  padding-top: 25px;
  padding-left: 22px;
  position: relative;
}

.vipcontm .main dt span {
  display: block;
  padding: 2px 0;
}

.vipcontm .main dt span b {
  font-size: 22px;
  font-weight: bold;
}

.vipcontm .main dt span i {
  font-size: 13px;
  text-decoration: line-through;
  margin-left: 30px;
}

.vipcontm .main dt ins {
  display: block;
  color: #fff;
  text-align: center;
  height: 40px;
  right: -1px;
  top: 132px;
  width: 110px;
  line-height: 40px;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  padding-left: 5px;
  font-size: 15px;
  position: absolute;
}

.vipcontm .main dl.on em {
  display: block;
}

.vipcontm .main .zpt1.on {
  border-color: #49b3fe;
}

.vipcontm .main .zpt1 {
  background: url(../../assets/images/czptbg1.png) no-repeat top center;
}

.vipcontm .main .zpt1 dt ins {
  background: #49b3fe;
  box-shadow: 0 0 18px rgba(73, 179, 254, .3);
}

.vipcontm .main .zpt2.on {
  border-color: #fcc628;
}

.vipcontm .main .zpt2 {
  background: url(../../assets/images/czptbg2.png) no-repeat top center;
}

.vipcontm .main .zpt2 dt ins {
  background: #fcc628;
  box-shadow: 0 0 18px rgba(252, 198, 40, .3);
}

.vipcontm .main .zpt3.on {
  border-color: #ff7894;
}

.vipcontm .main .zpt3 {
  background: url(../../assets/images/czptbg3.png) no-repeat top center;
}

.vipcontm .main .zpt3 dt ins {
  background: #ff7894;
  box-shadow: 0 0 18px rgba(255, 120, 148, .3);
}

.vipcontm .main .zpt4.on {
  border-color: #ff6888;
}

.vipcontm .main .zpt4 dt {
  background: url(../../assets/images/jbsg4.png) repeat-x;
}

.vipcontm .main dd {
  padding-left: 35px;
  font-size: 15px;
  color: #696969;
  line-height: 35px;
}

.vipcontm .main dd b {
  font-weight: bold;
  font-size: 18px;
  margin-right: 10px;
}

.vipcontm .main dd img {
  width: 300px;
  height: 40px;
  position: absolute;
  bottom: 0;
  left: 0;
}

.vipcontm .viprice {
  padding: 40px 0 35px;
  text-align: center;
  color: #333333;
  font-size: 16px;
}

.vipcontm .viprice i {
  display: block;
  padding-bottom: 10px;
  font-size: 16px;
  color: #000;
}

.vipcontm .viprice span {
  display: block
}

.vipcontm .viprice b {
  font-weight: bold;
  color: #10bfa4;
  font-size: 18px;
}

.vipcontm .btn {
  text-align: center;
  font-size: 16px;
  width: 100%;
}

.vipcontm .btn a {
  display: inline-block;
  width: 200px;
  padding-left: 42px;
  height: 44px;
  line-height: 44px;
  color: #fff;
  margin: 0 20px;
  position: relative;
  border: 1px solid #ddd;
}

.vipcontm .btn a:after {
  display: none;
  width: 19px;
  height: 19px;
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
}

.vipcontm .btn a.wx {
  background: url(../../assets/images/zficosm1.png) no-repeat 46px center;
  color: #19b81d
}

.vipcontm .btn a.zfb {
  background: url(../../assets/images/zficosm2.png) no-repeat 38px center;
  color: #1aa1e6
}

.vipcontm .btn a.wx:after {
  background: url(../../assets/images/02_03.png) no-repeat center
}

.vipcontm .btn a.zfb:after {
  background: url(../../assets/images/01_05.png) no-repeat center
}

.vipcontm .btn a.wx.on {
  border-color: #19b81d
}

.vipcontm .btn a.zfb.on {
  border-color: #1aa1e6
}

.vipcontm .btn a.on:after {
  display: block
}

.vipcontm .submitbtn {
  padding-top: 30px
}

.vipcontm .submitbtn .webtn {
  width: 230px;
  line-height: 46px;
  height: 46px;
  background: #28dec2;
  color: #fff;
  cursor: pointer;
  border: none;
  margin: 0 auto;
  display: block;
  font-size: 15px
}


.cztips {
  font-size: 14px;
  color: #000;
  line-height: 30px;
  background: #f9f9f9;
  padding: 45px 0;
}

.cztips .wrap {
  width: 1200px
}

.cztips .smtitle {
  text-align: center;
  font-size: 26px;
  color: #010101;
  line-height: 50px;
  font-weight: bold;
  background: url(../../assets/images/tlebgs2.png) no-repeat center;
}

.cztips ul {
  padding-top: 40px;
  padding-left: 220px;
}

.cztips li {
  overflow: hidden;
  padding: 5px 0;
}

.cztips li i {
  display: block;
  float: left;
}

.cztips li span {
  display: block;
  overflow: hidden;
}

.cztips li ins {
  display: block;
}



</style>

