<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="选择截止日期"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-button
        :disabled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChart()">查询</el-button>
    </el-form>

    <el-row>
      <el-col :span="12"><div id="register_num" style="height:400px;"/></el-col>
      <el-col :span="12"><div id="login_num" style="height:400px;"/></el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><div id="video_view_num" style="height:400px;"/></el-col>
      <el-col :span="12"><div id="course_num" style="height:400px;"/></el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data() {
    return {
      searchObj: {},
      btnDisabled: false,
      chartData: {}, // 图表数据
      xdata: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Postgraduate', 'Phd']
    }
  },

  methods: {

    showChartByType() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('register_num'))

      // 指定图表的配置项和数据
      var option = {
        color: ['#3398DB'],
        title: {
          text: 'Student chart'
        },
        tooltip: {},
        legend: {
          data: ['student number']
        },
        xAxis: {
          type: 'category',
          data: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Postgraduate', 'Phd'],
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval: false
          }
        },
        yAxis: {},
        series: [{
          name: 'student number',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },

    showChart() {
      this.showChartByType()
    }
  }
}
</script>
