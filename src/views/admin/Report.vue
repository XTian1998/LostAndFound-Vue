<template>
  <div>
    <el-card>
      <h2>各类物品数量分布</h2>
      <div id="main" style="width: 600px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
import { request } from "@/network/request";
import * as echarts from "echarts";

export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    var myChart = echarts.init(document.getElementById("main"));

    request({
      url: "/iteminfo/data/",
      method: "get",
    }).then((res) => {
      this.tableData = res.data.data;

      var option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: this.tableData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    });
  },
};
</script>
<style scoped>
</style>