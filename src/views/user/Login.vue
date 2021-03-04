<template>
  <div class="bg-img">
    <div class="login_box">
      <header>Login Form</header>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="80px">
        <el-form-item prop="id">
          <el-input v-model="loginForm.id" prefix-icon="el-icon-user" placeholder="Stuent Number"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="Password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">LOGIN</el-button>
        </el-form-item>
        <div class="signup">
          Don't have account?
          <span @click="gotoRegister">Signup Now</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      loginForm: {
        id: "",
        password: "",
      },
      loginFormRules: {
        id: [{ required: true, message: "请输入学号", trigger: "blur" },{ min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" },{ min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }],
      },
    };
  },
  methods: {
    gotoRegister() {
      this.$router.push("/register");
    },
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return;
        request({
          url: "/user/",
          method: "post",
          data: {
            action: "login",
            id: this.loginForm.id,
            password: this.loginForm.password,
          }
        }).then((res) => {
          if (res.data.meta.status != 200) {
            return this.$message.warning(res.data.meta.msg);
          }
          this.$message.success(res.data.meta.msg);
          window.sessionStorage.setItem("token", res.data.data.token);
          window.sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
          this.$router.back(-1)
        });
      });
    },
  },
};
</script>
<style scoped>
.bg-img {
  background: url("~@/assets/images/bg.jpg");
  height: 100vh;
  background-size: cover;
  background-position: center;
}
.bg-img:after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
}
.login_box {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  text-align: center;
  padding: 60px 32px;
  width: 306px;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: -1px 4px 28px 0px rgba(0, 0, 0, 0.75);
}
.login_box header {
  color: white;
  font-size: 33px;
  font-weight: 600;
  margin: 0 0 35px 0;
  font-family: "Montserrat", sans-serif;
}
.el-form-item {
  position: relative;
  height: 45px;
  width: 100%;
  display: flex;
  background: rgba(255, 255, 255, 0.94);
}
.el-form-item >>> .el-form-item__content {
  margin-left: 0 !important;
}
.el-input {
  height: 45px;
  width: 306px;
  background: transparent;
  border: none;
  outline: none;
  color: #222;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
}
.el-input >>> .el-input__inner {
  height: 45px;
}
.el-input >>> .el-input__inner::-webkit-input-placeholder {
  color: rgba(36, 41, 46, 0.7);
  font-size: 16px;
}
.el-button {
  width: 306px;
  height: 45px;
  border-radius: 0;
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
}

.signup {
  font-size: 15px;
  color: white;
  font-family: "Poppins", sans-serif;
}
.signup span {
  color: #3498db;
  text-decoration: none;
  cursor: pointer;
}
.signup span:hover {
  text-decoration: underline;
}
</style>