<template>
  <div class="timetable">
    <h1>切换浏览器非移动端显示</h1>
    <div class="wrapper">
      <!-- 左侧 -->
      <div class="courseWrapper">
        <ul>
          <li v-for="(item, index) in course" :key="index" class="courses">
            <div
              id="course"
              draggable="true"
              @dragstart="ondragstart($event)"
              @drag="ondrag()"
              @dragend="ondragend()"
            >{{item}}</div>
          </li>
        </ul>
      </div>
      <!-- 右侧 -->
      <div class="tableWrapper">
        <div class="title">课程表</div>
        <div class="content">
          <div class="weeks">
            <div style="width:80px"></div>
            <div v-for="(item, index) in week" :key="index" class="week">{{item}}</div>
          </div>
          <div class="itemWrapper">
            <div style="width:80px"></div>
            <div
              class="item"
              @dragenter="ondragenter($event)"
              @dragover.prevent="ondragover($event)"
              @dragleave="ondragleave($event)"
              @drop.prevent="ondrop($event)"
            ></div>
            <div
              class="item"
              @dragenter="ondragenter($event)"
              @dragover.prevent="ondragover($event)"
              @dragleave="ondragleave($event)"
              @drop.prevent="ondrop($event)"
            ></div>
            <div
              class="item"
              @dragenter="ondragenter($event)"
              @dragover.prevent="ondragover($event)"
              @dragleave="ondragleave($event)"
              @drop.prevent="ondrop($event)"
            ></div>
            <div
              class="item"
              @dragenter="ondragenter($event)"
              @dragover.prevent="ondragover($event)"
              @dragleave="ondragleave($event)"
              @drop.prevent="ondrop($event)"
            ></div>
            <div
              class="item"
              @dragenter="ondragenter($event)"
              @dragover.prevent="ondragover($event)"
              @dragleave="ondragleave($event)"
              @drop.prevent="ondrop($event)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeTable',
  data() {
    return {
      week: ['星期一', '星期二', '星期三', '星期四', '星期五'],
      course: ['英语课', '数学课', '语文课', '体育课'],
      dom: null
    }
  },
  mounted() {},
  methods: {
    ondragstart(e) {
      console.log(e.target)
      this.dom = e.currentTarget
      e.target.classList.remove('active')
    },
    ondrag() {},
    ondragend() {},
    ondragenter(e) {
      if (e.target !== this.dom) {
        e.target.classList.add('active')
      }
    },
    ondragover(e) {},
    ondragleave(e) {
      if (e.target.id !== 'course') {
        e.target.classList.remove('active')
      }
    },
    ondrop(e) {
      e.preventDefault();
      
      console.log(e.target)
      if (e.target !== this.dom) {
        e.target.appendChild(this.dom)
      }
      this.dom = null
    }
  }
}
</script>

<style lang="less" scoped>
.timetable {
  border-collapse: collapse;
  h1 {
    text-align: center;
    font-size: 18px;
    font-weight: 700;
  }
  .wrapper {
    margin: 100px 100px;
    height: 500px;
    display: flex;

    .courseWrapper {
      flex: 1;
      border: 1px solid #000;
      display: flex;
      ul {
        width: 80%;
        margin: 0 auto;
        li {
          cursor: pointer;
          box-sizing: border-box;
          width: 80%;
          text-align: center;
          line-height: 40px;
          margin: 30px 0;
          #course {
            background-color: #95e1d3;
            margin: 0 10px;
          }
        }
      }
    }
    .tableWrapper {
      flex: 5;
      border: 1px solid #000;
      box-sizing: border-box;

      .title {
        box-sizing: border-box;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
        margin: 10px;
      }
      .content {
        .weeks {
          display: flex;
          .week {
            flex: 1;
            text-align: center;
            line-height: 20px;
            border: 1px solid #000;
          }
        }
        .itemWrapper {
          margin: 50px 0;
          display: flex;
          .item {
            flex: 1;
            text-align: center;
            line-height: 40px;
            height: 40px;
            border: 1px solid #000;
          }
        }
      }
    }
  }
}
.active {
  background-color: #ddd;
}
</style>