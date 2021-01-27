<template>
  <el-dialog
    title="发布信息"
    :visible.sync="noticeDialogVisible"
    width="40%"
    @close="noticeDialogClosed"
    @open="noticeDialogOpened"
  >
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item label="信息类型：">
        <el-radio v-model="form.info" label="寻物启事">寻物启事</el-radio>
        <el-radio v-model="form.info" label="招领启事">招领启事</el-radio>
      </el-form-item>
      <el-form-item label="物品种类：" prop="type">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.type"
            :value="item.type"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="证件持有者姓名："
        v-if="form.type == '证件卡类'"
        prop="name"
      >
        <el-input
          v-model="form.name"
          placeholder="请输入姓名"
          class="name"
        ></el-input>
      </el-form-item>
      <el-form-item label="地点：" prop="place">
        <el-cascader
          v-model="place"
          :options="placeOptions"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="时间：" prop="date">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <label>联系人：</label>{{ userInfo.username }}
        <label style="margin-left: 100px">联系电话：</label>{{ userInfo.phone }}
      </el-form-item>
      <el-form-item label="上传物品图片：">
        <el-upload
          class="avatar-uploader"
          :action="baseURL + '/uploads/'"
          :headers="headerObj"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <img :src="baseURL + form.image" alt class="preview" />
      </el-form-item>
      <el-form-item>
        <label>详细描述：</label>
        <editor @change="change" />
      </el-form-item>
      <el-form-item>
        <el-button @click="admit">发布</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { request } from "@/network/request";
import Editor from "../wangEditorConfig/Editor.vue";

export default {
  components: { Editor },
  data() {
    return {
      userInfo: {},
      noticeDialogVisible: this.show,
      form: {
        info: "寻物启事",
        type: "",
        desc: "",
        campus: "",
        image: "",
        date: "",
        place: "",
        name: "",
      },
      options: [],
      placeOptions: [
        {
          value: "奉贤校区",
          label: "奉贤校区",
          children: [
            { value: "一教", label: "一教" },
            { value: "二教", label: "二教" },
            { value: "三教", label: "三教" },
            { value: "四教", label: "四教" },
            { value: "五教", label: "五教" },
            { value: "图书馆", label: "图书馆" },
            { value: "体育馆", label: "体育馆" },
            { value: "紫藤苑", label: "紫藤苑" },
            { value: "玉兰苑", label: "玉兰苑" },
            { value: "金桂苑", label: "金桂苑" },
            { value: "其它", label: "其它" },
          ],
        },
        {
          value: "徐汇校区",
          label: "徐汇校区",
          children: [
            { value: "一教", label: "一教" },
            { value: "二教", label: "二教" },
            { value: "三教", label: "三教" },
            { value: "四教", label: "四教" },
            { value: "五教", label: "五教" },
            { value: "六教", label: "六教" },
            { value: "图书馆", label: "图书馆" },
            { value: "丹桂苑", label: "丹桂苑" },
            { value: "香樟苑", label: "香樟苑" },
            { value: "紫薇苑", label: "紫薇苑" },
            { value: "其它", label: "其它" },
          ],
        },
      ],
      place: [],
      imageUrl: "",
      headerObj: {
        Authorization: window.sessionStorage.getItem("token"),
      },
      rules: {
        type: [{ required: true, message: "请输入物品类型", trigger: "blur" }],
        date: [{ required: true, message: "请输入日期", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        place: [{ required: true, message: "请输入地点", trigger: "blur" }],
      },
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show() {
      this.noticeDialogVisible = this.show;
    },
  },
  components: {
    Editor,
  },
  created() {
    if (window.sessionStorage.getItem("userInfo") != undefined) {
      this.userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
    }
    request({
      url: "/type/",
      method: "get",
    }).then((res) => {
      if (res.data.meta.status != 200) {
        return this.$message.warning(res.data.meta.msg);
      }
      this.options = res.data.data.type_list;
    });
  },
  methods: {
    noticeDialogClosed() {
      this.$emit("update:show", false);
    },
    noticeDialogOpened() {
      this.form = {
        operation: "post",
        info: "寻物启事",
        type: "",
        desc: "",
        campus: "",
        image: "",
        date: "",
        place: "",
        name: "",
      };
      this.place = [];
    },
    admit() {
      this.$refs.formRef.validate((valid) => {
        if (!valid) return;
        request({
          url: "/iteminfo/",
          method: "post",
          data: this.form,
        }).then((res) => {
          if (res.data.meta.status !== 201) {
            return this.$message.error(res.data.meta.msg);
          }
          this.$message.success(res.data.meta.msg);
          this.$emit("update:show", false);
        });
      });
    },
    handleChange() {
      [this.form.campus, this.form.place] = this.place;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess(response) {
      if (response.meta.status !== 200) {
        return this.$message.error("上传失败");
      }
      this.$message.success(response.meta.msg);
      this.form.image = response.data.url;
    },
    change(val) {
      this.form.desc = val;
    },
  },
};
</script>
<style scoped>
.name {
  width: 20%;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  width: 178px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.preview {
  width: 270px;
  margin-top: 20px;
  margin-left: 20px;
}
</style>