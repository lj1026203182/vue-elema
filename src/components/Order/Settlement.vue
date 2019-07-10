<template>
  <div class="settlement">
    <van-nav-bar title="确认订单" left-text="返回" left-arrow @click-left="$router.back()" />
    <div class="view-body">
      <div>
        <!-- 收货地址 -->
        <section class="cart-address">
          <p class="title">订单配送至</p>
          <p class="address-detail">
            <span v-if="!allAddress">新增收货地址</span>
            <span v-if="normalAddress">{{normalAddress}}</span>
            <span v-else>选择收货地址</span>
            <van-icon name="arrow" />
          </p>
        </section>
      </div>
    </div>
    <footer class="action-bar">
      <span>¥{{totalPrice}}</span>
      <button @click="handlePay()">去支付</button>
    </footer>
  </div>
</template>

<script>
import { getApi } from '../../axios/index'
export default {
  name: 'Settlement',
  data() {
    return {
      allAddress: [],
      normalAddress: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      let d = JSON.parse(window.localStorage.login)
      getApi(
        `/user/user_info/${d._id}`,
        response => {
          this.allAddress = response.data.myAddress
          this.allAddress.forEach(item => {
            if (item.bottom == 'true') {
              this.normalAddress = item.address
            }
          })
        },
        error => {
          console.log(error)
        }
      )
    },
    handlePay() {
      this.$router.push('/pay')
    }
  },
  computed: {
    totalPrice() {
      return this.$store.getters.totalPrice
    }
  }
}
</script>

<style lang="less" scoped>
.settlement {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.view-body {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  font-size: 0.9rem;
  color: #333;
  padding-bottom: 14.133333vw;
  padding-left: 1.6vw;
  padding-right: 1.6vw;
  background-image: linear-gradient(
      0deg,
      #f5f5f5,
      #f5f5f5 65%,
      hsla(0, 0%, 96%, 0.3) 75%,
      hsla(0, 0%, 96%, 0)
    ),
    linear-gradient(270deg, #009eef, #009eef);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.cart-address {
  background-color: transparent;
  padding: 4.266667vw 2.133333vw 2.933333vw 2.133333vw;
  min-height: 22.133333vw;
  color: #fff;
  overflow: hidden;
}
.cart-address .title {
  font-size: 0.9rem;
  line-height: 1.21;
  color: hsla(0, 0%, 100%, 0.8);
}
/* 底部支付样式 */
.action-bar {
  height: 11.733333vw;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #3c3c3c;
  z-index: 2;
}
.action-bar > span {
  color: #fff;
  font-size: 1.2rem;
  line-height: 11.733333vw;
  padding-left: 2.666667vw;
  vertical-align: middle;
}
.action-bar > button {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background: #00e067;
  min-width: 28vw;
  padding: 0 1.333333vw;
  border: none;
  color: #fff;
  font-size: 1.2rem;
}
</style>