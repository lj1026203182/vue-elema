<template>
  <div class="rate-wrapper">
    <van-row type="flex">
      <van-col span="4" class="shop-score">{{rate.shop_score.toFixed(1)}}</van-col>

      <van-col span="6" class="shop-rate">
        <van-row type="flex">
          <van-col span="24">
            <span class="title">商家评分</span>
          </van-col>
        </van-row>

        <van-row type="flex">
          <van-col span="24">
            <StarRate :rating="rate.shop_score" :gutter="2" :size="8"></StarRate>
          </van-col>
        </van-row>
      </van-col>

      <van-col span="4" class="food-score">
        <van-row type="flex">
          <van-col span="24">
            <span>味道</span>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24" class="rate-score">{{rate.food_score.toFixed(1)}}</van-col>
        </van-row>
      </van-col>

      <van-col span="5" class="package-score">
        <van-row type="flex">
          <van-col span="24">
            <span>包装</span>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24" class="rate-score">{{rate.package_score.toFixed(1)}}</van-col>
        </van-row>
      </van-col>

      <van-col span="5" class="rider-score van-hairline--left">
        <van-row type="flex">
          <van-col span="24">
            <span>配送</span>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24" class="rate-score">{{rate.rider_score.toFixed(1)}}</van-col>
        </van-row>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import StarRate from './StarRate'
export default {
  name: 'Commit',
  props: {
    rate: {}
  },
  data() {
    return {}
  },
  components: {
    StarRate
  }
}
</script>

<style lang="less" scoped>
.rate-wrapper {
  padding: 20px 20px 30px 20px;
  color: #666;
  background-color: #fff;

  .shop- {
    &score {
      color: #ff6000;
      font-size: 32px;
      text-align: center;
    }
    &rate {
      line-height: 20px;
      text-align: center;
      .title {
        font-size: 12px;
      }
    }
  }
  .food-score {
    font-size: 12px;
    text-align: center;
    .rate-score {
      margin-top: 6px;
      font-size: 18px;
    }
  }
  .package-score {
    font-size: 12px;
    text-align: center;
    .rate-score {
      margin-top: 6px;
      font-size: 18px;
    }
  }
  .rider-score {
    font-size: 12px;
    text-align: center;
    .rate-score {
      margin-top: 6px;
      font-size: 18px;
    }
  }
}
</style>