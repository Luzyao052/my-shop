export const createAPI = async (url, method, data) => {
  // 友好：1.showLoading()
  uni.showLoading({
    title: "数据加载中...",
    // mask:true
  });
  const baseURL = `https://api-ugo-web.itheima.net/`
  const [err, res] = await uni.request({
    url: baseURL + url,
    method,
    data,
    // 没有token模拟创建订单 
    header:{ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE1ODYyNTAyOTUsImV4cCI6MTAwMTU4NjI1MDI5NH0.xpK-y1FU0GvGz7UyAeoWiANFfWoSr1ZkEwfSqMS415g' }
  })
  // 2.拿到数据后取消加载：
  uni.hideLoading();
  // 请求到数据：返回
  return res.data
}


// 这是注册了全局的请发的方法
// export default {
//   install(Vue) {
//     const baseURL = `https://api-ugo-web.itheima.net/`
//     Vue.prototype.$request = async (options) => {
//       const { url } = options
//       const [err, res] = await uni.request({
//         url: baseURL + url
//       })
//       return res
//     }
//   }
// }