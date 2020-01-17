<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>菜式管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--头部搜索添加区域-->
      <el-row :gutter="10">
        <el-col :span="7">
          <div>
            <el-input placeholder="请输入内容" v-model.trim="categroyName" clearable>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
        <!--头部添加按钮-->
        <el-col :span="3">
          <el-button type="primary" @click="addCategory">添加分类</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="categroys"
        border
        style="width: 100%"
        header-align="center"
        :row-style="{height:'32px'}"  
        :cell-style="{padding:'4px'}"
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="categroyName" label="分类名称"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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
                @click="updateCate(scope.row)"
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
    </el-card>
    <!--添加分类对话框-->
    <cate-dialog :dialogVisible="dialogVisible" :categroy="categroy" @closeDialog="close"></cate-dialog>
  </div>
</template>
<script>
import CateGoryDiaLog from "dialog/CateGoryDiaLog";
export default {
  data() {
    return {
      //搜索框model
      categroyName: "",
      categroy: {},
      //列表数据
      categroys: [
        { id: "1", categroyName: "精选热菜" },
        { id: "2", categroyName: "城乡小炒" },
        { id: "3", categroyName: "田园时蔬" }
      ],
      //弹出新增框
      dialogVisible: false
    };
  },
  components: {
    "cate-dialog": CateGoryDiaLog
  },
  methods: {
    handleClose() {},
    //弹出框关闭时间，自定义事件
    close() {
      this.dialogVisible = false;
    },
    //添加分类
    addCategory() {
      this.categroy = null;
      this.dialogVisible = true;
    },
    //修改分类
    updateCate(cate) {
      this.categroy = cate;
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-table{
  font-size: 12px;
  margin-top: 10px;
}


</style>