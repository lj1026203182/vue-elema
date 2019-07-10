<template>
  <div class="pay">
    <van-nav-bar title="在线支付" left-text="返回" left-arrow @click-left="$router.back()" />
    <div class="times">
      <div class="time">
        <div class="remain">支付剩余时间</div>
        <div class="content" v-if="!isTimeOut">{{countDown}}</div>
        <div class="timeout" v-else>订单已超时</div>
      </div>
      <div class="shop van-hairline--top">{{shopInfo}} {{totalPrice}}</div>
    </div>
    <div class="paymethod">
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell title="微信" clickable @click="radio = '1'">
            <img slot="icon" src="../../assets/weixin.png" class="img" />
            <van-radio slot="right-icon" name="1" />
          </van-cell>
          <van-cell title="支付宝" clickable @click="radio = '2'">
            <img slot="icon" src="../../assets/zhifubao.png" class="img" />
            <van-radio slot="right-icon" name="2" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="confirm">
      <van-button type="primary" :disabled="isTimeOut" @click="pay">确认支付</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pay',
  data() {
    return {
      radio: '1',
      min: 14,
      second: 59,
      isTimeOut: false
    }
  },
  methods: {
    countTimeDown() {
      let timer = setInterval(() => {
        if (this.second === 0 && this.min === 0) {
          this.isTimeOut = true
          clearInterval(timer)
        }
        this.second--
        if (this.second < 0) {
          this.min--
          this.second = 59
        }
      }, 50)
    },
    formateNum(n) {
      return n < 10 ? '0' + n : '' + n
    },
    pay() {
      const data = {
        body: '米修在线',
        out_trade_no: new Date().getTime().toString(),
        total_fee: 1
      }
      alert('进入到pay方法中')
      // 请求 http://www.thenewstep.cn/wxzf/example/jsapi.php
      fetch('http://www.thenewstep.cn/wxzf/example/jsapi.php', {
        method: 'POST',
        headers: {
          //请求头
          'Content-Type': 'application/json'
        },
        mode:"no-cors",
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          this.onBridgeReady(data)
        })
        .catch(err => {
          alert('请求失败')
        })
    },
    onBridgeReady(data) {
      WeixinJSBridge.invoke('getBrandWCPayRequest', data, function(res) {
        if (res.err_msg == 'get_brand_wcpay_request:ok') {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          alert('成了')
        }
      })
    }
  },
  computed: {
    shopInfo() {
      return this.$store.getters.orderInfo.shopInfo.name
    },
    totalPrice() {
      return this.$store.getters.totalPrice
    },
    countDown() {
      return (
        '00:' + this.formateNum(this.min) + ':' + this.formateNum(this.second)
      )
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.countTimeDown()
    })
  }
}
</script>

<style lang="less" scoped>
.times {
  width: 100%;
  height: 150px;
  background-color: #fff;
  display: flex;
  flex-flow: column;
}
.time {
  flex: 3;
  display: flex;
  flex-flow: column;
  position: relative;
}
.shop {
  flex: 1;
}
.remain {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content,
.timeout {
  text-align: center;
  flex: 1;
}
.img {
  width: 24px;
  height: 24px;
  margin-right: 20px;
}
.paymethod {
  margin: 20px 0;
}
.confirm {
  width: 100%;
  height: 36px;
}
.van-button {
  width: 100%;
  border-radius: 8px;
  height: 36px;
  line-height: 36px;
}
</style>