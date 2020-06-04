<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-col :span="6">
          <el-select v-model="selectData.student" placeholder="選擇學生">
            <el-option
              v-for="(student, index) in selectInfo.student"
              :key="index"
              :label="student"
              :value="student">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="selectData.status" placeholder="出勤狀態">
            <el-option
              v-for="(status, index) in selectInfo.status"
              :key="index"
              :label="status"
              :value="status">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="selectData.time"
            type="daterange"
            range-separator="至"
            start-placeholder="起"
            end-placeholder="迄">
          </el-date-picker>
        </el-col>
      </el-col>
      <el-col :span="4">
        <el-button @click="query">查詢</el-button>
      </el-col>
    </el-row>
    <el-table :data="queryData" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="time" label="時間" width="180"></el-table-column>
      <el-table-column prop="classNum" label="課堂" width="180"></el-table-column>
      <el-table-column prop="className" label="課名" width="180"></el-table-column>
      <el-table-column prop="rollCallTeacher" label="點名老師" width="180"></el-table-column>
      <el-table-column prop="status" label="出勤狀態" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
function initData () {
  return {
    student: ['大大大', '小小小'],
    status: ['出席', '曠課', '事假', '喪假', '病假', '遲到'] // ?
  }
}

function queryData () {
  return [
    {
      name: '洪浩軒',
      time: '2020-05-27',
      classNum: '第三堂',
      className: '國文',
      rollCallTeacher: '王大明',
      status: '曠課'
    }
  ]
}

export default {
  data () {
    return {
      selectInfo: {
        student: [],
        status: []
      },
      selectData: {
        student: '',
        time: '',
        status: ''
      },
      queryData: []
    }
  },
  created () {
    this.getInitData()
  },
  methods: {
    async getInitData () {
      try {
        const { student, status } = await initData()
        this.selectInfo.student = student
        this.selectInfo.status = status
      } catch (error) {

      }
    },
    query () {
      this.queryData = queryData()
    }
  }
}
</script>
