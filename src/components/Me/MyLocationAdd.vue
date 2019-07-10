<template>
  <div class="mylocationadd">
    <van-nav-bar title="添加地址" left-text="返回" left-arrow @click-left="$router.push('/myLocation')" />
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
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
      searchResult: [],
      isLoading: false
    }
  },
  created() {
    this.areaList = areaList
  },
  methods: {
    onSave(e) {
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
    onChangeDetail(val) {
      if (val) {
        const _this = this
        _this.searchResult = []
        _this.isLoading = true
        AMap.plugin('AMap.Autocomplete', function() {
          // 实例化Autocomplete
          var autoOptions = {
            //city 限定城市，默认全国
            city: _this.$store.getters.address
          }
          var autoComplete = new AMap.Autocomplete(autoOptions)
          autoComplete.search(val, function(status, result) {
            // 搜索成功时，result即是对应的匹配数据
            console.log(result)
            result.tips.forEach(item => {
              let temp = {}
              temp.name = item.name
              temp.address = item.address
              _this.searchResult.push(temp)
            })
            _this.isLoading = false
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>