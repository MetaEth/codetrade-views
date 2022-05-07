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



