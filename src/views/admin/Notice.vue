<template>
  <div>
    <el-card>
      <el-table :data="notice_list" style="width: 60%" border>
        <el-table-column type="expand">
          <template v-slot="scope">
            <div class="detail">
              <span>公告内容：</span>
              <div v-html="scope.row.content" class="content"></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="编号" width="180"> </el-table-column>
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column prop="creator" label="操作员" width="180">
        </el-table-column>
        <el-table-column label="日期" width="180">
          <template v-slot="scope">
            {{ scope.row.date | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <div>
              <el-button
                type="primary"
                size="mini"
                @click="editNotice(scope.row)"
                >修改</el-button
              >
              <el-button
                type="danger"
                size="mini"
                @click="deleteNotice(scope.row.id)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      @close="dialogClosed"
    >
      <div>
        <el-form
          ref="noticeFormRef"
          :model="notice"
          label-width="80px"
          width="40%"
        >
          <el-form-item>
            <label>标题：</label>
            <el-input v-model="notice.title"></el-input>
          </el-form-item>
          <el-form-item>
            <label>详细描述：</label>
            <editor
              @change="change"
              class="editor"
              ref="editor"
              :initialContent="notice.content"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="release">发布</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "@/network/request";
import Editor from "@/components/wangEditorConfig/Editor.vue";

export default {
  data() {
    return {
      notice_list: [],
      dialogVisible: false,
      notice: {},
    };
  },
  created() {
    this.getNotice();
  },
  components: {
    Editor,
  },
  methods: {
    deleteNotice(id) {
      this.$confirm("此操作将永久删除该公告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          request({
            url: `/admin/notice/`,
            method: "delete",
            data: {
              id,
            },
          }).then((res) => {
            if (res.data.meta.status !== 204) {
              return this.$message.error(res.data.meta.msg);
            }
            this.$message.success(res.data.meta.msg);
            this.getNotice();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除！");
        });
    },
    getNotice() {
      request({
        url: "/admin/notice/",
        method: "get",
      }).then((res) => {
        if (res.data.meta.status != 200) {
          return this.$message.warning(res.data.meta.msg);
        }
        this.notice_list = res.data.data.admin_notice_list;
      });
    },
    editNotice(notice) {
      this.notice = notice;
      this.$nextTick(() => {
        this.$refs.editor.com.txt.html(this.notice.content);
      });
      this.dialogVisible = true;
    },
    change(val) {
      this.notice.content = val;
    },
    dialogClosed() {
      this.getNotice();
    },
    release() {
      request({
        url: "/admin/notice/",
        method: "put",
        data: {
          id: this.notice.id,
          title: this.notice.title,
          content: this.notice.content
        },
      }).then((res) => {
        if (res.data.meta.status != 201) {
          return this.$message.warning(res.data.meta.msg);
        }
        this.$message.success(res.data.meta.msg);
        this.getNotice()
        this.dialogVisible = false
      });
    },
  },
};
</script>
<style scoped>
.detail span {
  font-size: 18px;
  margin-bottom: 40px;
}
.detail .content {
  margin-top: 40px;
  margin-left: 70px;
}
.el-input {
  width: 30%;
}
.editor {
  width: 700px;
}
</style>