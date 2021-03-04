<template>
  <div class="bg">
    <div class="img">
      <img src="~@/assets/images/img-3.svg" alt />
    </div>
    <div class="login_box">
      <div class="login_form">
        <div class="avatar_box">
          <img src="~@/assets/images/avatar.svg" alt />
          <h2>WELCOME</h2>
        </div>

        <el-form ref="loginFormRef" :model="userInfo" :rules="loginFormRules">
          <el-form-item prop="id">
            <el-input prefix-icon="el-icon-user" placeholder="管理员工号" v-model="userInfo.id"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" placeholder="密码" v-model="userInfo.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" @click="login">Login</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      userInfo: {
        id: "",
        password: "",
      },
      loginFormRules: {
        id: [{ required: true, message: "请输入管理员工号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return;
        request({
          url: "/admin/",
          method: "post",
          data: {
            action: "login",
            id: this.userInfo.id,
            password: this.userInfo.password,
          },
        }).then((res) => {
          if (res.data.meta.status != 200) {
            return this.$message.warning(res.data.meta.msg);
          }
          this.$message.success(res.data.meta.msg);
          window.sessionStorage.setItem("token", res.data.data.token);
          this.$router.push("/admin/home");
        });
      });
    },
  },
};
</script>
<style scoped>
.bg {
  display: flex;
  height: 100%;
  background: url("~@/assets/images/bg.png");
  justify-content: space-between;
  align-items: center;
}
.img {
  position: relative;
  width: 800px;
  height: 100%;
}
.img img {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  width: 500px;
}

.login_box {
  position: relative;
  width: 800px;
  height: 100%;
}
.login_box .login_form {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  width: 350px;
}
.avatar_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.avatar_box img {
  margin-right: 10px;
  width: 100px;
  height: 100px;
}
.avatar_box h2 {
  margin-right: 10px;
  font-size: 46px;
  font-family: Roboto, sans-serif;
  color: #999999;
  text-align: center;
}
.el-input {
  width: 335px;
}
.el-input--prefix >>> .el-input__inner:focus {
  border-color: #06b799;
}
.btn {
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  margin: 1rem 0;
  font-size: 1.2rem;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
  cursor: pointer;
  color: #fff;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  background-size: 200%;
  transition: 0.5s;
}
.btn:hover {
  background-position: right;
}
</style> 