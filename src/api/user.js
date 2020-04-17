import { createAPI } from '@/utils/request'

// 登录
export const apiGetUserInfo = data => createAPI('api/public/v1/users/wxlogin', 'POST', data)

// 创建订单
export const apiSetOrders = (data) => createAPI('api/public/v1/my/orders/create', 'POST', data)

// 历史订单查询
export const apiGetOrders = data => createAPI('api/public/v1/my/orders/all', 'GET', data)

// 支付
export const apiPay = data => createAPI('api/public/v1/my/orders/req_unifiedorder', 'POST', data)