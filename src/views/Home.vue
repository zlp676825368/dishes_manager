<template>
  <el-container>
    <el-header>
      <div>
        <img src="~/assets/logo.png" alt />
        <span>点餐后台管理系统</span>
      </div>
      <el-button type="info" size="mini" @click="out">退出</el-button>
    </el-header>
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse?'64px':'17%'">
        <div class="toggle-button" @click="toggleButton">|||</div>
        <!--侧边栏菜单区域-->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <!--一级菜单-->
          <el-submenu v-for="item in menus" :key="item.id" :index="item.id">
            <!--一级菜单模板-->
            <template slot="title">
              <!--一级菜单图标-->
              <i class="el-icon-share"></i>
              <!--一级菜单文本-->
              <span>{{item.title}}</span>
            </template>
            <!--二级菜单-->
            <el-menu-item v-for="children in item.children" :key="children.id" :index="'/'+children.path">
              <!--二级菜单模板-->
              <template slot="title">
                <!--二级菜单图标-->
                <i class="el-icon-menu"></i>
                <!--二级菜单文本-->
                <span>{{children.title}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false,
      menus: [
        {
          title: "菜式管理",
          id: "1",
          path: "",
          children: [
            { id: "2", title: "分类管理", path: "category" },
            { id: "3", title: "菜品管理", path: "dishes" }
          ]
        },
        {
          title: "餐厅配置",
          id: "4",
          path: "",
          children: [
            { id: "5", title: "基础配置", path: "setting" }
          ]
        },
        {
          title: "订单管理",
          id: "6",
          path: "",
          children: [
            { id: "7", title: "今日订单", path: "todayOrder" },
            { id: "8", title: "历史订单", path: "historyOrder" },
          ]
        },
        {
          title: "报表统计",
          id: "9",
          path: "",
          children: [
            { id: "10", title: "图形报表", path: "report" }
          ]
        }
      ]
    };
  },
  methods: {
    toggleButton() {
      this.isCollapse=!this.isCollapse;
    },
    out(){
      this.$router.replace("/");
    }
  }
};
</script>
<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-main{
  padding: 10px;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 100%;
    }
    span {
      margin-left: 20px;
      font-size: 22px;
      color: #fff;
    }
  }
}
.el-aside {
  background-color: #333744;
  .toggle-button {
    background-color: #4a5046;
    color: #fff;
    line-height: 24px;
    font-size: 10px;
    text-align: center;
    letter-spacing: 3px;
    cursor: pointer;
  }
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
</style>