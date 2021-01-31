<template>
  <div @click="menuvisible = false">
    <div id="top">
      <div>
        <span style="margin-left: 10px">校区：</span>
        <el-select v-model="campus" size="small" @change="campusChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-button class="btn" icon="el-icon-edit" @click="openDialog"
        >快速发布</el-button
      >
      <div class="login_box" v-if="userInfo == undefined">
        <span @click="login">登录</span>
        <span>|</span>
        <span @click="register">注册</span>
      </div>
      <div v-else class="info_box" @click.stop="showMenu">
        <span>{{ JSON.parse(userInfo).username }}</span>
        <i class="tri"></i>
        <div class="info_menu" v-if="menuvisible">
          <i></i>
          <ul>
            <li @click="$router.push('/account/user')">个人资料</li>
            <li @click="$router.push('/account/release')">我的发布</li>
            <li @click="$router.push('/account/message')">我的留言</li>
            <li @click="$router.push('/account/news')">系统消息</li>
            <li @click="signout">退出登录</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="banner">
      <img src="~@/assets/images/banner.jpg" alt="" />
    </div>
    <notice-dialog :show.sync="dialogVisible" />
  </div>
</template>

<script>
import NoticeDialog from "./NoticeDialog.vue";
export default {
  components: { NoticeDialog },
  data() {
    return {
      options: [
        {
          label: "奉贤校区",
          value: "奉贤校区",
        },
        {
          label: "徐汇校区",
          value: "徐汇校区",
        },
      ],
      campus: "",
      userInfo: window.sessionStorage.getItem("userInfo"),
      menuvisible: false,
      dialogVisible: false,
    };
  },
  created() {
    this.campus = this.$store.state.campus;
  },
  methods: {
    campusChange() {
      this.$store.state.campus = this.campus;
    },
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    },
    showMenu() {
      this.menuvisible = true;
    },
    openDialog() {
      if (this.userInfo == undefined) {
        this.$router.push("/login");
      }
      this.dialogVisible = true;
    },
    signout() {
      window.sessionStorage.clear();
      this.userInfo = undefined;
    },
  },
  components: {
    NoticeDialog,
  },
};
</script>
<style scoped>
#top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  background-color: #eee;
}
.contact {
  cursor: pointer;
  margin-left: 25px;
}
.btn {
  margin-left: 600px;
}
.login_box span {
  cursor: pointer;
}
.login_box span:nth-child(2) {
  margin: 0 10px;
}
.login_box span:last-child {
  margin-right: 20px;
}
.info_box {
  position: relative;
  cursor: pointer;
}
.info_box span {
  margin-right: 40px;
}
.info_box .tri {
  position: absolute;
  width: 0px;
  height: 0px;
  right: 24px;
  top: 9px;
  border: 5px solid transparent;
  border-top-color: #000;
}
.info_box .info_menu {
  position: absolute;
  top: 50px;
  right: 15px;
  width: 90px;
  background-color: #eee;
  box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
.info_menu i {
  position: absolute;
  width: 0px;
  height: 0px;
  top: -10px;
  right: 10px;
  border: 5px solid transparent;
  border-bottom-color: #eee;
}
.info_menu ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.info_menu ul li {
  text-align: center;
  padding: 2px 0;
}
li:hover {
  background-color: #ccc;
}
.banner {
  width: 100%;
  height: 350px;
  margin: 0 auto;
}
.banner img {
  display: block;
  height: 100%;
  width: 100%;
}
.el-select {
  width: 110px;
}
</style>