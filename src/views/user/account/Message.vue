<template>
  <div class="message">
    <div class="box" v-for="message in message_list" :key="message.id">
      <div class="info" @click="deleteMessage(message.id)">
        <p>{{ message.content }}</p>
        <span>发布时间：{{ message.date | dateFormat }}</span>
      </div>
    </div>
    <el-pagination
      small
      layout="prev, pager, next"
      :total="total"
      :page-size="queryInfo.pagesize"
      :current-page="queryInfo.pagenum"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { request } from "@/network/request";

export default {
  data() {
    return {
      queryInfo: {
        pagesize: 2,
        pagenum: 1,
        creator: "",
      },
      total: 0,
      message_list: [],
    };
  },
  created() {
    this.queryInfo.creator = JSON.parse(
      window.sessionStorage.getItem("userInfo")
    ).id;
    this.getMessage();
  },
  methods: {
    getMessage() {
      request({
        url: "/user/notice/",
        method: "get",
        params: this.queryInfo,
      }).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取列表失败");
        }
        this.message_list = res.data.data.notice_list;
        this.total = res.data.data.total;
      });
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getMessage();
    },
    postMessage(id) {
      request({
        url: "/user/notice/",
        method: "delete",
        data: {
          id: id
        }
      }).then((res) => {
        if (res.data.meta.status !== 204) {
          return this.$message.error(res.data.meta.msg);
        }
        this.$message.success(res.data.meta.msg);
        this.getMessage()
      });
    },
    deleteMessage(id) {
      this.$confirm("此操作将永久删除该留言, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.postMessage(id)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style scoped>
.message {
  position: relative;
  padding: 80px 20px;
}
.box {
  display: flex;
  margin-bottom: 30px;
  margin-left: 60px;
}
.box .info {
  position: relative;
  width: 600px;
  padding: 20px;
  background-color: #eee;
  border-radius: 3px;
  box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
.info:hover {
  background: url(~@/assets/images/delete.png) no-repeat;
  background-size: 100px 100px;
  background-position: center;
  background-color: #bbb;
}
.info p {
  text-indent: 2em;
  height: 63px;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
.info span:first-child {
  font-weight: bold;
}
.info span:last-child {
  margin-left: 400px;
}
.el-pagination {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>