import axios from 'axios';
import {reject} from "eslint-plugin-promise/rules/lib/promise-statics";
axios.defaults.timeout = 7000;
axios.defaults.baseURL ='http://localhost:8080';
//axios.defaults.baseURL ='http://101.33.227.29';

//http request 拦截器
axios.interceptors.request.use(
  config => {
    //config.data = JSON.stringify(config.data);
    const token = localStorage.getItem('token')
    config.headers={
      "Content-Type":"application/json",
      "Authorization" :`${token}`
    },
    // if(token){
    //
    // }
    console.log("请求拦截器");
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    /*
    if(response.data.errCode ==2){
      router.push({
        path:"/login",
        querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
    */
    //console.log(response,"响应拦截器");
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)
export function get(url,params){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}
export function post(url,params){
  return new Promise((resolve,reject) => {
    axios.post(url,params)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}
