<template>
  <div>
    <div class="content">
      <div class="box" v-for="message in message_list" :key="message.id">
        <p>{{message.content}}</p>
        <span>{{message.date | timeFormat}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {request} from '@/network/request'
  export default {
    data () {
      return {
        message_list: []
      };
    },
    created() {
      request({
        url: '/message/',
        method: 'get'
      }).then(res => {
        if (res.data.meta.status != 200) {
          return this.$message.warning("网络错误！");
        }
        this.message_list = res.data.data.message_list
        console.log(this.message_list)
      })
    },
  }

</script>
<style scoped>
.content {
  width: 600px;
  height: 500px;
  margin: 40px auto;
  overflow: auto;
}
.box {
  background-color: #eee;
  padding: 10px;
  margin: 20px 20px 20px 0;
  border-radius: 5px;
}
.box p {
  text-indent: 2em;
}
.box span {
  margin-left: 350px;
}
</style>