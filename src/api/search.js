import { createAPI } from '@/utils/request'

// 搜索时建议查询
export const getSearch = data => createAPI('api/public/v1/goods/qsearch', 'GET', data)