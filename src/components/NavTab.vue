<template>
  <div class="navtab">
    <van-tabs v-model="active" swipeable sticky :border="false" animated>
      <van-tab v-for="(item,index ) in navTabData" :key="index" :title="item.label">
        <component :is="item.component" :data="item.data"></component>
      </van-tab>
    </van-tabs>
    <div class="shopcart" @click="showPopup" v-if="isFirst">
      <div @click="settlement">{{totalPrice===0?minOrder:showPrice}}</div>
    </div>
    <van-popup v-model="show" get-container="shopcart" position="bottom">
      <ShopCart :selcet="selectFoods" @closeCart="closeCart"></ShopCart>
    </van-popup>
  </div>
</template>

<script>
import ShopCart from './Shops/ShopCart'
import { float_calculator } from '../assets/math'
export default {
  name: 'NavTab',
  props: {
    navTabData: Array,
    restaurant: Object
  },
  data() {
    return {
      active: 0,
      show: false,
      totalPrice: 0,
      totalCount: 0
    }
  },
  methods: {
    showPopup() {
      if (this.selectFoods.length > 0) {
        this.show = !this.show
      }
    },
    closeCart() {
      this.show = false
    },
    settlement() {
      this.$store.dispatch('setOrderInfo', {
        shopInfo: this.restaurant,
        selectFoods: this.selectFoods
      })
      this.$router.push('/Settlement')
    }
  },
  computed: {
    selectFoods() {
      let food = []
      this.totalPrice = 0
      this.totalCount = 0
      this.navTabData[0].data.menu.forEach(items => {
        items.foods.forEach(item => {
          if (item.count && item.count > 0) {
            this.totalCount += item.count
            this.totalPrice += float_calculator(
              item.count * item.activity.fixed_price,
              2
            )
            food.push(item)
          }
        })
      })
      return food
    },
    isFirst() {
      if (this.active === 0) {
        return true
      }
      return false
    },
    minOrder() {
      return this.restaurant.float_minimum_order_amount + '起送'
    },
    showPrice() {
      if (this.totalPrice < this.restaurant.float_minimum_order_amount) {
        return (
          '还差' +
          float_calculator(
            this.restaurant.float_minimum_order_amount - this.totalPrice,
            2
          ) +
          '起送'
        )
      } else {
        return '去结算'
      }
    }
  },
  components: {
    ShopCart
  }
}
</script>

<style lang="less" scoped>
.navtab {
  height: 100%;
  overflow: hidden;
  .shopcart {
    position: absolute;
    left: 0;
    bottom: 0;
    color: #fff;
    background-color: #666;
    width: 100%;
    height: 46px;
    line-height: 46px;
    z-index: 5000;
  }
  .van-popup {
    width: 100%;
    margin-bottom: 46px;
    max-height: 300px;
    min-height: 200px;
  }
}
</style>