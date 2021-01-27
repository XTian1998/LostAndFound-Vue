<template>
  <div id="home">
    <header>
      <top class="top" />
      <nav-bar></nav-bar>
    </header>
    <main>
      <article>
        <router-view></router-view>
      </article>
      <aside>
        <div class="info">
          <p>
            服务平台现提供失物招领信息查询服务。失主可根据提示信息对物品进行认领。我们的覆盖范围和服务功能将不断升级，欢迎大家持续关注！
          </p>
          <p>
            截至今日,已发布&nbsp;<span>{{ number }}</span
            >&nbsp;条信息。
          </p>
        </div>
        <notice-board />
        <div class="contact">
          <div class="head">
            <img src="~@/assets/images/contact.png" alt="" />
            <span>联系客服</span>
          </div>
          <ul>
            <li v-for="item in msg" :key="item">{{ item }}</li>
          </ul>
        </div>
      </aside>
    </main>
  </div>
</template>

<script>
import Top from "@/components/user/Top";
import NavBar from "@/components/user/NavBar";
import NoticeBoard from "@/components/user/NoticeBoard";

import { request } from "@/network/request";

export default {
  data() {
    return {
      number: 0,
      msg: ["Email：12365678@qq.com", "Tel:18933666633", "QQ：12365678", "VX:18933666633"],
    };
  },
  components: {
    Top,
    NavBar,
    NoticeBoard,
  },
  created() {
    request({
      url: "/iteminfo/number/",
      method: "get",
    }).then((res) => {
      if (res.data.meta.status != 200) {
        return this.$message.warning("网络错误！");
      }
      this.number = res.data.data.number;
    });
  },
};
</script>
<style scoped>
#home {
  width: 1200px;
  margin: 0 auto;
}
main {
  display: flex;
}
article {
  width: 1050px;
  height: 1000px;
}
aside {
  width: 350px;
  height: 1000px;
  padding: 10px;
  padding-right: 0;
}
.info {
  border: 1px solid rgb(125, 202, 210);
  background-color: rgba(193, 231, 231, 0.5);
  padding: 20px 10px;
}
.info p {
  text-indent: 2em;
  line-height: 2;
  color: rgb(63, 186, 191);
  font-weight: bold;
}
.info span {
  color: rgb(238, 173, 14);
}
.contact {
  height: 300px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #bbb;
}
.head {
  display: flex;
  text-indent: 1em;
  font-size: 24px;
  border-bottom: 1px solid #000;
  line-height: 1.5;
  padding: 10px;
}
.head img {
  width: 36px;
}
.head span {
  margin-left: 10px;
}
ul {
  list-style: none;
  padding: 0;
  padding-left: 10px;
  height: 280px;
  overflow: hidden;
}
li {
  line-height: 2;
  font-size: 18px;
  cursor: pointer;
}
</style>