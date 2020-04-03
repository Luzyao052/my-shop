import { createAPI } from '@/utils/request'

// 获取轮播图
export const getSwiper = data => createAPI('api/public/v1/home/swiperdata', 'GET', data)

// 获取导航条
export const getNav = data => createAPI('api/public/v1/home/catitems', 'GET', data)

// 获取楼层信息
export const getFloor = data => createAPI('api/public/v1/home/floordata', 'GET', data)