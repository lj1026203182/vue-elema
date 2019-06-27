<template>
  <div class="location">
    <div class="currentLocation">当前定位</div>
    <div class="specificLocation van-ellipsis" @click="$emit('selectCity')">
      <van-icon name="location" color="#009eef" />{{ address }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Location",
  props: {
    address: String
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.location {
  background-color: #fff;
  padding: 5px 15px;
  .currentLocation {
    font-size: 14px;
  }
  .specificLocation {
    margin: 10px 0 5px 0;
    font-weight: 600;
    .van-icon {
      vertical-align: bottom;
      margin-right: 3px;
    }
  }
}
</style>