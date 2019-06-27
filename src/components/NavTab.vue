<template>
  <div class="navtab">
    <van-tabs v-model="active" swipeable sticky :border="false" animated>
      <van-tab v-for="(item,index ) in navTabData" :key="index" :title="item.label">
        <component :is="item.component" :data="item.data"></component>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "NavTab",
  props: {
    navTabData: Array
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.navtab{
  height: 100%;
  overflow: hidden;
}
</style>