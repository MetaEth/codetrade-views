// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'



import "./assets/css/global.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/bootstrap-icons.css";
import "./assets/css/base.css";
import "./assets/css/transaction.css";
import "./assets/css/style.css";
//使用vue-alert插件
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert, { reverseButtons: true });
//定义全局Get and Post
import {post, get} from './utils/request'
// 定义全局变量
Vue.prototype.$Post = post
Vue.prototype.$Get = get
Vue.config.productionTip = false
// 定义一个EventBus进行兄弟间组件通讯
Vue.prototype.$bus=new Vue()

//定义一个全局的cosket io
import {io} from "socket.io-client"
Vue.prototype.$Io=io
/*设置路由拦截*/
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    var token = localStorage.getItem('token')
    if(token){
      //判断token是否过期
      get('/api/getUserInfo').then(res=>{
        if(res.code==400){
          //登入过期
          next({
            path: '/user/login',
            //query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          console.log(res,"登入过期")
        }else if(res.code==200){
          next();
        }
      })

    }else{
      console.log("不存在token")
      next({
        path: '/user/login'
      })
    }
    // if (store.state.token) {  // 通过vuex state获取当前的token是否存在
    //   next();
    // }
    // else {
    //   next({
    //     path: '/login',
    //     query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
    //   })
    // }
  }
  else {
    next();
  }
})


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data:{
    hello:"ppp"
  },
  created () {
  },

})



