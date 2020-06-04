<template>
  <div>
    <div class="todayInfoBox">
      <div class="chartsBox">
        <Charts :option="chartsOption" @mouseover="showDetail"/>
      </div>
      <ul class="dataDetail">
        <li v-for="(data, status) in showDetailData" :key="status">
          <h3 :style="{background: color[status]}">{{ status }}</h3>
          <p v-for="(name, index) in data" :key="index">{{ name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Charts from '@/components/Charts'
import { getTodayRecordAPI } from '@/api/teacher-tutor'
import mixin from './mixin'

export default {
  mixins: [mixin],
  components: { Charts },
  data () {
    return {
      chartsOption: {},
      todayRecord: {},
      showDetailData: {}
    }
  },
  created () {
    this.getTodayRecord()
  },
  methods: {
    async getTodayRecord () {
      try {
        const { data } = await getTodayRecordAPI()
        // 整理數據
        this.todayRecord = this.$_sortData(data)
        // 統計資料
        console.log(this.countData)
        this.chartsOption = this.generateChartsOption()
      } catch (error) {
        console.log(error)
      }
    },
    generateChartsOption () {
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['缺曠']
        },
        xAxis: {
          data: this.lessons
        },
        yAxis: {
        },
        series: this.seriesData
      }
    },
    showDetail (event) {
      const all = this.todayRecord[event.name]
      const filter = {}
      for (const key in all) {
        if (!all[key].length) continue
        filter[key] = all[key]
      }
      // console.log(filter)
      this.showDetailData = filter
    }
  },
  computed: {
    seriesData () {
      console.log(this.countData)
      return this.countData.map(count => {
        return {
          name: count.key,
          type: 'bar',
          stack: 'class',
          barMaxWidth: 35,
          itemStyle: {
            normal: {
              color: count.color,
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter (params) {
                  return params.value > 0 ? params.value : ''
                }
              }
            }
          },
          data: count.countData.map(lesson => lesson.data.length)
        }
      })
    }
  }
}
</script>

<style>
.todayInfoBox {
  display: flex;
}
.todayInfoBox .chartsBox {
  flex: 7;
}
.todayInfoBox .dataDetail {
  flex: 3;
}
</style>
