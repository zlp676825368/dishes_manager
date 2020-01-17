<template>
  <div>
    <el-page-header @back="goBack" content="详情页面"></el-page-header>
    <el-card>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="菜品名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="所属分类">
          <!--下拉选择-->
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜品图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :limit="1"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <span>只能上传jpg/png文件，且不超过500kb</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="菜品价格">
          <el-input type="number" min="1" v-model="formLabelAlign.type"></el-input>
        </el-form-item>
        <el-form-item label="菜品描述">
          <el-input type="textarea" :rows="2" placeholder="请输入描述信息" v-model="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini">立即创建</el-button>
          <el-button size="mini">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        },
        {
          value: "选项6",
          label: "龙须面"
        },
        {
          value: "选项7",
          label: "北京烤鸭"
        },
        {
          value: "选项8",
          label: "龙须面"
        },
        {
          value: "选项9",
          label: "北京烤鸭"
        }
      ]
    };
  },
  methods: {
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
.el-card {
  position: relative;
  height: 500px;
  margin-top: 10px;
  .el-form {
    width: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%);
    .el-select {
      width: 100%;
    }
  }
}
</style>