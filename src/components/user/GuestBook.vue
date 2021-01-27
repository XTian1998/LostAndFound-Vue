<template>
  <div class="guest_book">
    <div class="title">用户留言</div>
    <div class="new_message">
      <el-input type="textarea" v-model="newMessage" rows="3"></el-input>
      <el-button type="primary" @click="sendMessage">发表评论</el-button>
    </div>
    <div class="list">
      <div class="box" v-for="message in guestBook" :key="message.id">
        <img src="~@/assets/images/head_portrait.png" alt="" />
        <div class="info">
          <img src="~@/assets/images/left-arrow.png" alt="">
          <span>{{ message.creator }}</span>
          <p>{{ message.content }}</p>
          <span>发布时间：{{ message.date | dateFormat }}</span>
        </div>
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
      newMessage: "",
      queryInfo: {
        pagesize: 2,
        pagenum: 1,
      },
      total: 0,
      guestBook: [],
    };
  },
  created() {
    this.getGuestBook();
  },
  methods: {
    sendMessage() {
      if (this.newMessage == "") {
        return this.$message.error("留言不能为空！");
      }

      if (window.sessionStorage.userInfo == undefined) {
        this.$router.push("/login");
      } else {
        request({
          url: "/user/notice/",
          method: "post",
          data: {
            type: "用户留言",
            content: this.newMessage,
          },
        }).then((res) => {
          if (res.data.meta.status !== 201) {
            return this.$message.error("发表留言失败");
          }
          this.$message.success("留言成功");
          this.newMessage = "";
          this.getGuestBook();
        });
      }
    },
    getGuestBook() {
      request({
        url: "/user/notice/",
        method: "get",
        params: this.queryInfo,
      }).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取列表失败");
        }
        this.guestBook = res.data.data.notice_list;
        this.total = res.data.data.total;
      });
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getGuestBook();
    },
  },
};
</script>
<style scoped>
.guest_book {
  position: relative;
  margin: 20px 0;
  border: 1px solid #bbb;
  padding-bottom: 50px;
}
.title {
  margin: 20px 40px;
  padding-bottom: 10px;
  font-size: 24px;
  border-bottom: 1px solid #000;
}
.new_message {
  margin: 20px 40px;
  border-bottom: 1px solid #000;
}
.el-textarea {
  display: block;
  width: 600px;
  margin-left: 40px;
}
.el-button {
  margin: 20px 40px;
}

.box {
  display: flex;
  margin-bottom: 30px;
  margin-left: 60px;
}
.box img {
  width: 70px;
  height: 70px;
}
.box .info {
  position: relative;
  width: 600px;
  margin-left: 30px;
  padding: 20px;
  background-color: #eee;
  border-radius: 3px;
}
.info img {
  width: 25px;
  height: 25px;
  position: absolute;
  left: -17px;
  top: 15px;
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