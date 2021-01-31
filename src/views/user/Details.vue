<template>
  <div>
    <search-bar @search="search"></search-bar>
    <div class="list">
      <el-table :data="item_list" style="width: 100%" border stripe>
        <el-table-column prop="type" label="物品种类" width="150">
        </el-table-column>
        <el-table-column prop="place" label="地点" width="150">
        </el-table-column>
        <el-table-column label="日期" width="150">
          <template v-slot="scope">{{ scope.row.date | dateFormat }}</template>
        </el-table-column>
        <el-table-column label="描述">
          <template v-slot="scope">
            <div v-html="scope.row.desc"></div>
          </template>
        </el-table-column>
        <el-table-column width="100">
          <template v-slot="scope">
            <span class="btn" @click="open(scope.row)">详细</span></template
          >
        </el-table-column>
      </el-table>
      <el-pagination
        small
        layout="prev, pager, next"
        :total="total"
        :page-size="5"
        :current-page="pagenum"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <el-dialog title="详细描述" :visible.sync="dialogVisible" width="40%">
      <div class="detail">
        <div class="image_box">
          <img
            :src="baseURL + detail.image"
            alt=""
            v-if="detail.image != ''"
          />
          <img v-else src="~@/assets/images/default.png" alt="" />
        </div>
        <div class="info_box">
          <ul>
            <li>信息类别：{{ detail.info }}</li>
            <li>信息编号：{{ detail.id }}</li>
            <li v-if="detail.info == '招领启事'">认领状态：未认领</li>
            <li v-else>认领状态：寻找中</li>
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
    </el-dialog>
  </div>
</template>

<script>
import { request } from "@/network/request";
import SearchBar from "@/components/user/SearchBar";

export default {
  data() {
    return {
      queryForm: {
        info: "寻物启事",
        type: "",
        date: 0,
        place: "",
        desc: "",
      },
      pagenum: 1,
      item_list: [],
      total: 0,
      dialogVisible: false,
      detail: {},
    };
  },
  components: {
    SearchBar,
  },
  created() {
    if (JSON.stringify(this.$route.params) != "{}") {
      this.queryForm = this.$route.params;
    }
    this.getInfo();
  },
  methods: {
    search(form) {
      this.queryForm = form;
      this.getInfo();
    },
    getInfo() {
      request({
        url: "/iteminfo/",
        method: "get",
        params: {
          pagenum: this.pagenum,
          pagesize: 5,
          is_claim: false,
          is_delete: false,
          campus: this.$store.state.campus,
          info: this.queryForm.info,
          type: this.queryForm.type,
          date: this.queryForm.date,
          place: this.queryForm.place,
          desc: this.queryForm.desc,
        },
      }).then((res) => {
        if (res.data.meta.status != 200) {
          return this.$message.warning("网络错误！");
        }
        this.item_list = res.data.data.item_info_list;
        this.total = res.data.data.total;
      });
    },
    handleCurrentChange(newPage) {
      this.pagenum = newPage;
      this.getInfo();
    },
    open(row) {
      this.dialogVisible = true;
      this.detail = row;
    },
  },
};
</script>
<style scoped>
.list {
  margin-top: 20px;
  padding: 20px;
  padding-bottom: 70px;
  border: 1px solid #bbb;
  position: relative;
}
.el-table {
  font-size: 14px;
}
.el-pagination {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
.btn {
  cursor: pointer;
}
.detail {
  display: flex;
}
.detail .image_box {
  position: relative;
  width: 250px;
  height: 300px;
  margin-left: 60px;
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
</style>