<template>
  <div
    class="filterview"
    :class="{ open: isSort || isScreen }"
    @click.self="hideView"
  >
    <!-- 导航 -->
    <aside class="filter">
      <van-row type="flex">
        <van-col
          span="6"
          v-for="(item, index) in filterData.navTab"
          :key="index"
          class="filter-nav"
          :class="{ active: currentIndex == index }"
          @click.native="filterSort(index)"
        >
          {{ item.name }}
          <van-icon name="arrow-down" v-if="item.icon === 'caret-down'" />
          <van-icon name="filter-o" v-if="item.icon === 'filter'" />
        </van-col>
      </van-row>
    </aside>
    <!-- 综合排序下拉 -->
    <section v-if="isSort" class="filter-extend">
      <van-list>
        <van-cell
          v-for="(item, index) in filterData.sortBy"
          :key="index"
          :title="item.name"
          @click="selectSort(item, index)"
          :class="{ active: selectedIndex == index }"
          class="filter-list"
        >
          <van-icon name="success" v-show="selectedIndex == index" />
        </van-cell>
      </van-list>
    </section>
    <!-- 筛选 -->
    <section v-if="isScreen" class="filter-extend">
      <div
        v-for="(items, index) in filterData.screenBy"
        :key="index"
        class="filter-content"
      >
        <van-row type="flex">
          <van-col span="24" offset="1">{{ items.title }}</van-col>
        </van-row>
        <div>
          <ul class="screenList">
            <li
              v-for="(item, index) in items.data"
              :key="index"
              :class="{ selected: item.select }"
              @click="selectScreen(item, items)"
            >
              <img v-if="item.icon" width="10px" :src="item.icon" />{{
                item.name
              }}
            </li>
          </ul>
        </div>
      </div>
      <van-row>
        <van-col span="12"
          ><van-button
            type="default"
            size="large"
            @click="clearSelected"
            :disabled="!disabled"
            >清空</van-button
          ></van-col
        >
        <van-col span="12"
          ><van-button type="primary" size="large" @click="confirmOK"
            >确定</van-button
          ></van-col
        >
      </van-row>
    </section>
  </div>
</template>

<script>
export default {
  name: "FilterView",
  props: {
    filterData: Object
  },
  data() {
    return {
      currentIndex: 0,
      selectedIndex: 0,
      isSort: false,
      isScreen: false
    };
  },
  methods: {
    // 选择导航
    filterSort(index) {
      this.currentIndex = index;
      if (index === 0) {
        this.isSort = true;
        this.isScreen = false;
        this.$emit("searchFixed", this.isSort);
      } else if (index === 1) {
        this.hideView();
        this.$emit("updata", {
          condition: this.filterData.navTab[index].condition
        });
      } else if (index === 2) {
        this.hideView();
        this.$emit("updata", {
          condition: this.filterData.navTab[index].condition
        });
      } else if (index === 3) {
        this.isSort = false;
        this.isScreen = true;
        this.$emit("searchFixed", this.isScreen);
      }
    },
    //综合排序
    selectSort(item, index) {
      this.filterData.navTab[0].name = item.name;
      this.selectedIndex = index;
      this.hideView();

      //更新数据
      this.$emit("updata", { condition: item.code });
      // console.log(item);
      // console.log(index);
    },
    //隐藏下拉列表
    hideView() {
      this.isSort = false;
      this.isScreen = false;
      this.$emit("searchFixed", false);
    },
    //选择筛选
    selectScreen(item, items) {
      if (items.id !== "MPI") {
        //单选
        items.data.forEach(el => {
          el.select = false;
        });
      }
      item.select = !item.select;
    },
    //清空
    clearSelected() {
      this.filterData.screenBy.forEach(el => {
        el.data.forEach(item => {
          item.select = false;
        });
      });
    },
    //确定
    confirmOK() {
      let res = {
        MPI: "",
        offer: "",
        per: ""
      };
      let multiple = "";
      this.filterData.screenBy.forEach(items => {
        items.data.forEach(item => {
          if (item.select) {
            if (items.id !== "MPI") {
              //单选
              // console.log(item.code);
              res[items.id] = item.code;
            } else {
              //多选
              multiple += item.code + ",";
              res[items.id] =multiple
            }
          }
        });
      });
      this.$emit("updata", { condition: res });
      this.hideView();
    }
  },
  computed: {
    //判断取消是否可点击
    disabled() {
      let res;
      this.filterData.screenBy.forEach(items => {
        res = items.data.some(item => {
          return item.select === true;
        });
      });
      return res;
    }
  }
};
</script>

<style lang="less" scoped>
.filterview {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding-top: 5px;
  position: sticky;
  top: 52px;
  z-index: 100;
  .filter {
    background-color: #fff;
    .filter-nav {
      text-align: center;
      font-size: 12px;
      color: #666;
      line-height: 30px;
      &.active {
        color: #009eef;
        font-weight: 600;
      }
    }
  }

  .filter-extend {
    width: 100%;
    background-color: #fff;

    .filter-list {
      line-height: 15px;
      font-size: 11px;
      &.active {
        color: #009eef;
        font-weight: 600;
      }
    }
    .filter-content {
      width: 100%;
      &:nth-child(3) {
        margin-bottom: 10px;
      }

      .van-col {
        line-height: 26px;
        color: #666;
        font-size: 14px;
      }
      .screenList {
        display: flex;
        flex-wrap: wrap;
        line-height: 28px;
        padding: 0 14px;

        li {
          font-size: 12px;
          width: 31.3%;
          text-align: center;
          background-color: #fafafa;
          margin: 5px 1%;
          img {
            vertical-align: middle;
            margin-right: 2px;
          }
        }
      }
    }
    .van-button--large {
      height: 44px;
      line-height: 44px;
    }
  }
}
.open {
  position: fixed;
  top: 48px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 3;
}
.van-icon {
  vertical-align: middle;
}
.selected {
  color: #3190e8 !important;
  background-color: #edf5ff !important;
}
</style>