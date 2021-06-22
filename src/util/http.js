import axios from 'axios'
import { Toast } from 'vant'
import Vue from 'vue'
Vue.use(Toast)
const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 10000
})
// 发起自定axios请求前执行
http.interceptors.request.use(function (response) {
  // 在请求来数据前显示加载中（轻提示）
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    overlay: true// 是否显示遮罩层
  })
  return response
}, function (error) {
  return Promise.reject(error)
})
// 发起自定义axios请求到数据后执行
http.interceptors.response.use(function (response) {
  Toast.clear()// 请求到数据后清除提示
  return response
}, function (error) {
  return Promise.reject(error)
})
export default http
