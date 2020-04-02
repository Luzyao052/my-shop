<template>
  <view class="content" :style="{'height':height,'overflow':'hidden'}">
    <!-- 搜索盒子 -->
    <search @historyHeight="send"></search>
    <!-- 轮播 -->
    <swiper class="swiper" autoplay indicator-dots>
      <swiper-item>
        <navigator url>
          <image src="/static/uploads/banner1.png" />
        </navigator>
      </swiper-item>
      <swiper-item>
        <navigator url>
          <image src="/static/uploads/banner2.png" />
        </navigator>
      </swiper-item>
      <swiper-item>
        <navigator url>
          <image src="/static/uploads/banner3.png" />
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 导航区 -->
    <view class="nav">
      <navigator url>
        <image src="/static/uploads/icon_index_nav_1@2x.png" />
      </navigator>
      <navigator url>
        <image src="/static/uploads/icon_index_nav_2@2x.png" />
      </navigator>
      <navigator url>
        <image src="/static/uploads/icon_index_nav_3@2x.png" />
      </navigator>
      <navigator url>
        <image src="/static/uploads/icon_index_nav_4@2x.png" />
      </navigator>
    </view>
    <!-- 楼层展示 -->
    <view class="floors">
      <!-- 第一层 -->
      <view class="item first">
        <!-- 标题 -->
        <view class="title">
          <image src="/static/uploads/pic_floor01_title.png" />
        </view>
        <!-- 图片 -->
        <view class="imgs">
          <navigator>
            <image src="/static/uploads/pic_floor01_1@2x.png" />
          </navigator>
          <navigator>
            <image src="/static/uploads/pic_floor01_2@2x.png" />
          </navigator>
          <navigator>
            <image src="/static/uploads/pic_floor01_3@2x.png" />
          </navigator>
          <navigator>
            <image src="/static/uploads/pic_floor01_4@2x.png" />
          </navigator>
          <navigator>
            <image src="/static/uploads/pic_floor01_5@2x.png" />
          </navigator>
        </view>
      </view>
      <!-- 公共楼层 -->
      <view class="item">
        <!-- 标题 -->
        <view class="title">
          <image src="/static/uploads/pic_floor02_title.png" />
        </view>
        <!-- 图片 -->
        <view class="imgs">
          <navigator>
            <image src="/static/uploads/pic_floor02_1@2x.png" />
          </navigator>
          <navigator>
            <image src="/static/uploads/pic_floor02_2@2x.png" />
          </navigator>
          <navigator>
            <image src="/static/uploads/pic_floor02_3@2x.png" />
          </navigator>
          <navigator>
            <image src="/static/uploads/pic_floor02_4@2x.png" />
          </navigator>
          <navigator>
            <image src="/static/uploads/pic_floor02_5@2x.png" />
          </navigator>
        </view>
      </view>
      <!-- 三楼 -->
      <view class="item">
        <!-- 标题 -->
        <view class="title">
          <image src="/static/uploads/pic_floor03_title.png" />
        </view>
        <!-- 图片 -->
        <view class="imgs">
          <navigator>
            <image src="/static/uploads/pic_floor03_1@2x.png" />
          </navigator>
          <navigator>
            <image src="/static/uploads/pic_floor03_2@2x.png" />
          </navigator>
          <navigator>
            <image src="/static/uploads/pic_floor03_3@2x.png" />
          </navigator>
          <navigator>
            <image src="/static/uploads/pic_floor03_4@2x.png" />
          </navigator>
          <navigator>
            <image src="/static/uploads/pic_floor03_5@2x.png" />
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import search from "@/components/search";
export default {
  components: {
    search
  },
  data() {
    return {
      // 默认值：不需要设置高度
      height: ""
    };
  },
  onLoad() {},
  methods: {
    // 子组件搜索传来得值
    send(e) {
      // console.log(e);
      this.height = e;
    }
  }
};
</script>

<style lang="less">
.content {
  // 搜索盒子
  .search_box {
    box-sizing: border-box;
    padding: 20rpx 16rpx;
    background-color: #ff2d4a;
    // 输入框
    input {
      height: 60rpx;
      line-height: 60rpx;
      width: 100%;
      background-color: #fff;
      border-radius: 8rpx;
    }
  }
  // 轮播图
  .swiper {
    height: 340rpx;
    image {
      width: 750rpx;
      height: 340rpx;
    }
  }
  // 导航区
  .nav {
    display: flex;
    navigator {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      image {
        margin: 30rpx 0;
        width: 128rpx;
        height: 140rpx;
      }
    }
  }
  // 楼层区
  // 公共楼层
  .floors {
    .item {
      .title {
        box-sizing: border-box;
        padding: 20rpx 0 0 16rpx;
        image {
          width: 100%;
          height: 60rpx;
        }
      }
      .imgs {
        box-sizing: border-box;
        padding: 20rpx 12rpx;
        overflow: hidden;
        navigator {
          float: left;
          margin-right: 10rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
        navigator:nth-child(1) {
          width: 232rpx;
          height: 386rpx;
        }
        navigator:nth-child(2),
        navigator:nth-child(5) {
          width: 273rpx;
          height: 188rpx;
        }
        navigator:nth-child(3),
        navigator:nth-child(4) {
          width: 203rpx;
          height: 188rpx;
        }
        navigator:nth-child(3),
        navigator:nth-child(5) {
          margin-right: 0;
        }
        navigator:nth-child(2),
        navigator:nth-child(4) {
          margin-bottom: 10rpx;
        }
      }
    }
    // 第一层
    .first {
      .imgs {
        // 2 3 4 5 n:从0开始，注意：n放在前面；如果放在没有效果，不会报错！
        navigator:nth-child(n + 2) {
          width: 236rpx;
          height: 188rpx;
        }
      }
    }
  }
}
</style>
	