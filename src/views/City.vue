<template>
  <div class="city">
    <div>
      <form action="/">
        <van-search
          placeholder="输入城市名"
          v-model="city_val"
          show-action
          @cancel="selectCity"
        />
      </form>
    </div>
    <div v-if="city_val" class="searchList">
      <ul>
        <li
          @click="selectCity(item)"
          v-for="(item, index) in searchList"
          :key="index"
          class="list van-hairline--bottom"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div style="height:100%" v-else>
      <Location :address="currentCity" @selectCity="selectCity"></Location>
      <Alphabet
        @selectCity="selectCity"
        ref="allcities"
        :cityInfo="cityInfo"
        :keys="keys"
        :isLoading="isLoading"
      ></Alphabet>
    </div>
  </div>
</template>

<script>
import Location from "../components/Location/Location";
import Alphabet from "../components/Alphabet/Alphabet";
import { getApi } from "../axios/index";
export default {
  name: "City",
  data() {
    return {
      city_val: "",
      cityInfo: {},
      keys: [],
      isLoading: false,
      allcities: [],
      searchList: []
    };
  },
  created() {
    this.getCityInfo();
  },
  methods: {
    getCityInfo() {
      this.isLoading = true;
      getApi(
        "/posts/cities",
        res => {
          // console.log(res);
          if (res.statusText === "OK") {
            this.isLoading = false;
            this.cityInfo = res.data;
            //将对象的键取出来放到数组keys中
            this.keys = Object.keys(res.data);
            this.keys.pop();
            this.keys.sort();
            this.$nextTick(() => {
              this.$refs.allcities.initScroll();
            });
            // console.log(this.keys);
            // console.log(this.cityInfo);
            this.keys.forEach(key => {
              this.cityInfo[key].forEach(city => {
                this.allcities.push(city);
              });
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    selectCity(city) {
      if (city) {
        this.$router.push({ name: "Address", params: { city: city.name } });
      } else {
        this.$router.push({ name: "Address", params: { city: this.currentCity } });
      }
    },
    searchCities() {
      if (!this.city_val) {
        this.searchList = [];
      } else {
        this.searchList = this.allcities.filter(el => {
          return el.name.indexOf(this.city_val) != -1;
        });
      }
    }
  },
  components: {
    Location,
    Alphabet
  },
  computed: {
    currentCity() {
      return (
        this.$store.getters.location.addressComponent.district ||
        this.$store.getters.location.addressComponent.province
      );
    }
  },
  watch: {
    city_val() {
      this.searchCities();
    }
  }
};
</script>

<style lang="less" scoped>
.city {
  height: 100%;
}
.searchList {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .list {
    padding: 10px;
    font-size: 14px;
  }
}
</style>