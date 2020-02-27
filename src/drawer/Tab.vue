<template>
  <div :class="[isOpen?'show':'hide']">
    <div class="head">
      <div class="close" @click="close">
        <i class="el-icon-error"></i>
      </div>
      <label>{{tab.tabNo}}</label>
    </div>
    <div class="content">
      <div class="btn" v-if="tab.state===0">
        <el-button  class="el-button--primary">预约</el-button>
      </div>
      <div class="details" v-else>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
        isOpen:{
            type:Boolean,
            default:false
        },
      tab:{
          type:Object,
          default: {}
      }
    },
    watch:{
      tab(){
        console.log(this.tab.state)
      }
    },
  data() {
    return {
      
    };
  },
  methods: {
    close() {
        this.$emit("closeDrawer",{})
    }
  }
};
</script>
<style lang="scss" scoped>

.hide{
    display: none;
}
.show {
  position: fixed;
  width: 19%;
  height: 100%;
  top: 23%;
  right: 1.5%;
  border: 1px solid #eee;
  border-radius: 6px;
  display: flex;
  flex-flow: column wrap;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
  .head {
    height: 10%;
    border-bottom: 1px solid #eee;
    position: relative;
    background-color: #946134;
    label{
      display: block;
      text-align: center;
      margin-top: 7%;
      color: #fff;
    }
    .close {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor: pointer;
      position: absolute;
      right: 5px;
      top: 5px;
    }
  }
  .content{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn{
      height: 50px;
    }
  }
}
</style>