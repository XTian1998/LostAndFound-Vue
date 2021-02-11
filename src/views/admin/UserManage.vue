<template>
  <div>
    <el-card>
      <el-input
        placeholder="请输入关键字"
        v-model="query"
        clearable
        @clear="getUserInfo"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="getUserInfo"
        ></el-button>
      </el-input>

      <el-table :data="userInfo" style="width: 55%" border stripe>
        <el-table-column prop="id" label="学号" width="130"> </el-table-column>
        <el-table-column prop="username" label="用户名" width="130">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="130">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="130">
        </el-table-column>
        <el-table-column label="状态" width="130">
          <template v-slot="scope">
            <div>
              <el-tag v-if="scope.row.status == false">正常</el-tag>
              <el-tag type="danger" v-else>冻结</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <div>
              <el-button
                size="mini"
                type="warning"
                @click="freeze(scope.row.id)"
                v-if="scope.row.status == false"
                >冻结账号</el-button
              >
              <el-button
                size="mini"
                type="warning"
                @click="freeze(scope.row.id)"
                v-else
                >恢复账号</el-button
              >
              <el-button size="mini" type="success" @click="reset(scope.row.id)"
                >重置密码</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { request } from "@/network/request";

export default {
  data() {
    return {
      query: "",
      userInfo: [],
      total: 0,
      pagesize: 10,
      pagenum: 1,
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      request({
        url: "/admin/user_manage/",
        method: "get",
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        },
      }).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("网络错误！");
        }
        this.total = res.data.data.total;
        this.userInfo = res.data.data.users;
      });
    },
    freeze(id) {
      this.$confirm("此操作将无法撤销, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          request({
            url: "/admin/user_manage/",
            method: "put",
            data: {
              type: "status",
              id: id,
            },
          }).then((res) => {
            if (res.data.meta.status !== 201) {
              return this.$message.error(res.data.meta.msg);
            }
            this.$message.success(res.data.meta.msg);
            this.getUserInfo();
          });
        })
        .catch(() => {
          this.$message.info("已取消操作！");
        });
    },
    reset(id) {
      this.$confirm("此操作将无法撤销, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          request({
            url: "/admin/user_manage/",
            method: "put",
            data: {
              type: "password",
              id: id,
            },
          }).then((res) => {
            console.log(res.data);
            if (res.data.meta.status !== 201) {
              return this.$message.error(res.data.meta.msg);
            }
            this.$message.success(res.data.meta.msg);
            this.getUserInfo();
          });
        })
        .catch(() => {
          this.$message.info("已取消操作！");
        });
    },
    handleSizeChange(size) {
      this.pagesize = size;
      this.getUserInfo();
    },
    handleCurrentChange(page) {
      (this.pagenum = page), this.getUserInfo();
    },
  },
};
</script>
<style scoped>
.el-input {
  width: 20%;
}
</style>