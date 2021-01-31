<template>
  <div class="user">
    <p>
      学号：{{ userInfo.id
      }}<el-button size="mini" @click="change('password')" class="change"
        >修改密码</el-button
      >
    </p>
    <p>
      用户名：{{ userInfo.username
      }}<i class="el-icon-edit" @click="change('username')"></i>
    </p>
    <p>
      联系方式：{{ userInfo.phone
      }}<i class="el-icon-edit" @click="change('phone')"></i>
    </p>
    <p>
      状态：
      <el-tag type="danger" v-if="userInfo.status">已冻结</el-tag>
      <el-tag typer="primary" v-else>正常</el-tag>
    </p>
    <img src="~@/assets/images/user.png" alt="" />

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <div v-if="param == 'password'">
        <label for="password">新的密码：</label
        ><el-input
          v-model="postForm.password"
          placeholder="请输入内容"
          id="password"
        ></el-input>
      </div>
      <div v-else-if="param == 'username'">
        <label for="username">新用户名：</label
        ><el-input
          v-model="postForm.username"
          placeholder="请输入内容"
          id="username"
        ></el-input>
      </div>
      <div v-else-if="param == 'phone'">
        <label for="phone">新手机号：</label
        ><el-input
          v-model="postForm.phone"
          placeholder="请输入内容"
          id="phone"
        ></el-input>
      </div>
      <el-button class="save" type="primary" @click="save">保存</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "@/network/request";

export default {
  data() {
    return {
      userInfo: {},
      dialogVisible: false,
      param: "",
      postForm: {
        password: "",
        username: "",
        phone: "",
      },
    };
  },
  created() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
  },
  methods: {
    change(param) {
      this.dialogVisible = true;
      this.param = param;
    },
    save() {
      request({
        url: "/user/info_manage/",
        method: "put",
        data: this.postForm,
      }).then((res) => {
        if (res.data.meta.status != 201) {
          return this.$message.warning(res.data.meta.msg);
        }
        this.$message.success(res.data.meta.msg);
        window.sessionStorage.setItem("token", res.data.data.token);
        window.sessionStorage.setItem(
          "userInfo",
          JSON.stringify(res.data.data)
        );
        this.userInfo = res.data.data
        this.dialogVisible = false;
        this.postForm = {
          password: "",
          username: "",
          phone: "",
        };
      });
    },
  },
};
</script>
<style scoped>
.user {
  padding: 20px;
}
p {
  font-size: 20px;
}
i {
  margin-left: 20px;
  cursor: pointer;
}
.change {
  margin-left: 20px;
}
.save {
  margin: 30px 0 0 320px;
}
img {
  width: 700px;
  padding-left: 80px;
}

.el-input {
  width: 60%;
}
</style>