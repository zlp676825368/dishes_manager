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
      <el-button @click="close" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === '') {
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
    save(){
      this.$refs.categroy.validate(async valid=>{
        if (!valid) return;
        const {data:res}=await this.$http.post("/category",this.categroy);
        if (res.code===10000) {
          this.$emit("closeDialog", res.data);
        }else{
          this.$message(res.message);
        }
      })
    },
    close() {
      this.$refs.categroy.clearValidate();
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