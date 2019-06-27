<template>
  <div class="alphabet" ref="alphabet">
      <van-loading size="24px" vertical v-if="isLoading" color="#1989fa"
        >加载中...</van-loading
      >
    <div v-else>
      <!-- 热门城市 -->
      <div class="hot_wrap citylist">
        <div class="title">热门城市</div>
        <ul class="hot_citys">
          <li
            v-for="(item, index) in cityInfo.hotCities"
            :key="index"
            @click="$emit('selectCity', item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <!-- 所有城市 -->
      <van-index-bar :index-list="indexList">
        <div v-for="(item, index) in keys" :key="index">
          <van-index-anchor :index="item" />
          <van-cell
            @click="$emit('selectCity', item)"
            :title="item.name"
            v-for="(item, index) in cityInfo[item]"
            :key="index"
          />
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import Bscorll from "better-scroll";
export default {
  name: "Alphabet",
  props: {
    cityInfo: Object,
    keys: Array,
    isLoading: Boolean
  },
  data() {
    return {
      scroll: null
    };
  },
  methods: {
    initScroll() {
      // this.scroll = new Bscorll(this.$refs.alphabet, { click: true });
    }
  },
  computed: {
    indexList() {
      return this.keys;
    }
  }
};
</script>

<style lang="less" scoped>
.alphabet {
  margin-top: 10px;
  overflow: hidden;
  // height: 100%;
  .hot_wrap {
    background-color: #fff;
    padding: 10px 0;
    .title {
      color: #aaa;
      padding: 15px 0;
      text-indent: 1em;
    }
    .hot_citys {
      padding: 0 16px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      li {
        width: 40%;
        background: #f1f1f1;
        border-radius: 5px;
        margin: 0 10px 10px 0;
        text-align: center;
        padding: 10px;
        box-sizing: border-box;
      }
    }
  }
}
.van-loading {
  height: 100%;
  z-index: 999;
  margin: 100px auto;
}
</style>