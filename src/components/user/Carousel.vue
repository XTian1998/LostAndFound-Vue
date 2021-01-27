<template>
  <div>
    <el-carousel
      :interval="4000"
      type="card"
      height="250px"
      indicator-position="none"
      class="carousel"
      width="80%"
    >
      <el-carousel-item v-for="item in item_list" :key="item.id">
        <div class="content">
          <img :src="baseURL + item.image" alt="" />
          <div class="info">
              <span>编号：{{ item.id }}</span>
              <span>类型：{{ item.info }}</span>
              <span>物品种类：{{ item.type }}</span>
              <span>校区：{{ item.campus }}</span>
              <span>地点：{{ item.place }}</span>
              <span>日期：{{ item.date | dateFormat}}</span>
              <span>联系人：{{ item.username }}</span>
              <span>联系号码：{{ item.phone }}</span>
              <span v-if="item.info=='寻物启事'">状态：未认领</span>
              <span v-else>状态：寻找中</span>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      item_list: [],
    };
  },
  created() {
    this.getCarousel();
  },
  computed: {
    getCampus() {
      return this.$store.state.campus;
    },
  },
  watch: {
    getCampus(val) {
      this.getCarousel();
    },
  },
  methods: {
    getCarousel() {
      request({
        url: "/iteminfo/",
        method: "get",
        params: {
          image: "true",
          pagenum: 1,
          pagesize: 10,
          is_claim: false,
          is_delete: false,
          campus: this.$store.state.campus,
        },
      }).then((res) => {
        if (res.data.meta.status != 200) {
          return this.$message.warning("网络错误！");
        }
        this.item_list = res.data.data.item_info_list;
      });
    },
  },
};
</script>
<style scoped>
.el-carousel__item div {
  color: #000;
  font-size: 14px;
  opacity: 0.75;
  line-height: 60px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #eee;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #eee;
}

.el-carousel__item img {
  padding: 10px;
  width: 200px;
  height: 230px;
}

.carousel {
  margin-top: 10px;
  padding: 30px 0;
  border: 1px solid #bbb;
}
.content {
  display: flex;
}
.info {
  margin-bottom: 20px;
  padding-top: 0;
  padding-bottom: 20px;
}
.info span {
  display: block;
  height: 25px;
}
</style>