<template>
  <div class="bg-img">
    <div class="register_box">
      <header>Register Form</header>
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerFormRules"
        label-width="80px"
      >
        <el-form-item label="学号" prop="id">
          <el-input
            v-model="registerForm.id"
            placeholder="Student Number"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="Username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="registerForm.password"
            placeholder="Password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="registerForm.name" placeholder="Name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="registerForm.phone" placeholder="Phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">SIGN UP</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      registerForm: {
        action: "register",
        id: "",
        username: "",
        password: "",
        name: "",
        phone: "",
      },
      registerFormRules: {
        id: [
          { required: true, message: "请输入学号", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur",
          },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    register() {
      this.$refs.registerFormRef.validate((valid) => {
        if (!valid) return;
        request({
          url: "/user/",
          method: "post",
          data: this.registerForm,
        }).then((res) => {
          if (res.data.meta.status !== 201) {
            return this.$message.error(res.data.meta.msg);
          }
          this.$message.success(res.data.meta.msg);
          this.$router.back(-1);
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
.register_box {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  text-align: center;
  padding: 60px 32px;
  width: 500px;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: -1px 4px 28px 0px rgba(0, 0, 0, 0.75);
}
.register_box header {
  color: white;
  font-size: 33px;
  font-weight: 600;
  margin: 0 0 35px 0;
  font-family: "Montserrat", sans-serif;
}

.el-form {
  margin-left: 20px;
}

.el-form-item {
  width: 400px;
}
.el-form-item >>> .el-form-item__label {
  color: #fff;
}
.el-input >>> .el-input__inner::-webkit-input-placeholder {
  color: rgba(36, 41, 46, 0.7);
  font-size: 16px;
}

.el-button {
  width: 200px;
  height: 45px;
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  margin-right: 30px;
}
</style>