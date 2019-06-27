<template>
  <div class="goods">
    <div class="bgimage">
      <van-image width="100%" fit="contain" />
      <van-icon name="arrow-left" @click="$router.back()" />
    </div>
    <!-- 脑壳 -->
    <div class="nav-title">
      <van-row type="flex" justify="center">
        <div class="title-img">
          <van-image width="100%" fit="contain" :src="restaurant.image_path" />
        </div>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col class="title van-ellipsis">{{ restaurant.name }}</van-col>
      </van-row>
      <van-row type="flex" justify="center" class="desc">
        <van-col span="6">评分{{ restaurant.rating }}</van-col>
        <van-col span="6">月售{{ restaurant.recent_order_num }}</van-col>
        <van-col span="6"
          >约{{ restaurant.float_minimum_order_amount }}送达</van-col
        >
      </van-row>
    </div>
    <!-- navtab -->
    <NavTab :navTabData="navTabData" :menu="menu"></NavTab>
  </div>
</template>

<script>
import NavTab from '../NavTab'
import { getApi } from '../../axios/index'
export default {
  name: 'ShopStore',
  data() {
    return {
      restaurant: {},
      menu: [],
      rate: [],
      shop: []
    }
  },
  created() {
    this.getData()
  },
  activated() {
    this.restaurant = JSON.parse(window.sessionStorage.getItem('restaurant'))
  },
  methods: {
    getData() {
      getApi(
        '/profile/batch_shop',
        response => {
          console.log(response);
          this.menu = response.data.menu
          this.rate = response.data.recommend
          this.shop = response.data.rst
        },
        error => {
          console.log(error)
        }
      )
    }
  },
  computed: {
    navTabData() {
      return [
        {
          label: '点餐',
          component: () => import('./Goods'),
          data: {
            menu: this.menu
          }
        },
        {
          label: '评价',
          component: () => import('./Rate'),
          data: {
            rate: this.rate
          }
        },
        {
          label: '商家',
          component: () => import('./Shop'),
          data: {
            shop: this.shop
          }
        }
      ]
    }
  },
  components: {
    NavTab
  },
  beforeRouteLeave(to, from, next) {
    window.sessionStorage.removeItem('restaurant')
    next()
  }
}
</script>

<style lang="less" scoped>
.goods {
  width: 100%;
  height: 100%;
  // overflow: hidden;
  color: #333;
  .nav-title {
    background-color: #fff;
    .title-img {
      text-align: center;
      width: 64px;
      height: 64px;
    }
    .title {
      margin-top: 15px;
      font-size: 18px;
      font-weight: 700;
      white-space: nowrap;
    }
    .desc {
      padding: 0 50px;
      color: #666;
      font-size: 10px;
      margin-top: 10px;
    }
  }
}
</style>