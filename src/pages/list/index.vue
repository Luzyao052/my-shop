<template>
  <view>
    <!-- 筛选 -->
    <view class="filter">
      <text class="active">综合</text>
      <text>销量</text>
      <text>价格</text>
    </view>
    <!-- 商品列表 -->
    <scroll-view class="goods" scroll-y @scrolltolower="getMore">
      <view class="item" @click="goDetail(item.goods_id)" v-for="item in list" :key="item.goods_id">
        <!-- 商品图片 -->
        <image class="pic" :src="item.goods_small_logo" />
        <!-- 商品信息 -->
        <view class="meta">
          <view class="name">{{item.goods_name}}</view>
          <view class="price">
            <text>￥</text>
            {{item.goods_price}}
            <text>.00</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { getGoodsSearch } from "@/api/search";
export default {
  data() {
    return {
      list: [], // 商品列表
      pagenum: 1, // 页码
      query: "", // 路径传过来的参数
      flag: true, // 默认数据加载完成
      total_num: 0 // 默认一共有一条数据
    };
  },
  methods: {
    // 到底部加载更多
    async getMore() {
      // 判断是否获取完所有数据
      if(this.list.length === this.total_num) {
        return
      }

      if (!this.flag) {
        return;
      }
      // 当触底的时候：改变
      this.flag = false;
      this.pagenum++; // 第二页
      await this.getList(this.query);

      // 再次改变标识
      this.flag = true;
    },
    // 商品列表搜索
    async getList(id) {
      // console.log(id);
      const obj = {
        query: id,
        pagenum: this.pagenum,
        pagesize: 5
      };
      const res = await getGoodsSearch(obj);
      // console.log(res);
      // console.log(...res.message.goods)
      // this.list = res.message.goods;
      this.total_num = res.message.total
      this.list.push(...res.message.goods);
    },
    goDetail(id) {
      uni.navigateTo({
        url: "/pages/goods/index?id=" + id
      });
    }
  },
  onLoad(info) {
    // console.log(info);
    this.query = info.id;
    this.getList(info.id);
  }
};
</script>

<style scoped lang="less">
.filter {
  display: flex;
  height: 96rpx;
  line-height: 96rpx;
  border-bottom: 1rpx solid #ddd;

  /* #ifdef H5 */
  position: relative;
  z-index: 99;
  /* #endif */

  text {
    flex: 1;
    text-align: center;
    font-size: 30rpx;
    color: #333;

    &.active {
      color: #ea4451;
    }
  }
}

.goods {
  position: absolute;
  width: 100%;
  top: 97rpx;
  bottom: 0;
}

.item {
  display: flex;
  padding: 30rpx 20rpx 30rpx 0;
  margin-left: 20rpx;
  border-bottom: 1rpx solid #eee;

  &:last-child {
    border-bottom: none;
  }

  .pic {
    width: 200rpx;
    height: 200rpx;
    margin-right: 30rpx;
  }

  .meta {
    flex: 1;
    font-size: 27rpx;
    color: #333;
    position: relative;
  }

  .name {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .price {
    position: absolute;
    bottom: 0;

    color: #ea4451;
    font-size: 33rpx;

    text {
      font-size: 22rpx;
    }
  }
}
</style>
