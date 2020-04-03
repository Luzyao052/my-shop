<template>
  <view :style="{height: pageHeight, overflow: 'hidden'}">
    <search @search="disableScroll" />
    <!-- 焦点图 -->
    <swiper
      class="banner"
      indicator-dots
      indicator-color="rgba(255, 255, 255, 0.6)"
      indicator-active-color="#fff"
      autoplay
      circular
    >
      <swiper-item v-for="item in swiperList" :key="item.goods_id">
        <navigator :url="item.navigator_url">
          <image :src="item.image_src" />
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 导航条 -->
    <view class="navs">
      <navigator
        v-for="item in navList"
        :key="item.name"
        open-type="switchTab"
        :url="item.navigator_url"
      >
        <image :src="item.image_src" />
      </navigator>
    </view>
    <!-- 楼层 -->
    <navigator class="floors">
      <view class="floor" v-for="(item,index) in floorList" :key="index">
        <view class="title">
          <image :src="item.floor_title.image_src" />
        </view>
        <view class="items">
          <navigator
            v-for="(floor,index) in item.product_list"
            :key="index"
            url="/pages/list/index"
          >
            <image :src="floor.image_src" />
          </navigator>
        </view>
      </view>
    </navigator>
    <!-- 回到顶部 -->
    <view class="goTop icon-top" @click="handleBack" v-if="scrollTopHeight>200"></view>
  </view>
</template>

<script>
import { getSwiper, getNav, getFloor } from "@/api/home";
import search from "@/components/search";

export default {
  data() {
    return {
      pageHeight: "auto",
      swiperList: [], // 轮播图
      navList: [], // 导航条
      floorList: [], // 楼层
      scrollTopHeight: 0
    };
  },

  components: {
    search
  },

  methods: {
    disableScroll(ev) {
      this.pageHeight = ev.pageHeight + "px";
    },
    // 获取轮播图
    async getSwiperList() {
      const res = await getSwiper();
      // console.log(res);
      this.swiperList = res.message;
      // 这是注册全局的请求方法
      // const res = await this.$request({url:"api/public/v1/home/swiperdata"});
    },
    // 获取导航条
    async getNavList() {
      const res = await getNav();
      // console.log(res);
      this.navList = res.message;
    },
    // 获取楼层
    async getFloorList() {
      const res = await getFloor();
      // console.log(res);
      this.floorList = res.message;
    },
    // 点击回到最顶部
    handleBack() {
      // 通过api设置scrollTop为零
      uni.pageScrollTo({ scrollTop: 0 });
    }
  },

  onLoad() {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
  },

  // 监听下拉刷新
  onPullDownRefresh() {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
    // 停止下拉刷新
    uni.stopPullDownRefresh();
  },

  // 监听页面滚动
  onPageScroll(e) {
    // console.log(e); // scrollTop
    this.scrollTopHeight = e.scrollTop;
  }
};
</script>

<style scoped lang="less">
.banner {
  width: 100%;
  height: 340rpx;

  image {
    width: 100%;
    height: 340rpx;
  }
}

.navs {
  display: flex;
  justify-content: space-between;
  padding: 30rpx 44rpx;

  image {
    width: 128rpx;
    height: 140rpx;
  }
}

.floor {
  .title {
    width: 750rpx;
    height: 60rpx;
    padding: 20rpx 0 0 8rpx;
    background-color: #f4f4f4;
  }

  .items {
    padding: 20rpx 16rpx;
    overflow: hidden;

    navigator {
      width: 193rpx;
      height: 188rpx;
      margin-left: 10rpx;
      margin-bottom: 10rpx;
      float: left;
    }

    navigator:first-child {
      width: 232rpx;
      height: 386rpx;
      margin-left: 0rpx;
    }

    navigator:nth-child(2),
    navigator:nth-child(5) {
      width: 273rpx;
    }
  }

  &:first-child {
    .items {
      navigator {
        width: 233rpx;
      }
    }
  }
}

.goTop {
  position: fixed;
  bottom: 30rpx;
  /* #ifdef H5 */
  bottom: 65px;
  /* #endif */
  right: 30rpx;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100rpx;
  height: 100rpx;
  font-size: 48rpx;
  color: #666;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>