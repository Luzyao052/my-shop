<template>
  <view class="wrapper">
    <!-- <van-swipe-cell :right-width="65" :left-width="65">
      <view slot="left">选择</view>
      <van-cell-group>
        <van-cell title="单元格" value="内容" />
      </van-cell-group>
      <view slot="right">删除</view>
    </van-swipe-cell> -->
    <!-- 收货信息 -->
    <!-- 判断有没有收货地址？没有地址，下面信息框 不显示 -->
    <view class="shipment" v-if="addr">
      <view class="dt">收货人:</view>
      <view class="dd meta">
        <text class="name">{{addr.userName}}</text>
        <text class="phone">{{addr.telNumber}}</text>
      </view>
      <view class="dt">收货地址:</view>
      <view class="dd">{{addr.details}}</view>
    </view>
    <!-- 按钮：点击获取地址 -->
    <button v-else type="primary" @click="getAddr">收货地址</button>
    <!-- 购物车 -->
    <view class="carts">
      <view class="item">
        <!-- 店铺名称 -->
        <view class="shopname">优购生活馆</view>
        <view class="goods" v-for="(item,index) in carts" :key="item.goods_id">
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
            <!-- 加减 -->
            <view class="amount">
              <text class="reduce" @click="change_num(index,-1)">-</text>
              <input type="number" :value="item.goods_number" class="number" />
              <text class="plus" @click="change_num(index,1)">+</text>
            </view>
          </view>
          <!-- 选框 -->
          <view class="checkbox">
            <icon
              type="success"
              @click="change_ck(index)"
              size="20"
              :color="item.goods_ck?'#ea4451':'#ccc'"
            ></icon>
          </view>
        </view>
      </view>
    </view>
    <!-- 其它 -->
    <view class="extra">
      <label class="checkall">
        <icon type="success" @click="ck_all" :color="is?'#ea4451':'#ccc'" size="20"></icon>全选
      </label>
      <view class="total">
        合计:
        <text>￥</text>
        <label>{{price}}</label>
        <text>.00</text>
      </view>
      <button :class="{'pay':!dis}" :disabled="dis" @click="goPay">结算({{ck_back.length}})</button>
    </view>
  </view>
</template>

<script>
import { apiSetOrders } from "@/api/user";
export default {
  data() {
    return {
      carts: [], // 获取购物车数据
      addr: null // 获取地址
    };
  },
  computed: {
    // 结算按钮优化
    dis() {
      return this.ck_back.length == 0;
    },
    // 总价
    price() {
      const p = this.carts
        .filter(item => item.goods_ck)
        .reduce((pre, n) => n.goods_number * n.goods_price + pre, 0);
      // console.log(p);
      return p;
    },
    // 被选中的数组
    ck_back() {
      const arr = this.carts.filter(item => {
        return item.goods_ck;
      });
      return arr;
    },
    // 全选状态
    is() {
      return this.carts.length == this.ck_back.length;
    }
  },
  methods: {
    // 结算
    async goPay() {
      // 1.如果没有收货地址
      if (!this.addr) {
        uni.showToast({ title: "没有收货地址", icon: "none" });
        return;
      }
      // 2.如果未登录
      if (!uni.getStorageSync("token")) {
        uni.showToast({ title: "无登录状态，转跳去登录", icon: "none" });
        uni.navigateTo({ url: "/pages/auth/index" });
      }

      // 创建订单
      const data = {
        order_price: this.price,
        consignee_addr: this.addr.details,
        goods: this.ck_back
      };
      const res = await apiSetOrders(data);
      // console.log(res);
      // 订单创建成功:去订单页
      if (res.meta.status == 200) {
        // 清除购物车数据的数据 （业务上）
        // 清空掉
        // uni.removeStorageSync("carts");
        // 转跳页面
        uni.navigateTo({
          url: "/pages/order/index"
        });
      }
    },
    // 获取收货地址
    async getAddr() {
      const [err, res] = await uni.chooseAddress();
      // console.log(res);
      this.addr = res;
      this.addr.details =
        res.provinceName + res.cityName + res.countyName + res.detailInfo;
    },
    // 全选
    ck_all() {
      var key = !this.is;
      this.carts.map(item => {
        // 将状态赋值给每一项
        return (item.goods_ck = key);
      });
      // 存入本地
      uni.setStorageSync("carts", this.carts);
    },
    // 单选
    change_ck(i) {
      this.carts[i].goods_ck = !this.carts[i].goods_ck;
      // 存入本地
      uni.setStorageSync("carts", this.carts);
    },
    // 数量加减
    change_num(i, step) {
      if (step == -1 && this.carts[i].goods_number == 1) {
        uni.showToast({ title: "宝贝已经不能再少了~", icon: "none" });
        return;
      }
      if (step == 1 && this.carts[i].goods_number == 15) {
        uni.showToast({ title: "宝贝库存已经不足了~", icon: "none" });
        return;
      }
      this.carts[i].goods_number += step;
      // 存入本地
      uni.setStorageSync("carts", this.carts);
    }
  },
  // 页面显示出来，数据重新获取下
  onShow() {
    this.carts = uni.getStorageSync("carts") || [];
  }
};
</script>

<style scoped lang="less">
.shipment {
  height: 100rpx;
  line-height: 2;
  padding: 30rpx 30rpx 40rpx 30rpx;
  font-size: 27rpx;
  color: #333;
  background-color: #fff;
  background-image: url(http://static.botue.com/ugo/images/cart_border%402x.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;

  .dt {
    width: 140rpx;
    float: left;
    clear: both;
  }

  .dd {
    padding-left: 160rpx;
  }

  .meta {
    padding-right: 50rpx;
  }

  text.phone {
    float: right;
  }
}

.carts {
  background-color: #f4f4f4;
  padding-bottom: 110rpx;
  overflow: hidden;

  .shopname {
    padding: 30rpx;
    margin-top: 20rpx;
    font-size: 30rpx;
    color: #333;
    background-color: #fff;
    border-top: 1rpx solid #eee;
    border-bottom: 1rpx solid #eee;
  }

  .goods {
    display: flex;
    padding: 30rpx 20rpx 30rpx 0;
    margin-left: 100rpx;
    border-bottom: 1rpx solid #eee;
    background-color: #fff;

    position: relative;

    .checkbox {
      width: 101rpx;
      height: 100%;
      background-color: #fff;

      display: flex;
      justify-content: center;
      align-items: center;

      position: absolute;
      left: -100rpx;
      top: 0;
    }

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

    .amount {
      position: absolute;
      bottom: 0;
      right: 20rpx;

      height: 48rpx;
      text-align: center;
      border: 1rpx solid #ddd;
      border-radius: 8rpx;

      display: flex;
      align-items: center;

      text {
        display: block;
        width: 60rpx;
        line-height: 48rpx;
        font-size: 36rpx;
        color: #ddd;
        text-align: center;
      }

      input {
        width: 60rpx;
        height: 48rpx;
        min-height: 48rpx;
        font-size: 27rpx;
        border-left: 1rpx solid #ddd;
        border-right: 1rpx solid #ddd;
      }
    }
  }
}

.extra {
  position: fixed;
  bottom: 0;
  /* #ifdef H5 */
  bottom: 50px;
  /* #endif */
  left: 0;
  z-index: 9;

  width: 750rpx;
  height: 96rpx;
  text-align: center;
  line-height: 96rpx;
  font-size: 36rpx;
  border-top: 1rpx solid #eee;
  background-color: #fff;
  color: #333;
  display: flex;

  .checkall {
    width: 140rpx;
    line-height: 1;
    margin-left: 25rpx;
    display: flex;
    align-items: center;

    icon {
      margin-right: 20rpx;
    }
  }

  .total {
    display: flex;
    justify-content: center;
    flex: 1;

    label,
    text {
      color: #ea4451;
      vertical-align: bottom;
      position: relative;
      bottom: -2rpx;
    }

    text {
      position: relative;
      bottom: -3rpx;
      font-size: 24rpx;

      &:first-child {
        margin-left: 10rpx;
      }
    }
  }

  .pay {
    width: 200rpx;
    background-color: #ea4451;
    color: #fff;
  }
}
</style>

