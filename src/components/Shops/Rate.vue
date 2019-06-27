<template>
  <div class="rate">
    <van-skeleton title avatar/>
    <van-skeleton title :row="3" />
  </div>
</template>

<script>
export default {
  name: 'Rate',
  props: {
    data: Object
  },
  data() {
    return {
      rate: {}
    }
  },
  created() {
    this.rate = JSON.parse(window.sessionStorage.restaurant)

    console.log(this.data)
  },
  activated() {
    this.rate = JSON.parse(window.sessionStorage.restaurant)
  }
}
</script>

<style lang="less" scoped>
.rate {
  height: 2000px;
}
</style>