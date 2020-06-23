<template>
  <div class="today-container">
    <div class="todayInfoBox">
      <div class="chartsBox">
        <Charts :option="chartsOption" @mouseover="showSelectDetail" width="80rem"/>
      </div>
      <div class="attend-list-box">
        <ul>
          <li
            v-for="(todayRecord, index) in sortTodayRecord"
            :key="todayRecord.name"
            class="attend-list-card"
            :class="{ isActive: isActive === index}">
            <div class="attend-list-card__info" @click="handleAttendListBoxClick(todayRecord)">
              <h3>{{ todayRecord.name }}</h3>
              <ul class="attend-count-box" v-if="todayRecord.data">
                <li v-for="data in todayRecord.data" :key="data.lessonName" :class="attendanceColorNameList[data.lessonName]">
                  <p class="attend-count__lesson-name">{{ data.lessonName }}</p>
                  <p class="attend-count__count">{{ data.studentList.length }}</p>
                </li>
              </ul>
              <div v-else>
                <p>尚未點名</p>
              </div>
            </div>
            <div class="dataDetailBox low576 dataDetailBox576" v-if="isAttend(todayRecord)" :ref="`test${todayRecord.index}`">
              <div v-if="todayRecord.isAllComing" class="all-coming-messagebox c-attendBox fixedAttendBox">
                <p class="all-coming-messagebox__content">
                  <span>全員</span>
                  <span>到齊</span>
                </p>
              </div>
              <ul v-else class="fixedAttendBox">
                <li v-for="(data, status) in showAllUnAttendNames(todayRecord).filter" :key="status" class="c-attendBox" :class="attendanceColorNameList[status]">
                  <div class="attendBox__title">
                    <h4>{{ status | sliceToOneWord }}</h4>
                  </div>
                  <ul class="attendBox__name-box">
                    <li v-for="(name, index) in data" :key="index">{{ name }}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="dataDetailBox">
        <div v-if="isAllComing" class="all-coming-messagebox c-attendBox fixedAttendBox">
          <p class="all-coming-messagebox__content">
            <span>全員</span>
            <span>到齊</span>
          </p>
        </div>
        <ul v-else class="fixedAttendBox">
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
import { mapGetters, mapState } from 'vuex'

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
      isAllComing: false,
      isActive: null
    }
  },
  computed: {
    ...mapGetters(['clientWidth']),
    ...mapState({
      isLow576: state => state.app.low576,
      isScreenLarge: state => state.app.isScreenLarge
    }),
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
    },
    sortTodayRecord () {
      // 整理數據排序
      return this.lessons.map((name, index) => {
        if (!this.todayRecord[name]) {
          return {
            name,
            index
          }
        }
        let isAllComing = true
        return {
          data: this.attendances.map(lessonName => {
            if (lessonName !== '出席' && this.todayRecord[name][lessonName].length) {
              isAllComing = false
            }
            return {
              lessonName,
              studentList: this.todayRecord[name][lessonName]
            }
          }),
          name,
          index,
          isAllComing
        }
      })
    }
  },
  watch: {
    isLow576 (newVal) {
      if (newVal) {
        if (this.isActive !== null) {
          /* 重置 */
          this.$_close()
          this.isActive = null
          this.showDetailData = {}
          this.isAllComing = false
        }
      }
    },
    isScreenLarge (newVal) {
      if (newVal) {
        // window.reload()
      }
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
        console.log(this.todayRecord)
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
    showSelectDetail (event) {
      const { tmp, filter } = this.$_takeOutAttend(event)
      if (!tmp) {
        this.isAllComing = true
      } else {
        this.isAllComing = false
        this.showDetailData = filter
      }
    },
    $_takeOutAttend (event) {
      const all = this.todayRecord[event.name]
      const filter = {}
      let tmp = 0
      for (const key in all) {
        if ((!all[key].length) || key === '出席') continue
        tmp++
        filter[key] = all[key]
      }
      return {
        tmp, filter
      }
    },
    showAllUnAttendNames (todayRecord) {
      return this.$_takeOutAttend(todayRecord)
    },
    handleAttendListBoxClick (todayRecord) {
      const boo = this.isAttend(todayRecord)
      if (boo) {
        this.showSelectDetail(todayRecord)
        this.$_displaySelector(todayRecord)
        this.isActive = todayRecord.index
      } else {
        this.$_message({
          type: 'warning',
          message: '尚未點名',
          showClose: true,
          duration: 1000
        })
      }
    },
    // 顯示選擇的課堂名單
    $_displaySelector (todayRecord) {
      console.log(todayRecord.index, this.isActive)
      if (todayRecord.index === this.isActive) {
        this.$_close()
        this.$nextTick(_ => {
          this.isActive = null
        }, 100)
        // console.log(this.isActive)
        return null
      }
      this.$_open(todayRecord)
      if (this.isActive !== null) {
        this.$_close()
      }
    },
    $_open (todayRecord) {
      const ref = `test${todayRecord.index}`
      const cAttendBoxs = this.$refs[ref][0]
      const height = cAttendBoxs.children[0].clientHeight + 30 + 'px'
      cAttendBoxs.classList.add('opening')
      cAttendBoxs.classList.remove('closing')
      cAttendBoxs.style.height = height
    },
    $_close () {
      const ref = `test${this.isActive}`
      const before = this.$refs[ref][0]
      before.classList.add('closing')
      before.classList.remove('opening')
      before.style.height = '170px'
    },
    isAttend (todayRecord) {
      if (todayRecord.data) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
@import '../../../assets/css/attend-list.css';
@import '../../../assets/css/attend-list-color.css';
@import './style/attend-list-box.css';

.today-container,
.todayInfoBox {
  height: 100%;
}

.today-container {
  background: #f4f4f4;
  padding: 2rem;
  overflow: auto;
}

.todayInfoBox {
  display: flex;
}
.todayInfoBox .chartsBox {
  margin: 0 -6rem;
}
.dataDetailBox {
  min-width: 20.5rem;
  flex: 1;
}

/* 全員到齊一次掉兩個下來 */
.all-coming-messagebox__content {
  display: flex;
  flex-wrap: wrap;
}

@media screen and (min-width: 992px) {
  .attend-list-box {
    display: none;
  }
}

@media screen and (max-width: 992px) and (min-width: 576px) {
  .chartsBox {
    display: none;
  }
  .dataDetailBox > .fixedAttendBox {
    position: fixed;
    width: calc((100% - 40px - 40px) / 2);
    right: 4rem;
  }
}

@media screen and (max-width: 576px) {
  .chartsBox {
    display: none;
  }
  .dataDetailBox {
    display: none;
  }
  .attend-list-card .low576 {
    display: block;
  }

  .attend-list-card {
    position: relative;
  }

  .attend-list-card__info {
    position: relative;
    z-index: 9;
    background: #f4f4f4;
    padding: 1.5rem;
    border-radius: 1rem;
    box-shadow:
      1rem 1rem 1rem rgba(0, 0, 0, .2),
      -1rem -1rem 1rem rgba(255, 255, 255, 1),
      inset 0rem 0rem 0rem rgba(0, 0, 0, 0),
      inset 0rem 0rem 0rem rgba(0, 0, 0, 0);
    transition: box-shadow ease .4s;
  }

  .dataDetailBox576 {
    position: absolute;
    width: calc(100%);
    left: 0;
    bottom: 0;
    background: #f4f4f4;

    height: 170px;
    overflow: hidden;
    border-radius: 0 0 1rem 1rem;

    /* transition: transform .3s ease, height .5s .3s ease; */

    padding: 1.5rem;
    border-radius: 0 0 1rem 1rem;
    box-shadow: inset 0.6rem -0.6rem 1rem rgba(0, 0, 0, .3), inset 0rem 1rem 1rem rgba(255, 255, 255, 1);
  }

  .dataDetailBox576 > .fixedAttendBox {
    opacity: 0;
    transition: opacity .3s .5s ease;
  }

  .attend-list-box .attend-list-card {
    padding: 0;
    z-index: 0;
  }

  .isActive.attend-list-card {
    padding: 0;
    z-index: 99;
  }

  .isActive .attend-list-card__info {
    border-radius: 1rem 1rem 0 0;
    box-shadow:
      0rem 0rem 0rem rgba(0, 0, 0, 0),
      0rem 0rem 0rem rgba(0, 0, 0, 0),
      inset .6rem .6rem 1rem rgba(0, 0, 0, .3),
      inset -1rem -1rem 1rem rgba(255, 255, 255, 1);
  }

  .isActive .dataDetailBox576 {
    transform: translateY(100%);
  }

  .isActive .dataDetailBox576 > .fixedAttendBox {
    opacity: 1;
  }

  .opening {
    transition: transform .4s ease, height .4s .4s ease;
  }
  .opening > .fixedAttendBox {
    transition: opacity .3s .8s ease;
  }

  .closing {
    transition: height .6s ease, transform .4s .6s ease, z-index .1s 1s ease;
  }

  .closing > .fixedAttendBox {
    transition: opacity .3s ease;
  }
}
</style>
