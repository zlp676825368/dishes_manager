<template>
  <div class="content">
    <div class="login_box">
      <!--logo区域-->
      <div class="head">
        <img src="~assets/logo.png" alt />
      </div>
      <p>点餐后台管理系统</p>
      <!--表单区域-->
      <el-form ref="loginFormRef" :rules="loginFormRules" :model="loginForm" class="login_form">
        <el-form-item prop="mobile">
          <el-input prefix-icon="el-icon-s-custom" v-model.trim="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input prefix-icon="el-icon-lock" v-model.trim="loginForm.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item class="buts">
          <el-button type="primary" @click="login" :loading="isLoading">{{isLoading?"登陆中":"登陆"}}</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    let validateMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
        return callback(new Error("手机号不合法"));
      }else{
        callback();
      }
    };
    let validatePwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写密码"));
      }
      if (value.length < 6) {
        return callback(new Error("密码不能少于6位"));
      }else{
        callback();
      }
    };
    return {
      //登陆表单的数据绑定对象
      loginForm: {
        mobile: "13882870519",
        pwd: "123456"
      },
      isLoading:false,
      //登陆表单的数据验证规则
      loginFormRules: {
        mobile: [{ validator: validateMobile, trigger: "blur" }],
        pwd: [{ validator: validatePwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    //表单重置
    resetForm() {
      this.$refs.loginFormRef.resetFields();
    },
    //登陆
    login() {
      this.isLoading=true;
      this.$refs.loginFormRef.validate(async valid=> {
        if (!valid) {
          this.isLoading=false;
          return;
        }
        const { data: res } = await this.$http.post(
          "/user/login",
          this.loginForm
        );
        if (res.code===10000) {
          window.sessionStorage.setItem("token",res.data);
          this.isLoading=false;
          this.$router.replace("/home");
        }else if (res.code===10004) {
          this.$message.error(res.message);
          this.isLoading=false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  height: 100%;
  background-color: #2b4b6b;
  position: relative;
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    p {
      font-size: 24px;
      font-weight: 700;
      text-shadow: 0 0 1px #fff;
      text-align: center;
      box-sizing: border-box;
      margin-top: 18%;
      margin-bottom: 2%;
    }
    .el-form {
      position: absolute;
      width: 100%;
      bottom: 0;
      .el-form-item {
        padding: 0 20px;
      }
      .buts {
        display: flex;
        justify-content: flex-end;
      }
    }
    .head {
      width: 130px;
      height: 130px;
      background-color: #fff;
      border-radius: 50%;
      position: absolute;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        background-color: #eee;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
}
</style>