<template>
    <div>
      <div class="section1">
        <div>
          <h1>闲鸭源码市场，精选优质模板，网站代售服务！</h1>
          <p>闲鸭qq交流群：1114221010</p>
        </div>
      </div>
      <div class="section2">
        <div class="banxin">
          <div class="rows">
            <div class="beta_img"><img src="../../assets/picture/beta.jpg" alt=""></div>
            <label>源码类型：</label>
            <ul>
              <li @click="swichTab({index:index,swich_type:'code_type',codetype_id:item.id})"  v-for="(item,index) in code_type" v-bind:class="code_currentTab==index?'on':''">
                <a >{{item.codetype_name}}</a>
              </li>

            </ul>
          </div>
          <div class="rows ">
            <label>平台：</label>
            <ul>
              <li @click="swichTab({index:index,swich_type:'platform_type',platform_id:item.id})" v-for="(item,index) in platform_type" v-bind:class="platform_currentTab==index?'on':''">
                <a>{{item.platform_name}}</a>
              </li>
            </ul>
          </div>


          <div class="rows ">
            <label>类型：</label>
            <ul>
              <li @click="swichTab({index:index,swich_type:'type',type_id:item.id})" v-for="(item,index) in type" v-bind:class="type_currentTab==index?'on':''" >
                <a>{{item.type_name}}</a>
              </li>
            </ul>
          </div>
          <div class="rows">
            <label>价格：</label>
            <ul>
              <li @click="swichTab({index:index,swich_type:'price_type',number:item.number})"  v-for="(item,index) in price_type" v-bind:class="price_currentTab==index?'on':''">
                <a>{{item.price_name}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div  class="section3">
        <div class="banxin">
          <ul>
            <li v-for="(item, index) in shop">
              <router-link :to="{path:'/shop/details',query:{id:item.objectId}}">
                <a>
                  <div  class="box">

                    <div class="box-left">
                      <img :src="item.picture" alt="">
                    </div>
                    <div class="box-right">
                      <h6>{{item.name}}</h6>
                      <p>价格：<b>￥{{item.price}}</b></p>
                    </div>
                  </div>
                  <div class="type-tags" style="position:relative">
                    <span v-if="item.platform_name=='网页'?true:false"><img style="margin-top:5px;" src="../../assets/images/html.png"></span>
                    <span v-else-if="item.platform_name=='微信小程序'?true:false"><img style="margin-top: 5px;" src="../../assets/images/miniproject.png"></span>
                    <span v-else-if="item.platform_name=='APP'?true:false"><img style="margin-top: 5px;" src="../../assets/images/app.png"></span>
                    <span v-else-if="item.platform_name=='其他'?true:false"><img style="margin-top: 5px;" src="../../assets/images/others.png"></span>
                    <ul style="margin-top:5px">
                      <li v-for="(item, index) in item.label">{{item}}</li>
                    </ul>
                  </div>
                </a>
              </router-link>
            </li>
          </ul>
        </div>
        <button class="banxin load-more" id="loading">
          已加载全部数据
        </button>
      </div>
    </div>

</template>
<script>
export default {
  name: "Data",
  data(){
    return {
      platform_currentTab:0,
      type_currentTab:0,
      price_currentTab:0,
      code_currentTab:0,
      code_type:[],
      price_type:[
        {price_name:"不限", number:null},
        {price_name:"免费", number:"0"},
        {price_name:"＜50元", number:"50"},
        {price_name:"＜100元", number:"100"},
        {price_name:"＜250元", number:"250"},
        {price_name:"＜2000元", number:"2000"}],
      platform_type:[],
      type:[],
      shop:[],
      params:{
        codetype_id:null,
        platform_id:null,
        type_id:null,
        price:null,
        skip:0
      },
      is_scroll:false
    }
  },
  methods:{
    //得到codetype
    get_codetype(){
      this.$Get('/view/codetype/find').then(res=>{
        var code_type=[]
        for(var i=0;i<res.length;i++){
          code_type.push({
            id:res[i]._id,
            codetype_name:res[i].codetype
          })
        }
        console.log(code_type,"code_type")
        this.code_type=code_type

      })
    },
    //得到platform_typ
    get_platform_type(){
      this.$Get("/view/platform/find").then(res=>{
        var platform_type=[]
        for(var i=0;i<res.length;i++){
          platform_type.push({
            id:res[i]._id,
            platform_name:res[i].platform_name
          })
        }
        console.log(platform_type,"platform_type")
        this.platform_type=platform_type
      })
    },
    //得到type
    get_type(){
      this.$Get("/view/type/find").then(res=>{
        var type=[]
        for(var i=0;i<res.length;i++){
          type.push({
            id:res[i]._id,
            type_name:res[i].type_name
          })
        }
        console.log(type,"type")
        this.type=type
        //this.$cookie.set("type",JSON.stringify(type))
      })
    },
    //得到shop
    get_shop(){
      var params=this.params
      this.is_scroll=false
      this.$Get("/view/shop/find",params).then(res=>{
        var shop=[]
        for(let object of res){
          shop.push({
            objectId:object._id,
            name:object.shop_name,
            picture:object.picture,
            price:object.price.toFixed(2),
            label:object.label,
            project_introduce:object.project_introduce,
            project_display:object.project_display,
            project_experience:object.project_experience,
            platform_name:object.platform_id.platform_name
          })
        }
        if(shop.length>0){
          this.is_scroll= true
          this.shop=this.shop.concat(shop)
          this.params.skip=this.params.skip+shop.length
        }else{
          this.is_scroll= false
          console.log("没有数据")
        }
      })
    },
    swichTab(event){
      this.params.skip=0
      this.shop=[]
      if(event.swich_type=="type"){
        if(event.index==0){
          this.params.type_id=null
        }else{
          this.params.type_id=event.type_id
        }
        this.type_currentTab=event.index
      }else if(event.swich_type=="platform_type"){
        if(event.index==0){
          this.params.platform_id=null
        }else{
          this.params.platform_id=event.platform_id
        }
        this.platform_currentTab=event.index
      }else if(event.swich_type=="price_type"){
        if(event.index==0){
          this.params.price=null
        }else{
          this.params.price=JSON.stringify({$lte:Number(event.number)})
        }
        this.price_currentTab=event.index
      }else if(event.swich_type=="code_type"){
        if(event.index==0){
          this.params.codetype_id=null
        }else{
          this.params.codetype_id=event.codetype_id
        }
        this.code_currentTab=event.index
      }
      this.get_shop()
    },
    //判断cookie是否存在，不存在请求数据

    //刷新数据
    pageScroll(){
      // 获取滚动的距离
      let scrollTop=document.documentElement.scrollTop;
      // 获取滚动的高度（获取整个html的高度）
      let scrollHeight=document.documentElement.scrollHeight;
      // 获取屏幕(浏览器)高度
      let clienHeight=document.documentElement.clientHeight;
      // 滚动的距离 + 屏幕高度 - 内容高度 >= 0 表示滚动到底部了      (下拉加载判断条件)
      //console.log(scrollTop,scrollHeight,clienHeight)
      //console.log(scrollTop+clienHeight-scrollHeight,"88")
      if(scrollTop+clienHeight-scrollHeight >=-700 && this.is_scroll){
        this.get_shop()
        console.log("刷新数据-------------------------");
        //this.offset++;
        //滚动至底部后请求数据

      }
    },
    async test(){
      var result=await this.$Get('/api/getUserInfo')
      console.log(result,"result1111111111")
      if(result.status===400){
        console.log(result,"result")
      }
    }
  },
  activated() {
    this.test()
    // 页面每次进入将手机动态验证码置为空
    console.log("))))))))0000000")

  },
  created(){
    this.get_codetype()
    this.get_platform_type()
    this.get_type()
    this.get_shop()
    console.log("created")
  },

  mounted(){
    // 监听页面滚动
    console.log("mounted")
    window.onscroll=this.pageScroll
  },

}

</script>

<style scoped>

.section1 h1 {
  font-size: 2.6rem;
  color: #fff;
  text-align: center;
  margin: 0;
  margin-bottom: 26px;
}
.section1 p {
  font-size: 2.0rem;
  color: #fff;
  text-align: center;
  margin: 0;
}
</style>
