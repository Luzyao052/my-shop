<template>
  <view>
    <button type="primary" open-type="getUserInfo" @getuserinfo="btnGetInfo">微信登录</button>
  </view>
</template>

<script>
import { apiGetUserInfo } from "@/api/user";
export default {
  methods: {
    async apiGetInfo() {
      const [err, res] = await uni.getUserInfo();
      // console.log(res);

      if (!res) {
        return;
      }
      this.getToken(res);
    },
    btnGetInfo(e) {
      // console.log(e.detail);
      this.getToken(e.detail);
    },
    async getToken(data) {
      const [err, result] = await uni.login();
      // console.log(result);
      const obj = {
        encryptedData: data.encryptedData,
        iv: data.iv,
        rawData: data.rawData,
        signature: data.signature,
        code: result.code
      };
      const res = await apiGetUserInfo(obj);
      
      // console.log(res);
      // 一开始获取res:  null
      // 1. 写小程序一开始用的是我自己私人的appID获取code；
      // 2. 公司的服务器上面公司appID获取code；
      // 3. 上面两个code 不一样；
      // 4. 不能返回，返回null

      // 公司：开发的时候，appID换成 公司的appID就可以；

      // 缓存数据   token是模拟
      uni.setStorageSync('token','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE1ODYyNTAyOTUsImV4cCI6MTAwMTU4NjI1MDI5NH0.xpK-y1FU0GvGz7UyAeoWiANFfWoSr1ZkEwfSqMS415g')
      // 返回到上一页；
      uni.navigateBack();
    }
  },
  onLoad() {
    this.apiGetInfo();
  }
};
</script>

<style lang="less" scoped>
button {
  width: 600rpx;
  margin: 200rpx auto 0;
}
</style>