<template>
  <div class="mylocation">
    <van-nav-bar title="我的地址" left-text="返回" left-arrow @click-left="$router.push('/me')" />
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
import { getApi } from '../../axios/index'
export default {
  name: 'MyLocation',
  data() {
    return {
      chosenAddressId: 1,
      list: [],
      disabledList: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    onEdit(item, index) {
      this.$router.push({
        name: 'MyLocationEdit',
        params: { address: item, index: index }
      })
    },
    getData() {
      let d = JSON.parse(window.localStorage.login)
      getApi(
        `/user/user_info/${d._id}`,
        response => {
          console.log(response)
          response.data.myAddress.forEach(item => {
            item.tel = item.phone
          })
          this.list = response.data.myAddress
        },
        error => {
          console.log(error)
        }
      )
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