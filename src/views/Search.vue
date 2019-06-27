<template>
  <div class="search">
    <!-- 脑壳 -->
    <van-nav-bar
      right-text="搜索"
      left-arrow
      @click-left="$router.back()"
      @click-right="onClickRight"
    >
      <div slot="title">
        <van-search
          placeholder="输入商家,商品信息"
          v-model="key_word"
          clearable
        />
      </div>
    </van-nav-bar>
    <!-- 列表 -->
    <van-list>
      <van-cell
        v-for="(item, index) in result.words"
        :key="index"
        :title="item"
      />
    </van-list>
  </div>
</template>

<script>
import { serverApi, getApi } from "../axios/index";
export default {
  name: "Search",
  data() {
    return {
      key_word: "",
      result: {}
    };
  },
  watch: {
    key_word() {
      this.searched();
    }
  },
  created() {},
  methods: {
    onClickRight() {},
    searched() {
      getApi(
        `/profile/typeahead/${this.key_word}`,
        response => {
          console.log(response);
          this.result = response.data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  .van-nav-bar {
    height: 54px;
    line-height: 54px;
  }
}
</style>