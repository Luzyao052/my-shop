<template>
  <div class="container">
    <!-- 搜索盒子 -->
    <view class="search_box">
      <!-- 输入框 -->
      <input type="text" />
    </view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
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
</style>