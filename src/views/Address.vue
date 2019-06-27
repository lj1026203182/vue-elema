<template>
  <div class="address">
    <van-nav-bar
      title="选择收货地址"
      left-text="返回"
      left-arrow
      @click-left="$router.push('/')"
    />
    <form action="#">
      <van-search
        placeholder="小区/学校/写字楼等"
        v-model="search_val"
        shape="round"
      >
        <div slot="label" @click="goToCity">
          {{ city }}
          <van-icon name="arrow-down" />
        </div>
      </van-search>
    </form>
    <Location :address="address" @selectCity="chooseLocation"></Location>
    <div>
      <van-loading size="24px" vertical v-if="isLoading" color="#1989fa"
        >加载中...</van-loading
      >
    </div>
    <div class="areaList-wrapper">
      <ul>
        <li
          v-for="(item, index) in areaList"
          :key="index"
          class="areaList van-hairline--bottom"
          @click="chooseLocation(item)"
        >
          <div class="list-name van-ellipsis">{{ item.name }}</div>
          <div class="list-desc van-ellipsis">
            {{ item.district }}
            <span v-if="item.address">{{ item.address }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Location from "../components/Location/Location";
export default {
  name: "Address",
  data() {
    return {
      search_val: "",
      city: "",
      areaList: [],
      isLoading: false
    };
  },
  methods: {
    goToCity() {
      this.$router.push("/city");
      this.search_val = "";
    },
    chooseLocation(item) {
      if (item) {
        this.$store.dispatch("setAddress", item.district + item.address);
      } else {
        this.$store.dispatch("setAddress", this.address);
      }
      this.$router.push("/home");
    },
    searchPlace() {
      const _this = this;
      _this.isLoading = true;
      AMap.plugin("AMap.Autocomplete", function() {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: _this.city
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(_this.search_val, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          // console.log(result);
          _this.areaList = result.tips;
          _this.isLoading = false;
        });
      });
    }
  },
  computed: {
    address() {
      return this.$store.getters.location.formattedAddress;
    }
  },
  watch: {
    search_val() {
      this.searchPlace();
    }
  },
  components: {
    Location
  },
  beforeRouteEnter(to, from, next) {
    next(el => {
      // console.log(el);
      el.city = to.params.city;
    });
  }
};
</script>

<style lang="less" scoped>
.van-icon {
  vertical-align: middle;
}
.areaList-wrapper {
  margin-top: 20px;
  background-color: #fff;
  .areaList {
    padding: 10px 15px;
    .list-name {
      font-weight: 700;
      margin-bottom: 8px;
    }
    .list-desc {
      color: #666;
    }
  }
}
.van-loading {
  margin: 100px auto;
}
</style>