<template>
  <div class="mylocationadd">
    <van-nav-bar title="添加地址" left-text="返回" left-arrow @click-left="$router.push('/myLocation')"/>
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
      let d = new Date()
      e.id = d.getTime()
      let address
      if (window.sessionStorage.allAddress) {
        address = JSON.parse(window.sessionStorage.allAddress)
      } else {
        address = []
      }
      address.push(e)
      window.sessionStorage.setItem('allAddress', JSON.stringify(address))
      this.$router.push('/myLocation')
    },
    onChangeDetail(val) {}
  }
}
</script>

<style lang="less" scoped>
</style>