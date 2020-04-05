import { createAPI } from '@/utils/request'

// 搜索时建议查询
export const getSearch = data => createAPI('api/public/v1/goods/qsearch', 'GET', data)

// 商品列表搜索
export const getGoodsSearch = data => createAPI('api/public/v1/goods/search', 'GET', data)

// 商品详情
export const getGoodsDetail = data => createAPI('api/public/v1/goods/detail', 'GET', data)