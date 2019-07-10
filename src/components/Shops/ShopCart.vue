<template>
  <div class="shopcart">
    <div class="header">
      <div class="selected">
        <span>已选商品</span>
      </div>
      <div class="clear" @click="removeSelcet">
        <van-icon name="delete" />
        <span>清空</span>
      </div>
    </div>
    <div class="content">
      <van-list>
        <van-cell v-for="(item, index) in selcet" :key="index">
          <van-row type="flex">
            <van-col span="12" class="van-ellipsis">{{item.name}}</van-col>
            <van-col span="6">{{item.activity.fixed_price*item.count}}</van-col>
            <van-col span="6">
              <CarControl :food="item"></CarControl>
            </van-col>
          </van-row>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import CarControl from '../CarControl'
export default {
  name: 'ShopCart',
  props: {
    selcet: Array
  },
  data() {
    return {}
  },
  methods: {
    removeSelcet() {
      this.selcet.forEach(item => {
        item.count = 0
      })
      this.$emit('closeCart')
    }
  },
  computed: {
  },
  components: {
    CarControl
  }
}
</script>

<style lang="less" scoped>
.shopcart {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .header {
    height: 36px;
    line-height: 36px;
    width: 100%;
    background-color: #eceff1;
    z-index: 3;
    .selected {
      margin-left: 10px;
      float: left;
    }
    .clear {
      margin-right: 10px;
      float: right;
      font-size: 12px;
    }
  }
  .content{
  }
}
</style>