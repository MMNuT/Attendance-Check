<template>
  <div>
    <el-row class="title">
      <el-col :span="24"><h1>{{ classData.ClassName }}{{ classData.Subject }}</h1></el-col>
    </el-row>
    <el-table
      :data="classData.StudentInfo"
      :max-height="tableMaxHeight"
      class="roll-call-table"
      @cell-click="editAttendance"
      :cell-class-name="tableClassCallBack"
    >
      <el-table-column label="學號" prop="學號" v-if="size >= 992"></el-table-column>
      <el-table-column label="姓名" prop="姓名" width="80"></el-table-column>
      <el-table-column :label="label('出席')" :width="tableWidth">
        <template #default="scope">
          <RollCallUnit :scope="scope" :attend="1" />
        </template>
      </el-table-column>
      <el-table-column :label="label('遲到')" :width="tableWidth">
        <template #default="scope">
          <RollCallUnit :scope="scope" :attend="2" />
        </template>
      </el-table-column>
      <el-table-column :label="label('事假')" :width="tableWidth">
        <template #default="scope">
          <RollCallUnit :scope="scope" :attend="3" />
        </template>
      </el-table-column>
      <el-table-column :label="label('病假')" :width="tableWidth">
        <template #default="scope">
          <RollCallUnit :scope="scope" :attend="4" />
        </template>
      </el-table-column>
      <el-table-column :label="label('喪假')" :width="tableWidth">
        <template #default="scope">
          <RollCallUnit :scope="scope" :attend="5" />
        </template>
      </el-table-column>
      <el-table-column :label="label('曠課')" :width="tableWidth">
        <template #default="scope">
          <RollCallUnit :scope="scope" :attend="6" />
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="8" :offset="16" class="button-box">
        <el-button @click="dialogVisible = true">送出</el-button>
      </el-col>
    </el-row>
    <Confirm :data="countProblemStudentData" :dialogVisible.sync="dialogVisible" @requestData="requestData"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { filterProblemStudents, organizeProblemStudentsData } from './process-data'
import { insertRollCallData, updateRollCallData } from '@/api/teacher-lecturer'
import { RollCallUnit, Confirm } from './component'
// import defaultSet from '@/mixins/default'
import { resize, defaultSet } from '@/mixins'

export default {
  mixins: [defaultSet, resize],
  components: { RollCallUnit, Confirm },
  data () {
    return {
      dialogVisible: false,
      statusOneWord: {
        事: '事假',
        出: '出席',
        喪: '喪假',
        曠: '曠課',
        病: '病假',
        遲: '遲到'
      }
    }
  },
  computed: {
    ...mapState({
      // 該班資料
      classData: state => state.lecturer.classData,
      // 後台需要的參數們
      rollCallParams: state => state.lecturer.rollCallParamsTemporaryStorage
    }),
    // 所有要傳給後端的數據
    allData () {
      const params = { ...this.rollCallParams.params }
      let StudentInfo = []
      if (this.rollCallParams.method === 'post') {
        params.Subject = this.classData.Subject
        StudentInfo = this.classData.StudentInfo.map(student => ({
          Attendance: student.Attendance,
          StudentId: student.StudentId
        }))
      } else if (this.rollCallParams.method === 'put') {
        StudentInfo = this.classData.StudentInfo.map(student => ({
          Attendance: student.Attendance,
          StudentId: student.StudentId,
          Id: student.Id
        }))
      } else {
        throw new Error('服務器給的參數有誤')
      }
      params.StudentInfo = StudentInfo
      return params
    },
    countProblemStudentData () {
      // 避免報錯(沒資料的話走這個會 filter of undefined)
      if (!this.classData.StudentInfo) return []
      const hasProblemStudents = filterProblemStudents(this.classData.StudentInfo)
      return organizeProblemStudentsData(hasProblemStudents)
    },
    tableWidth () {
      if (this.size <= 992) {
        /* 40 是 el-main 的 padding */
        /* 80 是 姓名欄位 */
        return (this.size - 40 - 80) / 6
      } else {
        return ''
      }
    },
    tableMaxHeight () {
      console.log(this.$store.getters.clientHeight - 60 - 40 - 43 - 56)
      return this.$store.getters.clientHeight - 60 - 40 - 43 - 56
    }
  },
  created () {
    // 判斷是否有資料, 沒有就閃
    if (!this.classData) {
      this.$router.push({ path: '/' })
        .catch(err => err)
    }
  },
  methods: {
    // 送請求
    async requestData () {
      let message = ''
      try {
        if (this.rollCallParams.method === 'post') {
          message = (await insertRollCallData(this.allData)).message
        } else if (this.rollCallParams.method === 'put') {
          message = (await updateRollCallData(this.allData)).message
        } else {
          return Promise.reject(new Error('方法錯誤', this.rollCallParams.method))
        }
        this.$_message({
          type: 'success',
          message,
          duration: 2000,
          showClose: true
        })
        this.$router.push({ path: '/' }).catch(err => err)
      } catch (error) {
        console.log(error)
      }
    },
    editAttendance (row, column) {
      // 只有一個字的話, 把字塞回來
      const tmp = column.label.length === 1 ? this.statusOneWord[column.label] : column.label
      if (Object.keys(this.attendancesOrder).includes(tmp)) {
        this.$store.dispatch('lecturer/editAttendance', { StudentId: row.StudentId, attend: this.attendancesOrder[tmp] })
      }
    },
    tableClassCallBack ({ column }) {
      if (column.label !== '學號' && column.label !== '姓名') {
        return 'pointer'
      }
    },
    label (label) {
      if (this.size <= 576) {
        return label.substr(0, 1)
      } else {
        return label
      }
    }
  }
}
</script>

<style scoped>
.title .el-col {
  text-align: center;
}

.button-box.el-col {
  text-align: right;
}

.roll-call-table {
  max-width: 90rem;
  margin: 0 auto 0;
}
</style>
