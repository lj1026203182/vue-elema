<template>
  <div class="me">
    <van-cell  title="我的地址" is-link to="mylocation">
      <template slot="icon" >
        <van-icon name="location" color="rgb(74, 165, 240)"/>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'Me',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.van-icon{
  line-height: 20px;
}
</style>