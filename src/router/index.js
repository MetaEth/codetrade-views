import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//避免了到当前位置的冗余导航
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/Index',
      meta: {
        keepAlive: true //设置页面是否需要使用缓存
      },
    },
    {
      path: '/index',
      name: 'Index',
      component: () => import('../views/Index'),
      meta: {
        keepAlive: true //设置页面是否需要使用缓存
      },
    },
    {
      path:'/shop',
      name:'ShopIndex',
      component:()=>import('../views/shop/ShopIndex'),
      children:[
        {
          path:'details',
          name:'Details',
          component:()=>import('../views/shop/Details')
        },

      ]
    },
    {
      path:'/user',
      name:'UserIndex',
      component:()=>import('../views/user/UserIndex'),
      children:[
        {
          path:'login',
          name:'Login',
          component:()=>import('../views/user/Login')
        },
        {
          path:'register',
          name:'Register',
          component:()=>import('../views/user/Register')
        },
        {
          path:'resetpassword',
          name:'ResetPassword',
          component:()=>import('../views/user/ResetPassword')
        },
        {
          path: 'details',
          name: 'Details',
          component:()=>import('../views/user/Details')
        },
        {
          path: 'order',
          name: 'Order',
          component:()=>import('../views/user/Order')
        },
        {
          path: 'vip',
          name:'Vip',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component:()=>import('../views/user/Vip')
        }
      ]
    }
  ],
  beforeEach:((to, from, next) => {
  console.log("++++++++++1111111111111")
})

})

