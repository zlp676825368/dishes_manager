<template>
  <el-dialog
  :title="tab.tabNo"
    :visible.sync="dialogVisible"
    :show-close="false"
    :close-on-click-modal="false"
    @open="open"
  >
  <div>11111</div>
    <!-- <el-form :model="categroy" ref="categroy" :rules="formRules" clearValidate>
      <el-form-item label="分类名称" label-width="80px" prop="categoryName">
        <el-input v-model.trim="categroy.categoryName" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div> -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props:{
    dialogVisible:{
      type:Boolean,
      default:false
    },
    tab:{
      type:Object,
      default:{}
    }
  },
  methods: {
    open(){},
    close(){
      this.$emit("closeDialog", {});
    },
    save(){}
  },
}
</script>
<style lang="scss" scoped>
</style>