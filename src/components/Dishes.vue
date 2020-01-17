<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>菜式管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--头部搜索添加区域-->
      <el-row :gutter="10">
        <el-col :span="7">
          <div>
            <el-input placeholder="请输入菜品名称" clearable>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
        <!--头部添加按钮-->
        <el-col :span="3">
          <el-button type="primary" @click="addDishes">添加菜品</el-button>
        </el-col>
      </el-row>
      <el-table :data="dishes" border style="width: 100%" header-align="center"
        :row-style="{height:'32px'}"  :cell-style="{padding:'5px'}"
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="categroyId" label="所属类别"></el-table-column>
        <el-table-column prop="dishesName" label="菜品名称"></el-table-column>
        <el-table-column prop="price" label="单价"></el-table-column>
        <el-table-column label="操作">
          <template>
            <!--修改按钮-->
            <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
              ></el-button>
            </el-tooltip>
            <!--删除按钮-->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top-start"
              :enterable="false"
            >
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
    data() {
        return {
            dishes:[
                {id:'1',categroyId:1,dishesName:"娃娃菜炖豆腐",price:32.8, dist:"555"},
                {id:'2',categroyId:2,dishesName:"娃娃菜炖豆腐1",price:33.8, dist:"222"},
                {id:'3',categroyId:3,dishesName:"娃娃菜炖豆腐2",price:34.8, dist:"333"},
                {id:'4',categroyId:1,dishesName:"娃娃菜炖豆腐3",price:35.8, dist:"444"},
                {id:'5',categroyId:1,dishesName:"娃娃菜炖豆腐",price:32.8, dist:"555"},
                {id:'6',categroyId:2,dishesName:"娃娃菜炖豆腐1",price:33.8, dist:"222"},
                {id:'7',categroyId:3,dishesName:"娃娃菜炖豆腐2",price:34.8, dist:"333"},
                {id:'8',categroyId:1,dishesName:"娃娃菜炖豆腐3",price:35.8, dist:"444"}
            ]
        }
    },
    methods:{
        addDishes(){

        }
    }
};
</script>
<style lang="scss" scoped>
.el-table {
  margin-top: 10px;
  td,
  th {
    padding: 5px 0;
  }
}
.el-pagination{
    margin-top: 10px;
}
</style>