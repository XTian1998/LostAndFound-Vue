<template>
  <div>
    <div id="editor"></div>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  data() {
    return {
      editorContent: "",
    };
  },
  mounted() {
    const editor = new E(document.getElementById("editor"));
    editor.config.onchange = (html) => {
      this.editorContent = html;
      this.$emit("change", this.editorContent);
    };
    editor.config.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "emoticon", // 表情
      "table", // 表格
      "undo", // 撤销
      "redo", // 重复
    ];
    editor.create();
  },
};
</script>
<style scoped>
</style>