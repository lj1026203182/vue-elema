<template>
  <div class="indexshop">
    <div class="index-info" @click="goToGoods">
      <div class="index-img">
        <van-image fit="contain" lazy-load :src="restaurant.image_path"/>
      </div>
      <div class="index-main">
        <div class="index-line">
          <van-row type="flex">
            <van-col span="3" class="premium" v-if="restaurant.is_premium">品牌</van-col>
            <van-col class="title">{{ restaurant.name }}</van-col>
          </van-row>
        </div>
        <div class="index-line">
          <div class="rating-wrapper">
            <van-row type="flex" justify="space-between">
              <van-col>
                <van-row type="flex" gutter="4">
                  <van-col>
                    <StarRate :rating="restaurant.rating" :size="8" :gutter="2"></StarRate>
                  </van-col>
                  <van-col>{{ restaurant.rating }}</van-col>
                  <van-col>月售{{ restaurant.recent_order_num }}单</van-col>
                </van-row>
              </van-col>
              <van-col>
                <van-row>
                  <van-col
                    v-if="restaurant.delivery_mode"
                    class="icon-hollow"
                  >{{ restaurant.delivery_mode.text }}</van-col>
                </van-row>
              </van-col>
            </van-row>
          </div>
        </div>
        <div class="index-line">
          <div class="money-limit">
            <van-row type="flex" justify="space-between">
              <van-col>
                <van-row type="flex" gutter="4">
                  <van-col type="flex">
                    <van-col>{{ restaurant.float_minimum_order_amount }}起送</van-col>
                    <van-col>|</van-col>
                    <van-col>配送费{{ restaurant.float_delivery_fee }}</van-col>
                  </van-col>
                </van-row>
              </van-col>
              <van-col>
                <van-row type="flex" gutter="4">
                  <van-col type="flex">
                    <van-col>{{ distance }}km</van-col>
                    <van-col>|</van-col>
                    <van-col>{{ restaurant.order_lead_time }}分钟</van-col>
                  </van-col>
                </van-row>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRate from "../components/StarRate";
export default {
  name: "IndexShop",
  props: {
    restaurant: Object
  },
  data() {
    return {};
  },
  methods: {
    goToGoods() {
      window.sessionStorage.setItem(
        "restaurant",
        JSON.stringify(this.restaurant)
      );
      this.$router.push({
        name: "ShopStore",
        params: { id: this.restaurant.id, restaurant: this.restaurant }
      });
    }
  },
  computed: {
    distance() {
      let res = Math.floor((this.restaurant.distance / 1000) * 100) / 100;
      return res.toFixed(2);
    }
  },
  components: {
    StarRate
  }
};
</script>

<style lang="less" scoped>
.indexshop {
  width: 100%;
  .index-info {
    display: flex;
    .index-img {
      flex: 1;
    }
    .index-main {
      flex: 4;
      padding-left: 10px;
      .index-line {
        flex: 1;
        line-height: 25px;
        .premium {
          font-size: 12px;
          font-weight: 700;
          text-align: center;
          transform: scale(0.8);
          background-color: #fff100;
          color: #6f3f15;
        }
        .title {
          font-weight: 700;
          font-size: 12px;
          color: #333;
        }
        .rating-wrapper {
          font-size: 10px;
          color: #666;
          .icon-hollow {
            color: #fff;
            background-color: #2395ff;
            line-height: 16px;
            box-sizing: border-box;
          }
        }
        .money-limit {
          font-size: 10px;
          color: #666;
        }
      }
    }
  }
}
</style>