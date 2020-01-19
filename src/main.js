import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'assets/css/base.css'
import axios from 'axios'

//导入Nprogress对应的js和css
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//配置请求根路径
axios.defaults.baseURL="http://192.168.1.5:8080/api";
//配置请求拦截器
axios.interceptors.request.use(config=>{
  Nprogress.start();
  config.headers.Authorization=window.sessionStorage.getItem("token");
  return config;
})
//配置请求拦截器
axios.interceptors.response.use(config=>{
  Nprogress.done();
  return config;
})
Vue.prototype.$http=axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
