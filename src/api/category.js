import { createAPI } from '@/utils/request'

// 获取商品分类
export const getCategories = data => createAPI('api/public/v1/categories', 'GET', data) 