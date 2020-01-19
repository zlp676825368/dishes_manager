<template>
  <div class="content">
    <!-- 2： 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="main" style="width: 100%;height:100%;"></div>
  </div>
</template>

<script>
//1,导入echarts
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  //mounted函数执行，因为此函数代表页面dom渲染完毕
  mounted() {
    // 3,基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    //4，准备数据和配置项
    let option = {
      title: {
        text: "ECharts 入门示例"
      },
      tooltip: {},
      legend: {
        data: ["销量1"]
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [
        {
          name: "销量1",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    };
    // 5:使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
};
</script>
<style lang="scss" scoped>
  .content{
    height: 100%;
    display: flex;
    
  }
</style>