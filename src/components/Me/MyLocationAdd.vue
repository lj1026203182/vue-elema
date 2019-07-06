<template>
  <div class="mylocationadd">
    <van-nav-bar title="添加地址" left-text="返回" left-arrow @click-left="$router.push('/myLocation')" />
    <van-address-edit
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
      areaList: {}
    }
  },
  created() {
    this.areaList = areaList
  },
  methods: {
    onSave(e) {
      // let d = new Date()
      // e.id = d.getTime()
      // let address
      // if (window.sessionStorage.allAddress) {
      //   address = JSON.parse(window.sessionStorage.allAddress)
      // } else {
      //   address = []
      // }
      // address.push(e)
      // window.sessionStorage.setItem('allAddress', JSON.stringify(address))
      // this.$router.push('/myLocation')
      console.log(e)
      let id = JSON.parse(window.localStorage.login)
      let d = {
        address: e.province + e.city + e.county + e.addressDetail,
        name: e.name,
        phone: e.tel,
        bottom: e.isDefault
      }
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