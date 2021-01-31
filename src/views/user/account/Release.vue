<template>
  <div class="parent">
    <div class="detail">
      <div class="image_box">
        <img :src="baseURL + detail.image" alt="" v-if="detail.image != '' && detail.image != undefined" />
        <img v-else src="~@/assets/images/default.png" alt="" />
      </div>
      <div class="info_box">
        <ul>
          <li>信息类别：{{ detail.info }}</li>
          <li>信息编号：{{ detail.id }}</li>
          <li v-if="detail.info == '招领启事' && detail.is_claim == false">
            状态：未认领
          </li>
          <li v-else-if="detail.info == '寻物启事' && detail.is_claim == false">
            状态：寻找中
          </li>
          <li v-else>状态：已找回</li>
          <li>地点：{{ detail.place }}</li>
          <li>时间：{{ detail.date | dateFormat }}</li>
          <li>联系人：{{ detail.username }}</li>
          <li>联系电话：{{ detail.phone }}</li>
          <li>
            详情:
            <div v-html="detail.desc"></div>
          </li>
        </ul>
      </div>
    </div>
    <el-pagination
      small
      layout="prev, pager, next"
      :total="total"
      :page-size="1"
      :current-page="pagenum"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <div class="btns">
      <el-button @click="deleteInfo">删除</el-button>
      <el-button @click="claimInfo" v-if="detail.is_claim == false"
        >确认找回</el-button
      >
    </div>
  </div>
</template>

<script>
import { request } from "@/network/request";

export default {
  data() {
    return {
      total: 0,
      detail: {},
      pagenum: 1,
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      request({
        url: "/iteminfo/",
        method: "get",
        params: {
          pagenum: this.pagenum,
          pagesize: 1,
          is_delete: false,
          uid: JSON.parse(window.sessionStorage.userInfo).id,
        },
      }).then((res) => {
        if (res.data.meta.status != 200) {
          return this.$message.warning("网络错误！");
        }
        this.detail = res.data.data.item_info_list[0];
        this.total = res.data.data.total;
      });
    },
    handleCurrentChange(newPage) {
      this.pagenum = newPage;
      this.getInfo();
    },
    deleteInfo() {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          request({
            url: "/iteminfo/",
            method: "delete",
            data: {
              id: this.detail.id,
            },
          }).then((res) => {
            if (res.data.meta.status != 204) {
              return this.$message.warning("操作失败！");
            }
            this.$message.success(res.data.meta.msg);
            this.getInfo();
          });
        })
        .catch(() => {});
    },
    claimInfo() {
      this.$confirm("此操作将无法撤回, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          request({
            url: "/iteminfo/",
            method: "put",
            data: {
              id: this.detail.id,
            },
          }).then((res) => {
            console.log(res.data);
            if (res.data.meta.status != 201) {
              return this.$message.warning("操作失败！");
            }
            this.$message.success(res.data.meta.msg);
            this.getInfo();
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped>
.parent {
  position: relative;
}
.detail {
  display: flex;
  padding: 120px 0 30px;
}
.detail .image_box {
  position: relative;
  width: 250px;
  height: 300px;
  margin-left: 95px;
  margin-bottom: 40px;
  border: 1px solid #000;
}
.image_box img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
}
.info_box {
  width: 350px;
  height: 300px;
  border: 1px solid #000;
  border-left: none;
}
.info_box ul {
  list-style: none;
  margin-top: 40px;
}

.info_box ul li {
  height: 30px;
}
.info_box ul li:last-child {
  position: relative;
  overflow: hidden;
}
.info_box ul li:last-child div {
  position: absolute;
  left: 40px;
  top: -14px;
}
.el-pagination {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
.btns {
  position: absolute;
  left: 40px;
  top: 40px;
}
</style>