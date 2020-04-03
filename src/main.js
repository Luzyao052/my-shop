import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
// 这是注册全局请求的方法
// import request from '@/utils/request';
// Vue.use(request)
const app = new Vue({
  ...App
})
app.$mount()
