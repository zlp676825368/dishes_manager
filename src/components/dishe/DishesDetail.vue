<template>
  <div class="content">
    <el-page-header @back="goBack" content="详情页面"></el-page-header>
    <el-card>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="foodData"
        ref="foodDataRef"
        :rules="foodDataRules"
      >
        <el-form-item label="菜品名称" prop="foodName">
          <el-input v-model="foodData.foodName"></el-input>
        </el-form-item>
        <el-form-item label="所属分类" prop="cateId">
          <!--下拉选择-->
          <el-select v-model="foodData.cateId" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in categroys"
              :key="index"
              :label="item.categoryName"
              :value="item.categoryId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜品图片" prop="fileList">
          <el-upload
            class="upload-demo"
            :action='uploadPath'
            name="file"
            :headers="header"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="uploadFile"
            :limit="1"
            :file-list="fileList"
            ref="fileList"
            list-type="picture"
            :on-change="uploadChange"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <span>只能上传jpg/png文件，且不超过500kb</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="菜品价格" prop="price">
          <el-input type="number" min="1" v-model="foodData.price"></el-input>
        </el-form-item>
        <el-form-item label="菜品描述" prop="describe">
          <el-input type="textarea" :rows="3" placeholder="请输入描述信息" v-model="foodData.describe"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="save">立即创建</el-button>
          <el-button size="mini">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  created() {
    this.getCategorys();
  },
  data() {
    //自定义验证
    let validateFoodName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入菜品名称"));
      } else {
        callback();
      }
    };
    let validateCateId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择菜品分类"));
      } else {
        callback();
      }
    };
    let validateImg = (rule, value, callback) => {
      if (!this.$refs.fileList.uploadFiles.length) {
        return callback(new Error("请上传菜品图片"));
      } else {
        callback();
      }
    };
    let validatePrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入菜品价格"));
      }
      if (value <= 0) {
        return callback(new Error("价格不能小于等于0"));
      } else {
        callback();
      }
    };
    let validateDescribe = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入菜品描述信息"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "right",
      //文件上传表头设置
      header:{
        'Authorization':window.sessionStorage.getItem("token")
      },
      fileList:[],
      //文件上传路径
      uploadPath:'http://192.168.1.5:8080/api/upload',
      //表单对象
      foodData: {
        foodId: 0,
        foodName: "",
        cateId: null,
        imgUrl: '',
        price: "",
        describe: ""
      },
      //表单验证规则
      foodDataRules: {
        foodName: [{ validator: validateFoodName, trigger: "blur" }],
        cateId: [{ validator: validateCateId, trigger: "change" }],
        fileList: [{ validator: validateImg, trigger: "change" }],
        price: [{ validator: validatePrice, trigger: "blur" }],
        describe: [{ validator: validateDescribe, trigger: "blur" }]
      },
      categoryId: null,
      categroys: []
    };
  },
  methods: {
    //图片上传完毕回调
    uploadFile(response, file, fileList){
      if (response.code===10000) {
        this.foodData.imgUrl=response.data;
      } 
    },
    //获取分类数据
    async getCategorys() {
      const { data: res } = await this.$http.get("/category/list");
      if (res.code === 10000) {
        this.categroys = res.data;
      } else {
        this.$message(res.message);
      }
    },
    //图片校验
    uploadChange(file, filelist) { 
      if (filelist.length && filelist.length >= 1) {
        /**引用对象然后验证表单域-这个可以清除上一步不通过时的提示*/
        this.fileList=filelist;
        this.$refs.foodDataRef.validateField("fileList");
      }
    },
    save() {
      this.$refs.foodDataRef.validate(async valid => {
        if (!valid) return;
        console.log(this.foodData);
        
        
      });
    },
    goBack() {
      this.$router.back(-1);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
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