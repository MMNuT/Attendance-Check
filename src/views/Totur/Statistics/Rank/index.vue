<template>
  <div class="charts-box">
    <div>
      <Charts :option="chartsOption.skip" width="60.5rem"/>
    </div>
    <div>
      <Charts :option="chartsOption.leave" width="60.5rem"/>
    </div>
  </div>
</template>

<script>
import Charts from '@/components/Charts'
import { getSkipData, getLeaveData } from '@/api/teacher-tutor'
import defaultSet from '@/mixins/default'

export default {
  mixins: [defaultSet],
  components: { Charts },
  data () {
    return {
      word: {
        skipData: {
          titleText: '曠課排行榜',
          seriesName: '曠課次數',
          colorListKey: '曠課'
        },
        leaveData: {
          titleText: '請假排行榜',
          seriesName: '請假次數',
          colorListKey: '請假'
        }
      },
      chartsOption: {
        skip: {},
        leave: {}
      }
    }
  },
  created () {
    this.getSkipData()
    this.getLeaveData()
  },
  methods: {
    async getSkipData () {
      const { data } = await getSkipData()
      // this.rankDatas.skipData = data
      // 1. 排序
      this.$_dataSort(data)
      // 2. 搜集參數
      const { yAxis, seriesData } = this.$_collectParams(data)
      // 3. 畫圖
      this.chartsOption.skip = this.generateChartsOption({ yAxis, seriesData, others: this.word.skipData })
    },
    async getLeaveData () {
      const { data } = await getLeaveData()
      // 1. 排序
      this.$_dataSort(data)
      // 2. 搜集參數
      console.log(data)
      const { yAxis, seriesData } = this.$_collectParams(data)
      // 3. 畫圖
      this.chartsOption.leave = this.generateChartsOption({ yAxis, seriesData, others: this.word.leaveData })
    },
    $_dataSort (data) {
      data.sort((a, b) => b.Times - a.Times)
    },
    $_collectParams (data) {
      const yAxis = []
      const seriesData = []
      data.forEach(d => {
        yAxis.push(d.Name)
        seriesData.push(d.Times)
      })
      return { yAxis, seriesData }
    },
    generateChartsOption ({ yAxis, seriesData, others }) {
      console.log(yAxis, seriesData, others)
      return {
        title: {
          text: others.titleText,
          textStyle: {
            fontFamily: 'JasonHandwriting3',
            fontSize: 30,
            color: '#fff'
          },
          backgroundColor: this.attendanceColorList[others.colorListKey]
        },
        tooltip: {
          trigger: 'axis',
          textStyle: {
            fontSize: 20
          }
        },
        legend: {
          type: false
        },
        grid: {
          show: false
        },
        xAxis: {
          axisLabel: {
            textStyle: {
              fontSize: 18
            }
          }
        },
        yAxis: {
          type: 'category',
          data: yAxis.reverse(),
          axisLabel: {
            textStyle: {
              fontSize: 18,
              fontFamily: 'jf-openhuninn'
            }
          }
        },
        series: [
          {
            name: others.seriesName,
            type: 'bar',
            data: seriesData.reverse(),
            barMaxWidth: 35,
            color: this.attendanceColorList[others.colorListKey]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.charts-box {
  display: flex;
  height: 100%;
}
.charts-box > div {
  flex: 1;
  height: 100%;
}

@media screen and (max-width: 576px) {
  .charts-box {
    flex-wrap: wrap;
  }
}
</style>
