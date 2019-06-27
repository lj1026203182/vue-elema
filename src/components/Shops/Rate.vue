<template>
  <div class="rate">rate</div>
</template>

<script>
export default {
  name: "Rate",
  props: {
    data: Object
  },
  data() {
    return {};
  },
  created(){
    console.log(this.data);
  }
};
</script>

<style lang="less" scoped>
.rate {
  height: 2000px;
}
</style>