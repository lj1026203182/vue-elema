<template>
  <div class="home">
    <!-- 地理位置 -->
    <div class="header">
      <div class="address_map" @click="clickToAddress">
        <van-icon name="location" />
        <span>{{ currentAddress }}</span>
        <van-icon name="arrow-down" />
      </div>
    </div>
    <!-- 搜索 -->
    <div
      class="search-wrapper"
      :class="{ fixedview: fixedview }"
      @click="$router.push('/search')"
    >
      <div class="shop_search">
        <van-icon name="search" />
        搜索商家 商家名称
      </div>
    </div>
    <div class="container">
      <!-- 轮播图 -->
      <div class="swiper-img">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in swipeImgs" :key="index">
            <div class="item-img">
              <van-image width="100%" fit="cover" :src="image" />
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- icon -->
      <div class="swiper-icon">
        <van-swipe :loop="false">
          <van-swipe-item
            v-for="(items, index) in swipeIcons"
            :key="index"
            class="items-icon"
          >
            <ul>
              <li v-for="(item, index) in items" :key="index" class="icon">
                <div class="img-wrapper"><img :src="item.image" alt="" /></div>
                <p>{{ item.name }}</p>
              </li>
            </ul>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="shoplist-title">推荐商家</div>
      <filter-view
        :filterData="filterData"
        @searchFixed="searchFixed"
        @updata="updata"
      ></filter-view>
      <!-- 下拉刷新 -->
      <!-- <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
        <p>刷新次数</p>
      </van-pull-refresh> -->
      <!-- 商家列表 -->
      <div class="shoplist">
        <van-loading size="24px" vertical color="#1989fa" v-if="isLoading"
          >加载中...</van-loading
        >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          v-else
        >
          <van-cell v-for="(item, index) in restaurants" :key="index"
            ><index-shop :restaurant="item.restaurant"></index-shop
          ></van-cell>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { getApi, serverApi } from "../axios/index";
import FilterView from "../components/FilterView/FilterView";
import IndexShop from "../components/IndexShop";
export default {
  name: "Home",
  data() {
    return {
      value: "",
      swipeImgs: [],
      swipeIcons: [],
      indicator: "",
      isLoading: false,
      filterData: {},
      fixedview: false,
      data: "",
      page: 1,
      size: 5,
      restaurants: [],
      loading: false,
      finished: false
      // isRefresh:false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getApi(
        "/profile/shopping",
        response => {
          // console.log(response);
          if (response.statusText === "OK") {
            this.swipeImgs = response.data.swipeImgs;
            this.swipeIcons = response.data.entries;
          }
        },
        error => {
          // console.log(error);
        }
      );
      getApi(
        "/profile/filter",
        response => {
          // console.log(response);
          this.filterData = response.data;
        },
        error => {
          console.log(error);
        }
      );
      this.loadData();
    },
    loadData() {
      this.isLoading = true;
      this.page = 1;
      serverApi(
        `/profile/restaurants/${this.page}/${this.size}`,
        this.data,
        response => {
          this.isLoading = false;
          this.restaurants = response.data;
        },
        error => {
          console.log(error);
        }
      );
    },
    // 跳转到收货地址
    clickToAddress() {
      this.$router.push({
        name: "Address",
        params: { city: this.currentCity, address: this.currentAddress }
      });
    },
    // sticky效果
    searchFixed(show) {
      this.fixedview = show;
    },
    //更新列表数据
    updata(condition) {
      this.data = condition;
      // console.log(this.data);
      this.loadData();
    },
    onSearch() {
      console.log(this.value);
    },
    // 上啦加载
    onLoad() {
      if (!this.finished) {
        this.page++;
      }
      setTimeout(() => {
        serverApi(
          `/profile/restaurants/${this.page}/${this.size}`,
          this.data,
          response => {
            response.data.forEach(element => {
              this.restaurants.push(element);
            });
            this.loading = false;
            if (response.data.length < this.size) {
              this.finished = true;
            }
          },
          error => {
            console.log(error);
          }
        );
      }, 500);
    }
    //下拉刷新
    // onRefresh(){
    //     this.$toast('刷新成功');
    //
    // }
  },
  computed: {
    currentAddress() {
      if (!this.$store.getters.address) {
        return "正在定位中...";
      } else return this.$store.getters.address;
    },
    currentCity() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    }
  },
  components: {
    FilterView,
    IndexShop
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.header {
  background-color: #009eef;
  padding: 16px 16px 0;
}
.header .address_map {
  color: #fff;
  font-weight: bold;
}
.address_map i {
  margin: 0 3px;
  font-size: 18px;
}
.address_map span {
  display: inline-block;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.van-icon {
  vertical-align: bottom;
}

.shop_search {
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}
.van-loading {
  margin: 30px auto;
}
.swiper-img {
  .item-img {
    width: 100%;
  }
}
.swiper-icon {
  background-color: #fff;
  width: 100%;

  .items-icon {
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      box-sizing: border-box;
      .icon {
        width: 20%;
        .img-wrapper {
          width: 100%;

          img {
            width: 100%;
            text-align: center;
          }
        }
        p {
          margin: 5px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
}
.shoplist-title {
  display: flex;
  align-items: flex;
  justify-content: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #333;
  background: #fff;
}
.shoplist-title:after,
.shoplist-title:before {
  display: block;
  content: "一";
  width: 5.333333vw;
  height: 0.266667vw;
  color: #999;
}
.shoplist-title:before {
  margin-right: 3.466667vw;
}
.shoplist-title:after {
  margin-left: 3.466667vw;
}
.search-wrapper {
  position: sticky;
  box-sizing: border-box;
  top: 0;
  z-index: 999999;
  background-color: #009eef;
  padding: 10px 16px;
}
.fixedview {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 999;
  box-sizing: border-box;
}
.shoplist {
  width: 100%;
  height: 100%;
  margin-bottom: 50px;
}
</style>