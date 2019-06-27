<template>
  <div class="mylocationadd">
    <van-nav-bar title="修改地址" left-text="返回" left-arrow @click-left="$router.push('/myLocation')"/>
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
      let d = new Date()
      e.id = d.getTime()
      let res = JSON.parse(window.sessionStorage.allAddress)
      res[this.index] = e
      window.sessionStorage.setItem('allAddress', JSON.stringify(res))
      this.$router.push('/myLocation')
      this.$router.push('')
    },
    onChangeDetail(val) {}
  },
  beforeRouteEnter(to, from, next) {
    if (window.sessionStorage.allAddress) {
      next(vm => {
        vm.addressInfo = to.params.address
        vm.index = to.params.index
      })
    } else {
      return
    }
  }
}
</script>

<style lang="less" scoped>
</style>