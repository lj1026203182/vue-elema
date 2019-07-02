<template>
  <div class="navtab">
    <van-tabs v-model="active" swipeable sticky :border="false" animated>
      <van-tab v-for="(item,index ) in navTabData" :key="index" :title="item.label">
        <component :is="item.component" :data="item.data"></component>
      </van-tab>
    </van-tabs>
    <div class="shopcart" @click="showPopup" v-if="isFirst"></div>
    <van-popup v-model="show" get-container="shopcart" position="bottom">
      <ShopCart :selcet="selectFoods" @closeCart="closeCart"></ShopCart>
    </van-popup>
  </div>
</template>

<script>
import ShopCart from './Shops/ShopCart'
export default {
  name: 'NavTab',
  props: {
    navTabData: Array
  },
  data() {
    return {
      active: 0,
      show: false
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
  },
  computed: {
    selectFoods() {
      let food = []
      this.navTabData[0].data.menu.forEach(items => {
        items.foods.forEach(item => {
          if (item.count && item.count > 0) {
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
    background-color: #666;
    width: 100%;
    height: 46px;
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