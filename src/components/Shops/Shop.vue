<template>
  <div class="shop">
    <van-panel title="配送信息" :desc="delivery" class="panel"></van-panel>
    <van-panel title="商家服务" :desc="shopSupport" class="panel"></van-panel>
    <van-panel title="商家信息" :desc="shopInfo" class="panel">
      <ul class="infos">
        <li class="info">
          <span class="falvors">品类</span>
          <span v-for="(item, index) in shop.flavors" :key="index" class="item">{{item.name}}</span>
        </li>
        <li class="info">
          <span class="falvors">商家电话</span>
          <span class="item">{{shop.phone}}</span>
        </li>
        <li class="info">
          <span class="falvors">地址</span>
          <span class="item">{{shop.address}}</span>
        </li>
        <li class="info">
          <span class="falvors">营业时间</span>
          <span class="item">{{shop.opening_hours[0]}}</span>
        </li>
      </ul>
    </van-panel>
  </div>
</template>

<script>
export default {
  name: 'Shop',
  props: {
    data: Object
  },
  data() {
    return {}
  },
  created() {
    this.shop = this.data.shop
    console.log(this.shop)
  },
  computed: {
    delivery() {
      return `由商家配送提供配送，约${
        this.shop.float_minimum_order_amount
      }分钟送达，距离${(this.shop.distance / 1000).toFixed(1)}km`
    },
    shopSupport() {
      return this.shop.supports[0].description
    },
    shopInfo() {
      if (this.shop.shopInfo) {
        return this.shop.shopInfo
      }
      return '暂无简介'
    }
  }
}
</script>

<style lang="less" scoped>
.shop {
  .panel {
    margin-bottom: 10px;
    .infos {
      .info {
        padding: 10px;
        height: 24px;
        line-height: 24px;
        .falvors {
          float: left;
          font-size: 12px;
          font-weight: 700;
        }
        .item {
          float: right;
          font-size: 10px;
          color: #666;
        }
      }
    }
  }
}
</style>