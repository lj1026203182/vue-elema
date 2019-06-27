<template>
  <div class="tabbar">
    <van-tabbar v-model="active" route safe-area-inset-bottom >
      <van-tabbar-item
        v-for="(item, index) in tabBarData"
        :key="index"
        :icon="item.icon"
        :to="item.path"
        >{{item.title}}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  props: {
    tabBarData: Array
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style lang="less" scoped>
</style>