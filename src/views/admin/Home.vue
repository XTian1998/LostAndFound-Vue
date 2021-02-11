<template>
  <el-container>
    <el-header>
      <span @click="$router.push('/admin/welcome')">失物招领平台后台管理</span>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :router="true"
          :default-active="$route.path"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-notebook-2"></i>
              <span>公告管理</span>
            </template>
            <el-menu-item index="/admin/notice">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>首页公告</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/admin/addnotice">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>添加公告</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>信息管理</span>
            </template>
            <el-menu-item index="/admin/lost_and_found">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>启事信息</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/admin/item_type">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>添加类别</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/admin/user_manage">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>私信管理</span>
            </template>
            <el-menu-item index="/admin/message">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>发送私信</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-monitor"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="/admin/report">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>数据报表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/admin/login");
    },
  },
};
</script>
<style scoped>
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: #373d41;
  color: #fff;
  font-size: 30px;
}
.el-header span {
  margin-left: 20px;
  cursor: pointer;
}
.el-aside {
  background-color: #333744;
  height: 100%;
}
.el-aside .el-menu {
  border-right: none;
}
.el-main {
  background-color: #eaedf1;
}
</style>