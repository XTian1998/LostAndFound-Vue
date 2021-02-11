<template>
  <div>
    <el-card>
      <el-form
        :model="messageForm"
        :rules="rules"
        ref="messageFormRef"
        label-width="100px"
      >
        <el-form-item label="消息内容：" prop="content">
          <el-input
            type="textarea"
            class="area"
            v-model="messageForm.content"
            :rows="5"
          ></el-input>
        </el-form-item>
        <el-form-item label="接收人：" prop="receiveId">
          <el-input v-model="messageForm.receiveId"></el-input>
          <el-checkbox v-model="sendAll" @change="handleCheckAllChange">所有人</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendMessage">发送</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { request } from "@/network/request";

export default {
  data() {
    return {
      messageForm: {
        content: "",
        receiveId: "",
      },
      rules: {
        content: [
          { required: true, message: "请输入消息内容", trigger: "blur" },
        ],
        receiveId: [
          { required: true, message: "请输入接收人id", trigger: "blur" },
        ],
      },
      sendAll: false
    };
  },
  computed: {
    receiveId() {
      return this.messageForm.receiveId
    }
  },
  watch: {
    receiveId(val) {
      if(val == 'all') {
        this.sendAll = true
      }
    }
  },
  created() {},
  methods: {
    sendMessage() {
      this.$refs.messageFormRef.validate((valid) => {
        if (!valid) return;
        request({
          url: "/message/",
          method: "post",
          data: this.messageForm,
        }).then((res) => {
          if (res.data.meta.status != 201) {
            return this.$message.warning(res.data.meta.msg);
          }
          this.$message.success(res.data.meta.msg);
          this.$refs.messageFormRef.resetFields()
          this.sendAll = false
        });
      });
    },
    handleCheckAllChange() {
      if (this.sendAll) {
        this.messageForm.receiveId = 'all'
      }
      else {
        this.messageForm.receiveId =''
      }
    }
  },
};
</script>
<style scoped>
.el-input {
  width: 15%;
}
.area {
  width: 600px;
}
.el-checkbox {
  margin-left: 40px;
}
</style>