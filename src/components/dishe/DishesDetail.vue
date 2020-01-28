<template>
  <div class="content">
    <el-page-header @back="goBack" content="菜品详情"></el-page-header>
    <el-card>
      <el-form :label-position="labelPosition" label-width="80px" :model="food">
        <el-form-item label="菜品名称">
          <el-input v-model="food.foodName" disabled></el-input>
        </el-form-item>
        <el-form-item label="所属分类">
          <!--下拉选择-->
          <el-select v-model="food.cateId" disabled >
            <el-option
              v-for="(item,index) in categroys"
              :key="index"
              :label="item.categoryName"
              :value="item.categoryId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜品图片" >
          <div class="img">
            <img :src="food.imgUrl" :alt="food.foodName">
          </div>
        </el-form-item>
        <el-form-item label="菜品价格">
          <el-input type="number" min="1" v-model="food.price" disabled></el-input>
        </el-form-item>
        <el-form-item label="菜品描述">
          <el-input type="textarea" :rows="3" disabled v-model="food.foodDescribe"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  created(){
    this.getFood(this.$route.params.foodId);
    this.getCategroys();
  },
  data() {
    return {
      labelPosition: "right",
      food:{},
      categroys:[]
    };
  },
  methods: {
   async getFood(foodId){
      const {data:res}=await this.$http.get("/food/"+foodId); 
      if (res.code===10000) {
        this.food=res.data;
      } else {
        this.$message(res.message);
      }
    },
    //获取分类数据
    async getCategroys(){
      const {data:res}=await this.$http.get("/category/list");
      if (res.code===10000) {
        this.categroys=res.data;
      } else {
        this.$message(res.message);
      }
    },
    goBack() {
      this.$router.back(-1);
    },
  }
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
  .img{
    width: 100%;
    height: 150px;
    border: 1px solid #eee;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 140px;
      height: 140px;
    }
  }
  .el-page-header {
    line-height: 40px;
  }
  .el-card {
    flex: 1;
    position: relative;
    .el-form {
      position: absolute;
      width: 50%;
      left: 50%;
      transform: translate(-50%);
      .el-select {
        width: 100%;
      }
    }
  }
}
</style>