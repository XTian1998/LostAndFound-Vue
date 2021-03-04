<template>
  <div>
    <el-form ref="noticeFormRef" :model="form" label-width="80px" width="40%">
      <el-form-item>
        <label>标题：</label>
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item>
        <label>详细描述：</label>
        <editor
          @change="change"
          class="editor"
          ref="editor"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="admit" type="primary">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from "../wangEditorConfig/Editor.vue";

export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
      },
    };
  },
  // props: {
  //   noticeForm: {
  //     type: Object,
  //     default() {
  //       return {
  //         title: "",
  //         content: "",
  //       };
  //     },
  //   },
  // },
  components: {
    Editor,
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.editor.com.txt.html(this.form.content);
    });
  },
  methods: {
    change(val) {
      this.form.content = val;
    },
    admit() {
      this.$emit("admit", this.form);
    },
  },
};
</script>
<style scoped>
.el-input {
  width: 20%;
}
.editor {
  width: 700px;
}
</style>