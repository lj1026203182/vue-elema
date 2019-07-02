<template>
  <div class="rate van-hairline--top">
    <commit :rate="rate.rating"></commit>
    <div class="tags-wrapper">
      <ul class="tags">
        <li
          class="tag"
          v-for="(item, index) in rate.tags"
          :key="index"
          :class="{'unsatisfied':item.unsatisfied===true&&currentIndex!==index,
                  'unsatisfyactive':item.unsatisfied===true&&currentIndex===index,
                  'active':currentIndex===index }"
          @click="selectTag(item,index)"
        >
          <div class="name">{{item.name}}</div>
          <div class="count" v-if="item.count>0">{{item.count}}</div>
        </li>
      </ul>
    </div>
    <div class="onlycontent van-hairline--top-bottom" @click="showOnlyContent">
      <span class="icon" :class="{isContent:isContent===false}">
        <van-icon name="success" />
      </span>
      <span>只看有内容的评论</span>
    </div>
    <!-- 列表 -->
    <div class="commentsList">
      <ul class="comments">
        <li
          class="comment van-hairline--bottom"
          v-for="(item, index) in rate.comments"
          :key="index"
        >{{item.rated_at}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Commit from '../Commit'
export default {
  name: 'Rate',
  props: {
    data: Object
  },
  data() {
    return {
      rate: {},
      currentIndex: 0,
      isContent: true
    }
  },
  created() {
    this.rate = this.data.rate
    console.log(this.rate)
  },
  methods: {
    selectTag(item, index) {
      this.currentIndex = index
      // console.log(item);
    },
    showOnlyContent() {
      this.isContent = !this.isContent
      console.log(this.isContent);
    }
  },
  components: {
    Commit
  }
}
</script>

<style lang="less" scoped>
.rate {
  width: 100%;
  height: 100%;
  .tags-wrapper {
    margin-top: 10px;
    padding: 10px 20px 0 20px;
    background-color: #fff;
    .tags {
      display: flex;
      flex-wrap: wrap;
      .tag {
        box-sizing: border-box;
        margin: 0 10px 10px 0;
        width: 20%;
        height: 25px;
        line-height: 25px;
        display: flex;
        background-color: #ebf5ff;
        color: #6d7885;
        &.active {
          background-color: #0097ff;
          color: #fff;
        }
        &.unsatisfied {
          color: #aaa;
          background-color: #f5f5f5;
        }
        &.unsatisfyactive {
          color: #fff;
          background-color: #ccc;
        }

        .name {
          text-align: center;
          flex: 2;
          font-size: 10px;
        }
        .count {
          text-align: center;
          flex: 1;
          font-size: 10px;
        }
      }
    }
  }
  .onlycontent {
    padding: 0 20px;
    background-color: #fff;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    .icon {
      margin: 0 10px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      color: #fff;
      line-height: 12px;
      vertical-align: middle;
      background-color: #76d572;
      &.isContent {
        background-color: #666;
      }
    }
  }
  .commentsList {
    .comments {
      .comment {
      }
    }
  }
}
</style>