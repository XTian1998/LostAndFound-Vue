<template>
  <div class="notice_board">
    <div class="head">
      <img src="~@/assets/images/notice_sign.png" alt="" />
      <span>公告栏</span>
    </div>
    <ul>
      <li v-for="item in notice_list" :key="item.id" @click="open(item)">
        <img src="~@/assets/images/arrow.png" alt="" />{{ item.title }}
      </li>
    </ul>

    <el-dialog
      :title="show.title"
      :visible.sync="noticeDialogVisible"
      width="30%"
      class="box"
    >
    <div v-html="show.content"></div>
    <div class="info">
        <span>来自：系统管理员</span>
        <br />
        <br />
        <span>{{show.date | dateFormat}}</span>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      notice_list: [],
      noticeDialogVisible: false,
      show: {}
    };
  },
  created() {
    request({
      url: "/admin/notice/",
      method: "get",
    }).then((res) => {
      if (res.data.meta.status != 200) {
        return this.$message.warning("网络错误！");
      }
      this.notice_list = res.data.data.admin_notice_list;
    });
  },
  methods: {
    open(notice) {
        this.show = notice
        this.noticeDialogVisible = true
    },
  },
};
</script>
<style scoped>
.notice_board {
  height: 350px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #bbb;
}
.head {
  display: flex;
  text-indent: 1em;
  font-size: 24px;
  border-bottom: 1px solid #000;
  line-height: 1.5;
  padding: 10px;
}
.head img {
  width: 31px;
}
.head span {
  margin-left: 10px;
}
ul {
  list-style: none;
  padding: 0;
  height: 280px;
  overflow: hidden;
}
li {
  line-height: 2;
  font-size: 18px;
  cursor: pointer;
}
li img {
  width: 15px;
  height: 15px;
}

.info {
    margin-top: 100px;
    margin-left: 400px;
}
</style>