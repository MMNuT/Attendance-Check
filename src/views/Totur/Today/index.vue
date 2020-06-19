<template>
  <div class="today-container">
    <div class="todayInfoBox">
      <div class="chartsBox">
        <Charts :option="chartsOption" @mouseover="showDetail" width="80rem"/>
      </div>
      <div class="dataDetailBox">
        <div v-if="isAllComing" class="all-coming-messagebox c-attendBox">
          <p class="all-coming-messagebox__content">
            <span>全員</span>
            <span>到齊</span>
          </p>
        </div>
        <ul v-else>
          <li v-for="(data, status) in showDetailData" :key="status" class="c-attendBox" :class="attendanceColorNameList[status]">
            <div class="attendBox__title">
              <h4>{{ status | sliceToOneWord }}</h4>
            </div>
            <ul class="attendBox__name-box">
              <li v-for="(name, index) in data" :key="index">{{ name }}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Charts from '@/components/Charts'
import { getTodayRecordAPI } from '@/api/teacher-tutor'
import { handleData, resize } from './mixin'
import defaultSet from '@/mixins/default'
import { sliceToOneWord } from '@/utils/format'

export default {
  filters: {
    sliceToOneWord
  },
  mixins: [handleData, resize, defaultSet],
  components: { Charts },
  data () {
    return {
      chartsOption: {},
      todayRecord: {},
      showDetailData: {},
      isAllComing: false
    }
  },
  computed: {
    seriesData () {
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
                show: false
              }
            }
          },
          data: count.countData.map(lesson => lesson.data.length)
        }
      })
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
          trigger: 'axis',
          textStyle: {
            fontSize: 20
          }
        },
        legend: {
          data: ['缺曠']
        },
        xAxis: {
          data: this.lessons,
          axisLabel: {
            textStyle: {
              fontSize: 16,
              fontFamily: 'jf-openhuninn'
            }
          }
        },
        yAxis: {
        },
        series: this.seriesData
      }
    },
    showDetail (event) {
      console.log(event, this.chartsOption, this.todayRecord)
      const all = this.todayRecord[event.name]
      const filter = {}
      let tmp = 0
      for (const key in all) {
        if ((!all[key].length) || key === '出席') continue
        tmp++
        filter[key] = all[key]
      }
      if (!tmp) {
        this.isAllComing = true
      } else {
        this.isAllComing = false
        this.showDetailData = filter
      }
    }
  }
}
</script>

<style scoped>
@import '../../../assets/css/attend-list.css';
@import '../../../assets/css/attend-list-color.css';
.today-container,
.todayInfoBox {
  height: 100%;
}

.todayInfoBox {
  display: flex;
}
.todayInfoBox .chartsBox {
  margin: 0 -6rem;
}
.dataDetailBox {
  min-width: 20.5rem;
}

/* 全員到齊一次掉兩個下來 */
.all-coming-messagebox__content {
  display: flex;
  flex-wrap: wrap;
}
</style>
