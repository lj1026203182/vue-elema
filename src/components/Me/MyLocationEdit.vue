<template>
  <div class="mylocationadd">
    <van-nav-bar title="修改地址" left-text="返回" left-arrow @click-left="$router.push('/myLocation')" />
    <van-address-edit
      :address-info="addressInfo"
      :area-list="areaList"
      show-postal
      show-set-default
      @save="onSave"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import areaList from '../../assets/arealist'
import { serverApi } from '../../axios/index'
export default {
  name: 'MyLocationAdd',
  data() {
    return {
      areaList: {},
      addressInfo: {},
      index: ''
    }
  },
  created() {
    this.areaList = areaList
  },
  methods: {
    onSave(e) {
      let id = JSON.parse(window.localStorage.login)
      serverApi(
        `/user/add_address/${id._id}`,
        d,
        response => {
          console.log(response)
          this.$router.push('/mylocation')
        },
        error => {
          console.log(error)
        }
      )
    },
    onChangeDetail(val) {}
  }
}
</script>

<style lang="less" scoped>
</style>