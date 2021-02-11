<template>
  <div>
    <el-card>
      <notice-form @admit="admit" ref="noticeForm"></notice-form>
    </el-card>
  </div>
</template>

<script>
import NoticeForm from "@/components/admin/NoticeForm";
import { request } from "@/network/request";

export default {
  data() {
    return {
      form: {},
    };
  },
  components: {
    NoticeForm,
  },
  methods: {
    admit(form) {
      this.form = form;
      request({
        url: "/admin/notice/",
        method: "post",
        data: this.form,
      }).then((res) => {
        if (res.data.meta.status != 201) {
          return this.$message.warning(res.data.meta.msg);
        }
        this.$message.success(res.data.meta.msg)
        this.$refs.noticeForm.form = {
          title: '',
          content: ''
        }
        this.$router.push('/admin/notice')
      });
    },
  },
};
</script>
<style scoped>
</style>