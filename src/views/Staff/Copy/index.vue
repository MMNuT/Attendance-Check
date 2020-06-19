<template>
  <div class="copy-container">
    <div class="copy-header">
      <el-date-picker
        v-model="selectTime"
        type="daterange"
        range-separator="至"
        start-placeholder="開始日期"
        end-placeholder="結束日期"
        @change="getNotification">
      </el-date-picker>
      <div class="gener-notice-box">
        <el-popover
          placement="bottom"
          trigger="hover"
          :width="200">
          <ul>
            <li v-for="data in sortSelectCopy" :key="data.studentID" @click="selectName(data.studentID)" class="copy-count">
              <h3>{{ data.studentID }}</h3>
              <div>{{ data.data.len }}</div>
            </li>
          </ul>
          <el-button slot="reference" @click="copyPart" class="select-part-button" :disabled="countSelectStudent === 0">
            <span class="select-icon">{{ countSelectStudent }}</span>
            <span>列印選取</span>
          </el-button>
        </el-popover>
        <el-button @click="copyAll" :disabled="notification.length === 0">全部列印</el-button>
      </div>
    </div>
    <div class="query-result-box">
      <div>
        <el-table :data="notification" @row-click="showSkipMessage" height="700" class="pointer">
          <el-table-column prop="Name" label="姓名"></el-table-column>
          <el-table-column prop="Times" label="次數"></el-table-column>
          <el-table-column prop="StudentNumber" label="學號" width="130"></el-table-column>
          <el-table-column prop="Class" label="班級" width="130"></el-table-column>
        </el-table>
      </div>
      <div class="select-detail-box" v-if="selectData">
        <div class="select-title">
          <h3>{{ selectData.Name }}</h3>
          <div>{{ selectData.Times }}</div>
        </div>
        <ul class="leave-box">
          <li v-for="(skipData, index) in selectData.result" :key="index" @click="selectCopyUnit(skipData)">
            <ul>
              <li v-for="(lessonName, en) in detailChinese" :key="en" class="leave-detail">
                <p class="leave-detail-title">{{ lessonName }}</p>
                <p class="leave-detail-context">{{ skipData[en] }}</p>
              </li>
            </ul>
            <div class="select" v-show="skipData.select"></div>
          </li>
        </ul>
        <div>
          <el-button @click="allSelect">全部選取</el-button>
          <el-button @click="cancelAllSelect">全部取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { splitTimesToStartAndEnd, timeFormat, periodFormat } from '@/utils/format'
import { getNotification } from '@/api/staff'
import { redirectToDownloadByBlank } from '@/utils'

export default {
  data () {
    return {
      selectTime: '',
      notification: [],
      selectData: '',
      detailChinese: {
        LessonDate: '日期',
        LessonOrder: '課堂',
        Subject: '課名'
      },
      // 想裝要列印的數據
      selectCopy: {}
    }
  },
  computed: {
    splitTimesToStartAndEnd () {
      return splitTimesToStartAndEnd(this.selectTime || '')
    },
    countSelectStudent () {
      console.log(this.selectCopy)
      return Object.keys(this.selectCopy).length
    },
    sortSelectCopy () {
      return Object.keys(this.selectCopy)
        .sort((a, b) => a - b)
        .map(studentID => ({ studentID, data: this.selectCopy[studentID] }))
    }
  },
  methods: {
    async getNotification () {
      try {
        this.notification = []
        this.selectCopy = {}
        this.selectData = ''
        const { data } = await getNotification(this.splitTimesToStartAndEnd)
        // this.$_sortNotification(data)
        console.log(data)
        this.notification = data
      } catch (error) {
        console.log(error)
      }
    },
    showSkipMessage (row) {
      // 還沒整理過就整理一下
      if (!row.sort) {
        row.result = this.$_sortData(row.result)
        row.sort = true
      }
      this.selectData = row
    },
    $_sortData (data) {
      return data.map((d, i) => ({
        LessonDate: timeFormat(d.LessonDate),
        LessonOrder: periodFormat(d.LessonOrder),
        Subject: d.Subject,
        select: false,
        index: i
      }))
    },
    selectCopyUnit (selectData) {
      const StudentNumber = this.selectData.StudentNumber
      selectData.select = !selectData.select
      if (!this.selectCopy[StudentNumber]) {
        this.$set(this.selectCopy, StudentNumber, { len: 1, data: { [selectData.index]: selectData } })
      } else {
        if (selectData.select) {
          this.selectCopy[StudentNumber].len++
          this.$set(this.selectCopy[StudentNumber].data, selectData.index, selectData)
        } else {
          if (this.selectCopy[StudentNumber].len === 1) {
            this.$delete(this.selectCopy, StudentNumber)
          } else {
            this.selectCopy[StudentNumber].len--
            this.$delete(this.selectCopy[StudentNumber].data, selectData.index)
          }
        }
      }
      console.log(this.selectCopy)
    },
    allSelect () {
      this.$set(this.selectCopy, this.selectData.StudentNumber, { len: 0, data: {} })
      this.selectData.result.forEach(data => {
        data.select = true
        this.selectCopy[this.selectData.StudentNumber].len++
        this.$set(this.selectCopy[this.selectData.StudentNumber].data, data.index, data)
      })
    },
    cancelAllSelect () {
      this.$delete(this.selectCopy, this.selectData.StudentNumber)
      this.selectData.result.forEach(data => {
        data.select = false
      })
    },
    selectName (studentNumber) {
      console.log(this.notification, studentNumber)
      this.notification.some(student => {
        if (student.StudentNumber === studentNumber) {
          this.showSkipMessage(student)
          return true
        }
      })
    },
    copyPart () {
      this.$_copy(this.$_copyPartDataSort())
    },
    copyAll () {
      this.$_copy()
    },
    $_copyPartDataSort () {
      return Object.keys(this.selectCopy).map(studentID => {
        let tmp = {}
        this.notification.some(student => {
          if (student.StudentNumber === studentID) {
            tmp = {
              ...student,
              result: this.selectCopy[studentID].data
            }
            return true
          }
        })
        return tmp
      })
    },
    $_copy (data = this.notification) {
      window.localStorage.setItem('copy', JSON.stringify(data))
      redirectToDownloadByBlank('#/copy/download')
    }
  }
}
</script>

<style scoped>
/* 頭部 */
.copy-container .copy-header {
  display: flex;
}

.copy-header .el-date-editor,
.gener-notice-box > span {
  margin-right: 2rem;
}

.gener-notice-box .select-icon {
  position: absolute;
  line-height: 3rem;
  width: 3rem;
  transform: translate(100%, -50%);
  background: var(--main-yellow);
  display: inline-block;
  text-align: center;
  top: 0;
  right: 0;
  border-radius: 50%;
}
.gener-notice-box .copy-select .el-popover__reference {
  width: 100%;
  display: inline-block;
  line-height: 3rem;
}

/* 身體 */
.query-result-box {
  display: flex;
}

.select-detail-box {
  flex: 1;
}

.select-detail-box .select-title > div {
  background: #e33c3c;
  color: white;
  line-height: 3rem;
  height: 3rem;
  width: 3rem;
  text-align: center;
  border-radius: 50%;
}

.select-detail-box .leave-box {
  display: flex;
  flex-wrap: wrap;
}

.select-detail-box .leave-box > li {
  background: #e33c3c;
  padding: 1rem;
  min-width: 20rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  position: relative;
}

.select-detail-box .leave-box .select {
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  background: var(--main-yellow);

  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}

.select-title {
  display: flex;
}
.leave-detail {
  display: flex;
  margin-bottom: .5rem;
}

.leave-detail .leave-detail-title {
  background: black;
  color: white;
  margin-right: 1rem;
}
</style>

<style>
.gener-notice-box .select-part-button > span {
  position: relative;
}

.el-popover .copy-count {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-size: 2rem;
  padding: .5rem 1rem;
}
.el-popover .copy-count:hover {
  background: black;
  color: white;
  border-radius: 1rem;
}
</style>
