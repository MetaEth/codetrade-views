
<template>

  <div class="bodyk main-right container">
    <div class="box-sh  mt  order-table">
      <div class="main-right-bottom  ">
        <div class="table-responsive">
          <table class="table table-hover table-bordered">
            <tbody>
            <tr class="active">
              <td>订单编号</td>
              <td>订单标题</td>
              <td>商品价格</td>
              <td>支付价格</td>
              <td>状态</td>
              <td>备注</td>
              <td>支付时间</td>
              <td>操作</td></tr>
            <tr v-for="(item,index) in shopOrder">
              <td>{{item.orderId}}</td>
              <td>{{item.shopName}}</td>
              <td>{{item.shopMoney}}</td>
              <td>{{item.payMoney}}</td>
              <td>{{item.status}}</td>
              <td>{{item.remarks}}</td>
              <td>{{item.createdAt}}</td>
              <td @click="download(item.download_links)"><a>下载</a></td>
            </tr>

            </tbody>
          </table>

        </div>
      </div>
      <div v-if="shopOrder.length==0" style="text-align: center;color: #828282"><span>暂无订单</span></div>

    </div>

  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Order',
  data(){
    return{
      shopOrder:[]
    }
  },
  methods:{
    download(event){
      window.location.href = event
    },
    //获取订单
    get_order(){
      var id=JSON.parse(localStorage.getItem("user"))._id
      this.$Get('/view/shoporder/find',{id:id}).then((res)=>{
        var shopOrder=[]
        for(var i=0;i<res.length;i++){
          shopOrder.push({
            orderId:res[i].orderId,
            shopName:res[i].shop.shop_name,
            shopMoney:res[i].shopMoney,
            payMoney:res[i].payMoney,
            download_links:res[i].shop.download_links,
            status:res[i].status,
            remarks:res[i].remarks,
            createdAt:moment(res[i].createdAt).format('YYYY-MM-DD HH:mm:ss')
          })
        }
        this.shopOrder=shopOrder
      })
    }
  },
  created () {
    this.$bus.$emit("userChoose",true);
    this.get_order()
  }
}
</script>


<style scoped src="../../assets/css/kk.css">

</style>
