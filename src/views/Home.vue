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
          <el-submenu v-for="(item,key) in menus" :key="key" :index="''+key">
            <!--一级菜单模板-->
            <template slot="title">
              <!--一级菜单图标-->
              <i class="el-icon-share"></i>
              <!--一级菜单文本-->
              <span>{{item.menuName}}</span>
            </template>
            <!--二级菜单-->
            <el-menu-item v-for="(children,index) in item.children" :key="index" :index="'/'+children.path">
              <!--二级菜单模板-->
              <template slot="title">
                <!--二级菜单图标-->
                <i class="el-icon-menu"></i>
                <!--二级菜单文本-->
                <span>{{children.menuName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  created(){
    this.getMenus();
  },
  data() {
    return {
      isCollapse: false,
      menus: []
    };
  },
  methods: {
    //获取菜单
    async getMenus(){
      const {data:res}= await this.$http.get("/menus");
      if (res.code===10000) {
        this.menus=res.data;
      }else{
        this.$message(res.message);
      }  
    },

    toggleButton() {
      this.isCollapse=!this.isCollapse;
    },
    out(){
      window.sessionStorage.removeItem("token");
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
.el-scrollbar{
  height: 100%;
}
.el-scrollbar__bar{
  &.is-vertical{
    width:100px;//滚动条宽度
  }
}
.el-scrollbar__wrap{
  overflow-y: scroll;
  overflow-x:hidden;
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