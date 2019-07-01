<template>
  <div class="me">
    <div class="headInfo">
      <div class="head-img">
        <img src alt>
      </div>
      <div class="head-profile">
        <div class="user-id">登录/注册</div>
        <div class="user-phone">
          <span>登录后享受更多特权</span>
        </div>
      </div>
      <div class="more-info">
        <van-icon name="arrow"/>
      </div>
    </div>
    <van-cell title="我的地址" is-link to="mylocation">
      <template slot="icon">
        <van-icon name="location" color="rgb(74, 165, 240)"/>
      </template>
    </van-cell>
    <van-cell title="课程表" is-link to="timetable"></van-cell>
  </div>
</template>

<script>
export default {
  name: 'Me',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.me {
  width: 100%;
  height: 100%;

  .headInfo {
    display: flex;
    background-image: linear-gradient(90deg, #0af, #0085ff);
    padding: 6.666667vw 4vw;
    color: #fff;
    align-items: center;
    .head-img {
      width: 60px;
      height: 60px;
    }
    .head-profile {
      .user-id {
        max-width: 40vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 1.3rem;
        margin-bottom: 2.133333vw;
        font-weight: 700;
        display: flex;
        align-items: center;
      }
      .user-phone {
        display: flex;
        align-items: center;
        font-size: 0.8rem;
      }
    }
    .more-info {
      
    }
  }
}
.van-icon {
  line-height: 20px;
}
.van-cell {
  margin-bottom: 15px;
}
</style>