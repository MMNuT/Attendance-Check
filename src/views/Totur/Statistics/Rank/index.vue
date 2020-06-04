<template>
  <div>
    <el-row :getter="20">
      <el-col :span="12">
        <el-button>曠課排行榜</el-button>
      </el-col>
      <el-col :span="12">
        <el-button>請假排行榜</el-button>
      </el-col>
      <Charts :option="chartsOption"/>
    </el-row>
  </div>
</template>

<script>
import Charts from '@/components/Charts'

export default {
  components: { Charts },
  data () {
    return {
      chartsOption: {}
    }
  },
  created () {
    this.getRankData()
  },
  methods: {
    getRankData () {
      // 獲取排行榜數據
      // 生成 ChartsOption
      this.chartsOption = this.generateChartsOption()
    },
    generateChartsOption () {
      return {
        title: {
          text: '世界人口总量',
          subtext: '数据来自网络'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['2011年', '2012年']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            data: [18203, 100000, 29034, 104970, 131744, 630230]
          },
          {
            name: '2012年',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
        ]
      }
    }
  }
}
</script>
