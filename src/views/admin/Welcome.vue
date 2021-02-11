<template>
  <div>
    <h2>欢迎来到失物招领平台后台管理系统</h2>
    <p>
      大学校园就像一个“小社会”一般，学生们在其中度过四年的学习时光，在平时的学习生活中，学生们需要经常往来于不同的地方，活动比较频繁，因此很容易发生物品丢失的情况。
    </p>
    <p>
      如今是一个信息发达的时代，各行各业都需要计算机辅助进行信息处理，即保证了数据的安全，又提高了工作效率。如今高校信息化建设在不断跟进，许多与教师、学生生活和学习相关的服务都已经信息化，比如一卡通系统、教务系统、就业系统等等，失物招领系统虽然在近些年不断发展，如广州失物招领、上海失物招领，但大多规模级别过大，在校园生活中仍然是以传统的失物招领的办法，如失物招领公告或是需要学生在失物招领中心登记，效果不高，而且费时费力，缺少一个可以供失主和拾主交流的网络化平台。
    </p>
    <p>
      本次希望通过设计开发一个失物招领平台，使得失主和拾主能够更好地进行交流，借助平台的便捷性和开放性有效地帮助遗失物品的学生。失物招领平台以前后端分离的形式进行设计开发，前端采用MVVM框架Vue.js，轻巧、生态丰富,后端采用Flask框架，小巧、可扩展性强，而数据库用的是Mysql。用户端包括寻物、招领启事的发布、查询，用户留言等等功能，管理员端包括用户管理、网站管理等等功能。
    </p>
    <img class="welcome" src="~@/assets/images/welcome.png" alt="" />
    <img class="book" src="~@/assets/images/welcome-2.png" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
div {
  position: relative;
  height: 750px;
  background-color: #fff;
  padding-left: 100px;
}
h2 {
  padding: 30px;
  font-size: 40px;
}
p {
  text-indent: 2rem;
  font-size: 20px;
  width: 800px;
}
.welcome {
  position: absolute;
  top: 50px;
  right: 100px;
  width: 300px;
}
.book {
  position: absolute;
  bottom: 50px;
  right: 100px;
  width: 500px;
}
</style>