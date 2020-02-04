<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :show-close="false"
    :close-on-click-modal="false"
    @open="open"
  >
    <el-form :model="order" :rules="orderRules" ref="orderRef">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="房间类型：" label-width="100px">
            <label>{{tab.tabNo |tabNoType}}</label>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="桌号：" label-width="100px">
            <label>{{tab.tabNo |tabNo}}</label>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="预定人：" prop="person" size="mini" label-width="100px">
            <el-input v-model="order.person" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="预定电话：" prop="mobile" size="mini" label-width="100px">
            <el-input v-model="order.mobile" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="预定时间：" size="mini" label-width="100px">
            <el-time-select v-model="order.reserveTime" style="width:100%" disabled></el-time-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="到店时间：" prop="arriveTime" size="mini" label-width="100px">
            <el-time-select
              v-model="order.arriveTime"
              style="width:100%"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
              placeholder="选择时间"
            ></el-time-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="用餐人数：" prop="personNum" size="mini" label-width="100px">
            <el-input v-model="order.personNum" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="口味：" prop="personMark" size="mini" label-width="100px">
            <!--下拉选择-->
            <el-select
              v-model="order.personMark"
              @clear="clearSelect"
              clearable
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in flavors"
                :key="index"
                :label="item.flavorName"
                :value="item.flavorId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="22">
          <el-form-item label="客人留言：" label-width="100px">
            <el-input
              size="mini"
              v-model="order.leave"
              type="textarea"
              :rows="3"
              placeholder="请输入留言信息"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button size="mini" @click="close">取 消</el-button>
      <el-button size="mini" type="primary" class="primary" @click="save">预 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  created() {
    this.getFlavors();
  },
  data() {
    //自定义验证
    let validatePerson = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入预订人姓名"));
      } else {
        callback();
      }
    };
    let validateArriveTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择到店时间"));
      } else {
        callback();
      }
    };

    let validateMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入预订人手机号"));
      }
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    let validatepNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用餐人数"));
      }
      if (!/^[0-9]\d*$/.test(value)) {
        return callback(new Error("用餐人数必须大于0"));
      } else {
        callback();
      }
    };
    let validatepMark = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择客人菜品口味"));
      } else {
        callback();
      }
    };
    return {
      title: "预定",
      flavors: [],
      order: {
        orderId: "",
        tabNo: this.tab.tabNo,
        person: "",
        mobile: "",
        personNum: null,
        personMark: null,
        reserveTime: new Date().Format("yyyy-MM-dd hh:mm:ss"),
        arriveTime: null,
        reserveType: 0,
        leave: ""
      },
      orderRules: {
        person: [{ validator: validatePerson, trigger: "blur" }],
        mobile: [{ validator: validateMobile, trigger: "blur" }],
        personNum: [{ validator: validatepNum, trigger: "blur" }],
        personMark: [{ validator: validatepMark, trigger: "change" }],
        arriveTime: [{ validator: validateArriveTime, trigger: "blur" }]
      }
    };
  },
  filters: {
    tabNo(tabNo) {
      return parseInt(tabNo.substring(1));
    },
    tabNoType(tabNo) {
      return tabNo.search("a") ? "包间" : "大厅";
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    tab: {
      type: Object,
      default: {}
    }
  },
  methods: {
    // arriveDate() {
    //   let sdate = new Date();
    //   sdate.setMinutes(sdate.getMinutes() + 30);
    //   let now =
    //     sdate.getHours() < 10
    //       ? "0" + sdate.getHours() + ":" + sdate.getMinutes()
    //       : sdate.getHours() + ":" + sdate.getMinutes();
    //   return now;
    // },
    open() {
      this.order.reserveTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
    },
    close() {
      this.order.reserveTime = null;
      this.order.arriveTime = null;
      this.$refs.orderRef.resetFields();
      this.$refs.orderRef.clearValidate();

      this.$emit("closeDialog", {});
    },
    save() {
      this.$refs.orderRef.validate(async valid => {
        if (!valid) return;
        this.order.arriveTime =
          new Date().Format("yyyy-MM-dd ") + this.order.arriveTime + ":00";
        console.log(this.order);

        const { data: res } = await this.$http.post("/order", this.order);
        if (res.code === 10000) {
          this.order.reserveTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
          this.order.arriveTime = null;
          this.$refs.orderRef.clearValidate();
          this.$refs.orderRef.resetFields();
          this.$emit("closeDialog", {});
          this.$message(res.message);

        }
      });
    },
    //下拉清空按钮事件
    clearSelect() {},
    //获取分类数据
    async getFlavors() {
      const { data: res } = await this.$http.get("/flavor");
      if (res.code === 10000) {
        this.flavors = res.data;
      } else {
        this.$message(res.message);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>