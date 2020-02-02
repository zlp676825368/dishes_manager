<template>
  <div class="content">
    <el-breadcrumb>
      <el-breadcrumb-item>餐厅配置</el-breadcrumb-item>
      <el-breadcrumb-item>基础配置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs :tab-position="tabPosition" :style="{height: '100%'}">
        <el-tab-pane :label="'全部('+count+')'">
          <tab-setting :tabs="types"></tab-setting>
        </el-tab-pane>
        <el-tab-pane
          v-for="(item,index) in types"
          :key="index"
          :label="item.name+'('+item.list.length+')'"
        >
        <tab-setting :tabs="tabItem(item.id)"></tab-setting>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    
  </div>
</template>
<script>
import TableSetting from "components/setting/TableNoSetting";
export default {
  created() {
    this.getTypes();
  },
  components: {
    "tab-setting": TableSetting
  },
  methods: {
    tabItem(id){
      return this.types.filter(item=>{
        if (item.id===id) {
          return true;
        }
      })
    },
    async getTypes() {
      const { data: res } = await this.$http.get("/tab/type");
      if (res.code === 10000) {
        this.types = res.data;
        let count = 0;
        this.types.map(value => {
          count += value.list.length;
        });
        this.count = count;
        
      }
    }
  },
  data() {
    return {
      tabPosition: "top",
      types: [],
      count: 0
    };
  }
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
  .el-breadcrumb {
    line-height: 12px;
  }
  .el-cart {
    flex: 1;
    overflow-y: auto !important;
  }
}
</style>