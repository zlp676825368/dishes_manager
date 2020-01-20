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
            <el-input size="mini" placeholder="请输入内容" v-model.trim="categroyName" clearable>
              <el-button size="mini" slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
        <!--头部添加按钮-->
        <el-col :span="3">
          <el-button type="primary" size="mini" @click="addCategory">添加分类</el-button>
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
        <el-table-column prop="categoryId" label="ID"></el-table-column>
        <el-table-column prop="categoryName" label="分类名称"></el-table-column>
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
  created(){
    this.getCategorys();
  },
  data() {
    return {
      //搜索框model
      categroyName: "",
      categroy: {
        'categoryId':0,
        'categoryName':''
      },
      //列表数据
      categroys: [],
      //弹出新增框
      dialogVisible: false
    };
  },
  components: {
    "cate-dialog": CateGoryDiaLog
  },
  methods: {
    //获取分类数据
    async getCategorys(){
      const {data:res}= await this.$http.get("/category/list");
      if (res.code===10000) {
        this.categroys=res.data;
      }else{
        this.$message(res.message);
      }
    },
    handleClose() {},
    //弹出框关闭时间，自定义事件
    close(categroy) {
      this.categroy= {
        'categoryId':0,
        'categoryName':''
      }
      this.dialogVisible = false;
      this.getCategorys();
    },
    //添加分类
    addCategory() {
      this.dialogVisible = true;
    },
    //修改分类
    updateCate(cate) {
      this.categroy.categoryId=cate.categoryId;
      this.categroy.categoryName=cate.categoryName;
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