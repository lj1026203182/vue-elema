<template>
  <div class="goods">
    <!-- 左侧menu -->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="menu-items">
        <li
          class="menu-content border-bottom"
          v-for="(item, index) in data.menu"
          :key="index"
          ref="menuList"
          :class="{'current':currentIndex===index}"
          @click="handleClickFoods(item,index)"
        >
          <span class="menu-text">
            <span class="menu-icon"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <!-- 右侧食物 -->
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="foods-list" v-for="(items, index) in data.menu" :key="index" ref="foodsList">
          <h1 class="list-title">{{items.name}}</h1>
          <ul>
            <li class="foods-item border-bottom" v-for="(item, index) in items.foods" :key="index">
              <!-- 图片 -->
              <img class="item-pic" :src="item.image_path" alt />
              <!-- 套餐信息 -->
              <div class="item-content">
                <div class="item-title">{{item.name}}</div>
                <div class="item-dec van-ellipsis">{{item.description}}</div>
                <div class="item-sell">
                  <span class="sell-selled">月售{{item.sellCount}}份</span>
                  <span class="sell-rating">好评{{item.rating}}%</span>
                </div>
                <div class="item-price">
                  <span class="newprice">{{item.activity.fixed_price}}</span>
                  <span class="oldprice">{{item.oldPrice}}</span>
                </div>
              </div>
              <!-- 右侧添加购物车按钮 -->
              <div class="control-wrapper">
                <car-control class="car-control" :food="item"></car-control>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 底部shopcart组件-->
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import CarControl from '../CarControl'
export default {
  name: 'Goods',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      foodsHeightList: [],
      scrollY: '',
      selectedFoods: []
    }
  },
  created() {},
  methods: {
    //betterscroll
    _initScroll() {
      if (this.data.menu.length !== 0) {
        this.menuScroll = new Bscroll(this.$refs.menuWrapper, {
          mouseWheel: true,
          click: true,
          tap: true
        })
        this.foodsWrapper = new Bscroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true,
          mouseWheel: true
        })
        //获取当前foods栏滚动高度
        this.foodsWrapper.on('scroll', pos => {
          this.scrollY = Math.abs(Math.floor(pos.y))
        })
      }
    },
    _calFoodsHeightList() {
      const height = this.$refs.foodsList
      if (height) {
        for (let i = 0; i < height.length; i++) {
          this.foodsHeightList.push(height[i].offsetTop)
        }
      }
    },
    handleClickFoods(item, index) {
      this.foodsWrapper.scrollToElement(this.$refs.foodsList[index], 300)
    },
    followScroll(index) {
      this.menuScroll.scrollToElement(this.$refs.menuList[index], 300, 0, -100)
    }

    // selectFood(nums, item) {
    //   item.count = nums
    //   // console.log(this.data.menu)
    // }
  },
  components: {
    CarControl
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.foodsHeightList.length; i++) {
        let height1 = this.foodsHeightList[i]
        let height2 = this.foodsHeightList[i + 1]
        if (this.scrollY > height1 && this.scrollY <= height2) {
          this.followScroll(i)
          return i
        }
      }
      return 0
    }
  },
  mounted() {
    //该时间点可以最先操作DOM节点    created不能操作
    this._initScroll()
    this._calFoodsHeightList()
  }
}
</script>

<style lang="less" scoped>
.goods {
  height: 100%;
  display: flex;
  font-weight: 200;
  height: calc(100% - 86px);

  .menu-wrapper {
    width: 80px;
    height: 500px;
    background-color: #f3f5f7;

    .menu-items {
      .menu-content {
        width: 100%;
        height: 54px;
        line-height: 14px;
        display: table;
        text-align: center;

        &.current {
          background-color: #fff;
          font-weight: 600;
        }

        .menu-text {
          display: table-cell;
          vertical-align: middle;
          font-size: 12px;
          color: rgb(7, 20, 20);

          .menu-icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            background-repeat: no-repeat;
            background-size: 12px 12px;
          }
        }
      }
    }
  }

  .foods-wrapper {
    flex: 1;
    height: 600px;
    // border: 1px solid #000;
    box-sizing: border-box;

    .foods-list {
      .list-title {
        width: 100%;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        text-indent: 14px;
        background-color: #f3f5f7;
        font-size: 12px;
        color: rgb(147, 153, 159);
        box-sizing: border-box;
        font-weight: normal;
      }

      .foods-item {
        text-indent: 0;
        padding: 18px;
        display: flex;
        position: relative;
        background-color: #fff;

        .item-pic {
          width: 57px;
          height: 57px;
        }

        .item-content {
          flex: 1;
          margin-left: 10px;

          .item-title {
            margin-top: 2px;
            font-size: 14px;
            color: rgb(7, 17, 27);
            line-height: 14px;
          }

          .item-dec {
            margin-top: 8px;
            font-size: 10px;
            line-height: 16px;
            width: 120px;
            color: rgb(147, 153, 159);
            line-height: 10px;
          }

          .item-sell {
            margin-top: 8px;
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;

            .sell-selled {
              display: inline-block;
              margin-right: 8px;
            }
          }

          .item-price {
            line-height: 24px;

            .newprice {
              font-size: 14px;
              color: rgb(240, 20, 20);
              font-weight: 700;
            }

            .oldprice {
              font-size: 10px;
              color: rgb(147, 153, 159);
              font-weight: normal;
              text-decoration: line-through;
            }
          }
        }

        .control-wrapper {
          position: absolute;
          right: 15px;
          bottom: 4px;
        }

        .car-control {
        }
      }
    }
  }
}
</style>
