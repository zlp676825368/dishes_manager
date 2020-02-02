<template>
  <div class="content">
    <div v-for="(item,index) in tabs" :key="index">
      <p>{{item.name}}({{item.list.length}})</p>
      <el-divider></el-divider>
      <div class="item">
        <el-card v-for="(tab,index) in item.list" :key="index" shadow="hover">
          <div @click="itemClick(tab)">
            <div :class="[tab.state==0?'head':'head-active']">
              <label>{{tab.tabNo |tabNo}}</label>
              <label>{{tab.tabNo |tabNoType}}{{tab.tabAlias?'（'+tab.tabAlias+'）':''}}</label>
            </div>
            <div v-if="tab.state==0" class="body">空闲中</div>
            <div v-else class="body-active">预定中</div>
          </div>
        </el-card>
      </div>
    </div>
    <el-drawer
      title=""
      :visible.sync="drawer"
      :with-header="false"
      :modal-append-to-body="false"
      :size="'20%'"
      :modal="false"
    >
      <div v-if="tab.state==0" class="leisure">
        <div class="head">
          <label>{{tab.tabNo |tabNo}}</label>
          <label>{{tab.tabNo |tabNoType}}{{tab.tabAlias?'（'+tab.tabAlias+'）':''}}</label>
        </div>
        <el-button type="primary" @click="openOrder" icon="el-icon-edit">开单</el-button>
        <el-button type="primary" icon="el-icon-share">预定</el-button>
      </div>
      <div v-else class="usage">
        <div class="head">
          <label>{{tab.tabNo |tabNo}}</label>
          <label>{{tab.tabNo |tabNoType}}{{tab.tabAlias?'（'+tab.tabAlias+'）':''}}</label>
        </div>
      </div>
    </el-drawer>
    <open-order :tab="tab" :dialogVisible="dialogVisible" @closeDialog="closeDialog"></open-order>
  </div>
</template>
<script>
import OpenOrder from 'dialog/OpenOrder'
export default {
  components: {
      'open-order':OpenOrder
  },
  data() {
    return {
      drawer: false,
      tab: {tabNo:'a001',tabAlias:null},
      dialogVisible:false
    };
  },
  filters: {
    tabNo(tabNo) {
      return parseInt(tabNo.substring(1));
    },
    tabNoType(tabNo) {
      return tabNo.search("a") ? "包间" : "号桌";
    }
  },
  methods: {
    itemClick(tab) {
      this.drawer = true;
      this.tab = tab;
    },
    openOrder(){
        this.dialogVisible=true;
    },
    closeDialog(){
        this.dialogVisible=false;
    }
  },
  props: {
    tabs: {
      type: Array,
      default: []
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  background-color: #f5f3ed;
  p {
    text-align: center;
    font-weight: 700;
    color: #888888;
  }
  .item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: flex-start;
    .el-card {
      color: #888888;
      width: 18%;
      height: 120px;
      margin: 0 10px 20px;
      cursor: pointer;
      padding: 0;
      display: flex;
      flex-direction: column;
      .head {
        display: flex;
        height: 40px;
        background-color: #edeceb;
        box-sizing: border-box;
        font-size: 22px;
        align-items: center;
        justify-content: center;
        label:nth-child(1) {
          font-weight: 700;
        }
        label:nth-child(2) {
          padding-left: 10px;
          font-size: 12px;
        }
      }
      .body {
        flex: 1;
        line-height: 80px;
        text-align: center;
        font-size: 12px;
      }
    }
  }
}
.body-active {
  flex: 1;
  line-height: 80px;
  text-align: center;
  font-size: 12px;
}
.head-active {
  display: flex;
  height: 40px;
  background-color: #946134;
  color: #fff;
  box-sizing: border-box;
  font-size: 22px;
  align-items: center;
  justify-content: center;
  label:nth-child(1) {
    font-weight: 700;
  }
  label:nth-child(2) {
    padding-left: 10px;
    font-size: 12px;
  }
}
.usage{
    display: flex;
    flex-direction: column;
    .head{
        line-height: 60px;
        border-bottom: 1px solid #eee;
        text-align: center;
        font-size: 22px;
    }
}
.leisure{
    display: flex;
    flex-direction: column;
    .el-button{
        width: 180px;
        height: 60px;
        margin: 100px 50px;
    }
    .head{
        line-height: 60px;
        border-bottom: 1px solid #eee;
        text-align: center;
        font-size: 22px;
    }
}
</style>