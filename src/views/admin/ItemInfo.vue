<template>
  <div>
    <el-card>
      <div class="search_bar">
        <div class="section">
          <label for="info">信息类型：</label>
          <el-select v-model="queryForm.info" placeholder="请选择" id="info">
            <el-option
              v-for="item in infoOptions"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="section">
          <label for="type">物品种类：</label>
          <el-select v-model="queryForm.type" placeholder="请选择" id="type">
            <el-option
              v-for="item in type_list"
              :key="item.label"
              :label="item.label"
              :value="item.type"
            >
            </el-option>
          </el-select>
        </div>
        <div class="section">
          <label for="date">时间：</label>
          <el-select v-model="queryForm.date" placeholder="请选择" id="date">
            <el-option
              v-for="item in dateOptions"
              :key="item.label"
              :label="item.label"
              :value="item.date"
            >
            </el-option>
          </el-select>
        </div>
        <div class="section">
          <label for="campus">校区：</label>
          <el-select
            v-model="queryForm.campus"
            placeholder="请选择"
            id="campus"
          >
            <el-option
              v-for="item in campusOptions"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="section" v-if="queryForm.campus == '奉贤校区'">
          <label for="place1">地点：</label>
          <el-select v-model="queryForm.place" placeholder="请选择" id="place1">
            <el-option
              v-for="item in placeOptions[0]"
              :key="item.label"
              :label="item.label"
              :value="item.place"
            >
            </el-option>
          </el-select>
        </div>
        <div class="section" v-if="queryForm.campus == '徐汇校区'">
          <label for="place2">地点：</label>
          <el-select v-model="queryForm.place" placeholder="请选择" id="place2">
            <el-option
              v-for="item in placeOptions[1]"
              :key="item.label"
              :label="item.label"
              :value="item.place"
            >
            </el-option>
          </el-select>
        </div>
        <div class="section">
          <label for="key">关键字：</label>
          <el-input
            placeholder="请输入关键字"
            v-model="queryForm.desc"
            clearable
            @clear="getItemInfo"
            id="key"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getItemInfo"
            ></el-button>
          </el-input>
        </div>
      </div>

      <hr />
      <br />
      <br />
      <br />

      <el-table :data="item_list" style="width: 90%" border stripe>
        <el-table-column type="expand">
          <template v-slot="scope">
            <div class="wrapper">
              <div class="details">
                <div>物品类别：{{ scope.row.type }}</div>
                <span>物品图片：</span>
                <div class="imgs">
                  <img
                    :src="baseURL + scope.row.image"
                    alt=""
                    v-if="scope.row.image != '' && scope.row.image != undefined"
                  />
                  <img v-else src="~@/assets/images/default.png" alt="" />
                </div>
              </div>
              <div>
                <span>物品描述：</span>
                <div v-html="scope.row.desc"></div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="编号" width="180"> </el-table-column>
        <el-table-column prop="info" label="类型" width="150">
        </el-table-column>
        <el-table-column prop="campus" label="校区" width="120">
        </el-table-column>
        <el-table-column prop="place" label="地点" width="120">
        </el-table-column>
        <el-table-column label="日期" width="120">
          <template v-slot="scope">
            {{ scope.row.date | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="描述" width="280">
          <template v-slot="scope">
            <div v-html="scope.row.desc"></div>
          </template>
        </el-table-column>
        <el-table-column prop="uid" label="学号" width="120"> </el-table-column>
        <el-table-column label="物品状态" width="100"
          >>
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.is_claim">已找回</el-tag>
            <el-tag type="warning" v-else>未找回</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否删除" width="100"
          >>
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.is_delete">已删除</el-tag>
            <el-tag type="warning" v-else>未删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作"
          >>
          <template v-slot="scope">
            <el-button
              @click="deleteInfo(scope.row.id)"
              type="danger"
              size="mini"
              >删除</el-button
            >
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
      total: 0,
      pagesize: 5,
      pagenum: 1,
      item_list: [],
      queryForm: {
        info: "",
        type: "",
        date: 0,
        campus: "",
        place: "",
        desc: "",
      },
      type_list: [],
      infoOptions: [
        { label: "全部", value: "" },
        { label: "寻物启事", value: "寻物启事" },
        { label: "招领启事", value: "招领启事" },
      ],
      dateOptions: [
        { label: "全部", date: 0 },
        { label: "三天内", date: 3 },
        { label: "一周内", date: 7 },
        { label: "一月内", date: 30 },
      ],
      campusOptions: [
        { label: "全部", value: "" },
        { label: "奉贤校区", value: "奉贤校区" },
        { label: "徐汇校区", value: "徐汇校区" },
      ],
      placeOptions: [
        [
          { place: "", label: "全部" },
          { place: "一教", label: "一教" },
          { place: "二教", label: "二教" },
          { place: "三教", label: "三教" },
          { place: "四教", label: "四教" },
          { place: "五教", label: "五教" },
          { place: "图书馆", label: "图书馆" },
          { place: "体育馆", label: "体育馆" },
          { place: "紫藤苑", label: "紫藤苑" },
          { place: "玉兰苑", label: "玉兰苑" },
          { place: "金桂苑", label: "金桂苑" },
          { place: "其它", label: "其它" },
        ],
        [
          { place: "", label: "全部" },
          { place: "一教", label: "一教" },
          { place: "二教", label: "二教" },
          { place: "三教", label: "三教" },
          { place: "四教", label: "四教" },
          { place: "五教", label: "五教" },
          { place: "六教", label: "六教" },
          { place: "图书馆", label: "图书馆" },
          { place: "丹桂苑", label: "丹桂苑" },
          { place: "香樟苑", label: "香樟苑" },
          { place: "紫薇苑", label: "紫薇苑" },
          { place: "其它", label: "其它" },
        ],
      ],
    };
  },
  created() {
    request({
      url: "/type/",
      method: "get",
    }).then((res) => {
      if (res.data.meta.status !== 200) {
        return this.$message.error(res.data.meta.msg);
      }
      for (let type of res.data.data.type_list) {
        this.type_list.push({
          label: type.type,
          type: type.type,
        });
      }
      this.type_list.unshift({
        label: "全部",
        type: "",
      });
      this.getItemInfo();
    });
  },
  methods: {
    getItemInfo() {
      request({
        url: "/iteminfo/",
        method: "get",
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          campus: this.queryForm.campus,
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
    handleSizeChange(size) {
      this.pagesize = size;
      this.getItemInfo();
    },
    handleCurrentChange(page) {
      this.pagenum = page;
      this.getItemInfo();
    },
    deleteInfo(id) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          request({
            url: `/admin/item/`,
            method: "delete",
            data: {
              id,
            },
          }).then((res) => {
            if (res.data.meta.status !== 204) {
              return this.$message.error(res.data.meta.msg);
            }
            this.$message.success(res.data.meta.msg);
            this.getItemInfo();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除！");
        });
    },
  },
};
</script>
<style scoped>
.search_bar {
  width: 800px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 70px;
}
.el-input {
  width: 250px;
}
.el-select {
  width: 120px;
}
.section {
  margin-top: 20px;
  margin-right: 80px;
}
.wrapper {
  display: flex;
  font-size: 16px;
  line-height: 2;
}
.details {
  margin-right: 100px;
}
.imgs img {
  width: 250px;
}
</style>