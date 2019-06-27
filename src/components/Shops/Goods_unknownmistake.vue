<template>
  <div class="goods" v-if="data.menu">
    <van-row type="flex">
      <!-- 左侧 -->
      <van-col span="6" class="left_wrapper" ref="menuWrapper">
        <div>
          <van-row
            type="flex"
            justify="center"
            align="center"
            class="sorts"
            v-for="(items, index) in data.menu"
            :key="index"
          >
            <van-col class="sorts_name">
              <span>{{items.name}}</span>
            </van-col>
          </van-row>
        </div>
      </van-col>
      <!-- 右侧 -->
      <van-col span="18" class="right_wrapper">
        <div>
          <div v-for="(items, index) in data.menu" :key="index" class="foods">
            <van-row type="flex" class="foods_title" gutter="10">
              <van-col class="title_name">{{items.name}}</van-col>
              <van-col class="title_desc">{{items.description}}</van-col>
            </van-row>
            <van-row
              type="flex"
              v-for="(item, index) in items.foods"
              :key="index"
              class="foods_desc"
              gutter="6"
            >
              <van-col class="foods_img">
                <van-image width="80" height="80" fit="cover" :src="item.image_path"/>
              </van-col>
              <van-col class="foods_content van-hairline--bottom">
                <van-row class="van-ellipsis">
                  <van-col span="24" class="content_title">{{item.name}}</van-col>
                </van-row>
                <van-row>
                  <van-col span="24" class="content_desc">
                    <span class="van-ellipsis">{{item.description}}</span>
                  </van-col>
                </van-row>
                <van-row type="flex" class="content_rate" gutter="6">
                  <van-col class="rate">月售{{item.rating_count}}份</van-col>
                  <van-col class="satisfy">好评率{{item.satisfy_rate}}%</van-col>
                </van-row>
              </van-col>
            </van-row>
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  name: "Goods",
  props: {
    data: Object
  },
  data() {
    return {};
  },
  created() {
    console.log(this.data.menu);
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  methods: {
    _initScroll() {
      // console.log(this.$refs);
      this.menuScroll = new Bscroll(this.$refs.menuWrapper, {
        mouseWheel: true,
        click: true,
        tap: true
      });
      // console.log(this.menuScroll);
      // this.foodScroll = new Bscroll(this.$refs.foodsWrapper, {
      //   probeType: 3,
      //   click: true
      // });
    }
  }
};
</script>

<style lang="less" scoped>
.goods {
  overflow: hidden;
  height: 100%;
  width: 100%;
  .left_wrapper {
    .sorts {
      height: 46px;
      &.active {
        background-color: #fff;
      }
      .sorts_name {
        padding: 0 5px;
        font-size: 13px;
        line-height: 20px;
        text-align: center;
      }
    }
  }
  .right_wrapper {
    .foods {
      .foods_title {
        padding: 0 10px;
        line-height: 26px;
        .title_name {
          font-size: 12px;
          font-weight: 700;
          color: #666;
        }
        .title_desc {
          font-size: 10px;
          color: #999;
        }
      }
      .foods_desc {
        padding: 10px;
        background-color: #fff;
        .foods_content {
          width: 100%;
          line-height: 20px;
          .content_title {
            font-size: 14px;
            font-weight: 700;
            color: #333;
          }
          .content_desc {
            font-size: 10px;
            color: #999;
            span {
              width: 100%;
            }
          }
          .content_rate {
            font-size: 10px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>