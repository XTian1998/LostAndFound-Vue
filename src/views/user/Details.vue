<template>
  <div>
    <search-bar @search="search"></search-bar>
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
      item_list: [],
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
          pagenum: 1,
          pagesize: 10,
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
        console.log(this.item_list);
      });
    },
  },
};
</script>
<style scoped>
</style>