<template>
  <div>
    <nav>
      <span class="link" style="margin-left:10px" @click="$router.push('/home')">网站首页</span>
      <span>|</span>
      <span class="link" @click="$router.push('/details')">失物招领</span>
      <span>|</span>
      <span class="link" @click="$router.push('/about')">关于我们</span>
    </nav>
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
nav {
  padding: 24px;
  font-family: Raleway;
  background: #c9e7e5;
  color: #fff;
}
.link {
  transition: 0.3s ease;
  background: #c9e7e5;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  border-top: 4px solid #c9e7e5;
  border-bottom: 4px solid #c9e7e5;
  padding: 20px 0;
  margin: 0 50px;
  cursor: pointer;
}
.link:hover {
  border-top: 4px solid #ffffff;
  border-bottom: 4px solid #ffffff;
  padding: 6px 0;
}
</style>