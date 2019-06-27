<template>
  <div class="starrate">
    <van-rate
      v-model="value"
      readonly
      allow-half
      void-icon="star"
      void-color="#eee"
      :size="size"
      :gutter="gutter"
    />
  </div>
</template>

<script>
export default {
  name: "StarRate",
  props: {
    rating: Number,
    size: Number,
    gutter: Number
  },
  data() {
    return {};
  },
  computed: {
    value() {
      return Math.floor(this.rating * 2) / 2;
    }
  }
};
</script>

<style lang="less" scoped>
</style>