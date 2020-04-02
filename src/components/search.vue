<template>
  <view class="container" :class="{'focus':focus}">
    <!-- 搜索盒子 -->
    <view class="search_box">
      <!-- 输入框 -->
      <input @focus="iptFocus" :placeholder="placeholder" type="text" />

      <!-- 取消按钮 -->
      <view class="cancel" @click="iptCancel">取消</view>

      <!-- 图标 -->
      <view class="icon_1">搜索</view>
      <view class="icon_2"></view>
    </view>

    <!-- 历史记录 -->
    <view class="history"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      focus: false,
      placeholder: ""
    };
  },
  methods: {
    // 点击聚焦
    iptFocus() {
      this.focus = true;
      this.placeholder = "请输入您想要的商品";
      // 点击聚焦把可视窗口高度发送给父组件
      const res = uni.getSystemInfoSync();
      // console.log(res.windowHeight);
      // 2.传递数据: 自定义事件名称，发生的数据
      this.$emit("historyHeight", res.windowHeight + "px");
    },
    // 点击取消
    iptCancel() {
      this.focus = false;
      this.placeholder = "";
      // 2.传递数据: 自定义事件名称，发生的数据
      this.$emit("historyHeight", " ");
    }
  }
};
</script>

<style scoped lang='less'>
// 搜索盒子
// 默认状态
.container {
  box-sizing: border-box;
  padding: 20rpx 16rpx;
  background-color: #ff2d4a;
  .search_box {
    position: relative;
    // 输入框
    input {
      height: 60rpx;
      line-height: 60rpx;
      width: 100%;
      background-color: #fff;
      border-radius: 8rpx;
    }
    .cancel {
      display: none;
    }
    .icon_1 {
      display: block;
      position: absolute;
      height: 32rpx;
      line-height: 32rpx;
      font-size: 24rpx;
      color: #bbbbbb;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: url(http://static.botue.com/ugo/images/icon_search%402x.png)
        no-repeat;
      background-size: 32rpx;
      padding-left: 50rpx;
    }
    .icon_2 {
      display: none;
    }
  }
  // 历史记录区
  .history {
    display: none;
  }
}
// 聚焦状态
.focus {
  background-color: #efefef;
  padding: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  .search_box {
    display: flex;
    background-color: #efefef;
    input {
      flex: 1;
      height: 60rpx;
      line-height: 60rpx;
      background-color: #fff;
      border-radius: 8rpx;
      padding-left: 60rpx;
      font-size: 24rpx;
    }
    .cancel {
      display: block;
      margin-left: 30rpx;
      width: 160rpx;
      height: 60rpx;
      text-align: center;
      border: 1px solid #999;
      box-sizing: border-box;
      line-height: 60rpx;
      font-size: 30rpx;
      border-radius: 10rpx;
    }
    .icon_1 {
      display: none;
    }
    .icon_2 {
      display: block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 20rpx;
      width: 32rpx;
      height: 32rpx;
      background: url(http://static.botue.com/ugo/images/icon_search%402x.png)
        no-repeat;
      background-size: 32rpx;
    }
  }
  // 历史记录区
  .history {
    display: block;
    position: absolute;
    top: 100rpx;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
  }
}
</style>