<template>
  <div class="mylocation">
    <van-nav-bar title="我的地址" left-text="返回" left-arrow @click-left="$router.push('/me')"/>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      @add="$router.push('/myLocation/add')"
      @edit="onEdit"
    />
  </div>
</template>

<script>
export default {
  name: 'MyLocation',
  data() {
    return {
      chosenAddressId: 1,
      list: [],
      disabledList: []
    }
  },
  created() {},
  activated() {
    if (window.sessionStorage.allAddress) {
      this.list = JSON.parse(window.sessionStorage.allAddress)
      this.list.forEach(item => {
        item.address =
          item.province + item.city + item.county + item.addressDetail
      })
      console.log(this.list)
    }
  },
  methods: {
    onEdit(item, index) {
      this.$router.push({
        name: 'MyLocationEdit',
        params: { address: item, index: index }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.addaddress {
  text-align: center;
  margin: 50px auto;
}
</style>