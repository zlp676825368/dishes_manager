<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :show-close="false"
    :close-on-click-modal="false"
    @open="open"
  >
    <el-form :model="categroy" ref="categroy" :rules="formRules" clearValidate>
      <el-form-item label="分类名称" label-width="80px" prop="categoryName">
        <el-input v-model.trim="categroy.categoryName" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === null) {
        callback(new Error("请输入分类名称"));
      } else {
        callback();
      }
    };
    return {
      title: "",
      formRules: {
        categoryName: [{ validator: validateName, trigger: "blur" }]
      }
    };
  },
  methods: {
    close() {
      this.$emit("closeDialog", {});
    },
    open() {
      if(this.categroy.categoryId===0){
        this.title="新增分类";
      }else{
        this.title="修改分类";
      }

    }
  },
  destroyed(){
    
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    categroy: {
      type: Object,
      default: {
        'categoryId':0,
        'categoryName':''
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>