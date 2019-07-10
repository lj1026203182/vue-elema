<template>
  <div class="carcontrol">
    <div class="remove" @click.stop="delateCart" v-if="food.count>0">-</div>
    <div class="nums" v-if="food.count>0">{{food.count}}</div>
    <div class="add" @click.stop="addCart">+</div>
  </div>
</template>

<script>
export default {
  name: 'CarControl',
  props: {
    food: {}
  },
  data() {
    return {}
  },
  methods: {
    delateCart() {
      this.food.count--
    },
    addCart() {
      this.food.count++
    }
  }
}
</script>

<style lang="less" scoped>
.carcontrol {
  font-size: 18px;
  line-height: 18px;
  width: 100%;
  height: 100%;
  .remove {
    display: inline-block;
    background-color: rgb(0, 160, 220);
    width: 18px;
    height: 18px;
    line-height: 18px;
    border-radius: 50%;
    text-align: center;
    color: #fff;
    margin-right: 5px;
  }
  .nums {
    display: inline-block;
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 18px;
    vertical-align: middle;
    margin: 0 2px;
  }
  .add {
    display: inline-block;
    background-color: rgb(0, 160, 220);
    width: 18px;
    height: 18px;
    line-height: 18px;
    border-radius: 50%;
    text-align: center;
    color: #fff;
    margin-left: 5px;
  }
}
</style>