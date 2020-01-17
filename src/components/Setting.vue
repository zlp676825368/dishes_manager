<template>
  <div class="content">
    <el-breadcrumb>
      <el-breadcrumb-item>餐厅配置</el-breadcrumb-item>
      <el-breadcrumb-item>基础配置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs :tab-position="tabPosition" :style="{height: '100%'}">
        <el-tab-pane label="餐桌配置">
            <tab-setting></tab-setting>
        </el-tab-pane>
        <el-tab-pane label="用餐人数">配置管理</el-tab-pane>
        <el-tab-pane label="口味配置">角色管理</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import TableSetting from 'components/setting/TableNoSetting'
export default {
    components:{
        "tab-setting":TableSetting
    },
  data() {
    return {
      tabPosition: "left"
    };
  }
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
  .el-breadcrumb{
      line-height: 12px;
  }
  .el-cart{
      flex: 1;
  }
}
</style>