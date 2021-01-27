<template>
  <div class="search">
    <div class="title">分类检索</div>
    <div>
      <div class="box info">
        <span class="prop">类型</span>
        <span
          v-for="(value, index) in info"
          :key="index"
          class="content"
          :class="{ active: form.info == value }"
          @click="changeActive('info', value)"
          >{{ value }}</span
        >
      </div>
      <div class="box">
        <span class="prop">种类</span>
        <span
          v-for="(value, index) in type"
          :key="index"
          class="content"
          :class="{ active: form.type == value.type }"
          @click="changeActive('type', value.type)"
          >{{ value.label }}</span
        >
      </div>
      <div class="box">
        <span class="prop">时间</span>
        <span
          v-for="(value, index) in date"
          :key="index"
          class="content"
          :class="{ active: form.date == value.date }"
          @click="changeActive('date', value.date)"
          >{{ value.label }}</span
        >
      </div>
      <div class="box">
        <span class="prop">地点</span>
        <div class="wrapper" v-if="$store.state.campus == '奉贤校区'">
          <span
            v-for="(value, index) in place[0]"
            :key="index"
            class="content"
            :class="{ active: form.place == value.place }"
            @click="changeActive('place', value.place)"
            >{{ value.label }}</span
          >
        </div>
        <div class="wrapper" v-else>
          <span
            v-for="(value, index) in place[1]"
            :key="index"
            class="content"
            :class="{ active: form.place == value.place }"
            @click="changeActive('place', value.place)"
            >{{ value.label }}</span
          >
        </div>
      </div>
      <div class="box">
        <span class="prop">关键词</span>
        <el-input
          placeholder="请输入关键词"
          v-model="form.desc"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      info: ["寻物启事", "招领启事"],
      type: [],
      date: [
        { label: "全部", date: 0 },
        { label: "三天内", date: 3 },
        { label: "一周内", date: 7 },
        { label: "一月内", date: 30 },
      ],
      place: [
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
      form: {
        info: "寻物启事",
        type: "",
        date: 0,
        place: "",
        desc: "",
      },
    };
  },
  computed: {
    getPlace() {
      return this.$store.state.campus;
    },
  },
  watch: {
    getPlace(val) {
      this.form = {
        info: "寻物启事",
        type: "",
        date: "",
        place: "",
      };
    },
  },
  created() {
    request({
      url: "/type/",
      method: "get",
    }).then((res) => {
      if (res.data.meta.status != 200) {
        return this.$message.warning(res.data.meta.msg);
      }
      for (let type of res.data.data.type_list) {
        this.type.push({
          label: type.type,
          type: type.type,
        });
      }
      this.type.unshift({
        label: "全部",
        type: "",
      });
    });

    if (JSON.stringify(this.$route.params) != '{}') {
      this.form = this.$route.params
    }
  },
  methods: {
    changeActive(key, value) {
      this.form[key] = value;
    },
    search() {
      if(this.$route.path == '/welcome') {
        this.$router.push({
          name: 'details',
          params:this.form
        })
      }
      else {
        this.$emit('search', this.form)
      }
    }
  },
};
</script>
<style scoped>
.search {
  margin-top: 20px;
  border: 1px solid #bbb;
  padding-bottom: 20px;
}
.title {
  margin: 20px 40px;
  padding-bottom: 10px;
  font-size: 24px;
  border-bottom: 1px solid #000;
}
.box {
  padding-left: 20px;
  height: 50px;
}
.box:nth-last-child(2) {
  display: flex;
  height: 100px;
  align-items: baseline;
}
.prop {
  padding: 5px 30px;
  color: #fff;
  background-color: rgb(145, 193, 116);
  border-radius: 4px;
  cursor: default;
}
.wrapper {
  display: flex;
  width: 700px;
  flex-wrap: wrap;
}
.wrapper span {
  margin-top: 10px;
}
.content {
  padding: 5px 20px;
  border-right: 1px solid #000;
  cursor: pointer;
}

.info .content:last-child {
  border-right: none;
}
.active {
  color: orange;
}

.el-input {
  width: 180px;
  height: 34px;
  margin-left: 20px;
}
.el-input >>> .el-input__inner {
  height: 34px;
}
</style>