<template>
  <div>
    <el-row>
      <el-col :span="24"><h1>{{ classData.ClassName }}</h1></el-col>
    </el-row>
    <el-table :data="classData.StudentInfo" height="800">
      <el-table-column label="學號" prop="學號"></el-table-column>
      <el-table-column label="姓名" prop="姓名"></el-table-column>
      <el-table-column label="出席">
        <template #default="scope">
          <RollCallUnit :scope="scope" :attend="1" />
        </template>
      </el-table-column>
      <el-table-column label="遲到">
        <template #default="scope">
          <RollCallUnit :scope="scope" :attend="2" />
        </template>
      </el-table-column>
      <el-table-column label="事假">
        <template #default="scope">
          <RollCallUnit :scope="scope" :attend="3" />
        </template>
      </el-table-column>
      <el-table-column label="病假">
        <template #default="scope">
          <RollCallUnit :scope="scope" :attend="4" />
        </template>
      </el-table-column>
      <el-table-column label="喪假">
        <template #default="scope">
          <RollCallUnit :scope="scope" :attend="5" />
        </template>
      </el-table-column>
      <el-table-column label="曠課">
        <template #default="scope">
          <RollCallUnit :scope="scope" :attend="6" />
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="8" :offset="16" class="">
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

export default {
  components: { RollCallUnit, Confirm },
  data () {
    return {
      dialogVisible: false
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
      return {
        ...this.rollCallParams.params,
        StudentInfo: this.classData.StudentInfo.map(student => {
          if (this.rollCallParams.method === 'post') {
            return {
              Attendance: student.Attendance,
              StudentId: student.StudentId
            }
          } else if (this.rollCallParams.method === 'put') {
            return {
              Attendance: student.Attendance,
              StudentId: student.StudentId,
              Id: student.Id
            }
          }
        })
      }
    },
    countProblemStudentData () {
      // 避免報錯(沒資料的話走這個會 filter of undefined)
      if (!this.classData.StudentInfo) return []
      const hasProblemStudents = filterProblemStudents(this.classData.StudentInfo)
      return organizeProblemStudentsData(hasProblemStudents)
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
          duration: 2000
        })
        this.$router.push({ path: '/' }).catch(err => err)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
