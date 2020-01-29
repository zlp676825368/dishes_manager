<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>菜式管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="10">
        <!--头部添加按钮-->
        <el-col :span="3">
          <el-button type="primary" size="mini" @click="addDishes">添加菜品</el-button>
        </el-col>
        <!--头部搜索添加区域-->
        <el-col :span="5">
          <div>
            <el-input size="mini" v-model="pages.foodName" placeholder="请输入菜品名称" clearable></el-input>
          </div>
        </el-col>
        <!--下拉选择-->
        <el-col :span="5">
          <el-select
            v-model="pages.cateId"
            @clear="clearSelect"
            size="mini"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="(item,index) in categroys"
              :key="index"
              :label="item.categoryName"
              :value="item.categoryId"
            ></el-option>
          </el-select>
        </el-col>
        <!--查询按钮-->
        <el-col :span="3">
          <el-button type="primary" size="mini" @click="search">查询</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="foods"
        border
        style="width: 100%"
        header-align="center"
        :row-style="{height:'32px'}"
        :cell-style="{padding:'5px'}"
      >
        <el-table-column prop="foodId" label="ID"></el-table-column>
        <el-table-column prop="cateName" label="所属类别"></el-table-column>
        <el-table-column prop="foodName" label="菜品名称"></el-table-column>
        <el-table-column prop="price" label="单价"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--详情按钮-->
            <el-tooltip class="item" effect="dark" content="详情" placement="left" :enterable="false">
              <el-button
                @click="detail(scope.row)"
                type="primary"
                size="mini"
                icon="el-icon-document"
              ></el-button>
            </el-tooltip>
            <!--修改按钮-->
            <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="top-start"
              :enterable="false"
            >
              <el-button @click="edit(scope.row)" type="primary" size="mini" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <!--删除按钮-->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="right"
              :enterable="false"
            >
              <el-button type="danger" @click="del(scope.row)" icon="el-icon-delete" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pages.pageIndex"
        :page-sizes="[5, 8, 10]"
        :page-size.sync="pages.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pages.total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  created() {
    this.getFoods();
    this.getCategroys();
  },
  data() {
    return {
      //分页查询对象
      pages: {
        pageIndex: 1,
        pageSize: 8,
        cateId: null,
        foodName: "",
        total: 0
      },
      foods: [],
      categroys: [],
      dialogVisible: false,
      dishe: null
    };
  },
  methods: {
    //获取分页数据
    async getFoods() {
      const { data: res } = await this.$http.post("/food/pages", this.pages);
      if (res.code === 10000) {
        this.foods = res.data.rows;
        this.pages.total = res.data.total;
      } else {
        this.$message(res.message);
      }
    },
    //查询按钮事件
    search() {
      this.pages.pageIndex = 1;
      this.getFoods();
    },
    //删除事件
    del(food) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data: res } = await this.$http.delete("/food/" + food.foodId);
          if (res.code === 10000) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getFoods();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //下拉清空按钮事件
    clearSelect() {
      this.pages.cateId = null;
    },

    //获取分类数据
    async getCategroys() {
      const { data: res } = await this.$http.get("/category/list");
      if (res.code === 10000) {
        this.categroys = res.data;
      } else {
        this.$message(res.message);
      }
    },
    //添加菜品
    addDishes() {
      this.$router.push({
        path: "/addDishes"
      });
    },
    //菜品详情
    detail(food) {
      this.$router.push({
        path: "/dishesDetail/" + food.foodId
      });
    },
    //修改菜品
    edit(food) {
      this.$router.push({
        path: "/editDishes/" + food.foodId
      });
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    handleSizeChange() {
      this.pages.pageIndex = 1;
      this.getFoods();
    },
    handleCurrentChange() {
      this.getFoods();
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
.el-pagination {
  margin-top: 10px;
}
</style>