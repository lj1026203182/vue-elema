<template>
  <div class="index">
    <router-view></router-view>
    <TabBar :tabBarData="tabBarData"></TabBar>
  </div>
</template>

<script>
import TabBar from "../components/TabBar/TabBar";
export default {
  name: "Index",
  data() {
    return {
      tabBarData:[
        {
          path:'/home',
          icon:'home-o',
          title:'首页'
        },
        {
          path:'/order',
          icon:'orders-o',
          title:'订单'
        },
        {
          path:'/me',
          icon:'user-o',
          title:'我的'
        }
      ]
    };
  },
  components: {
    TabBar
  }
};
</script>

<style lang="less" scoped>

</style>