<template>
  <div class="commit">
    <div class="tags-wrapper">
      <div class="tags"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Commit',
  props: {
    data: {}
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.commit{
  .tags-wrapper{
    display: flex;
    padding: 10px;
  }
}
</style>