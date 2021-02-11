<template>
  <div>
    <el-card>
      <el-button type="primary" @click="dialogVisible = true"
        >添加分类</el-button
      >
      <el-table :data="type_list" style="width: 60%" border stripe>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="type" label="分类"></el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialogClosed"
    >
      <el-form
        :model="addTypeForm"
        :rules="rules"
        ref="addTypeFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="type">
          <el-input v-model="addTypeForm.type"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="post">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "@/network/request";

export default {
  data() {
    return {
      type_list: [],
      dialogVisible: false,
      addTypeForm: {
        type: "",
      },
      rules: {
        type: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getTypeList();
  },
  methods: {
    getTypeList() {
      request({
        url: "/type/",
        method: "get",
      }).then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error(res.data.meta.msg);
        }
        this.type_list = res.data.data.type_list;
      });
    },
    post() {
      this.$refs.addTypeFormRef.validate((valid) => {
        if (!valid) return;
        request({
          url: "/type/",
          method: "post",
          data: this.addTypeForm
        }).then((res) => {
          if (res.data.meta.status !== 201) {
            return this.$message.error(res.data.meta.msg);
          }
          this.$message.success(res.data.meta.msg);
          this.dialogVisible = false;
          this.getTypeList();
        });
      });
    },
    dialogClosed() {
      this.$refs.addTypeFormRef.resetFields();
    },
  },
};
</script>
<style scoped>
</style>