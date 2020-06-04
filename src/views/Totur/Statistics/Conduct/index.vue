<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-button @click="dialogVisible = true">出缺勤操行公式</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="conductData" style="width: 100%">
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="studentID" label="學號" width="180"></el-table-column>
          <el-table-column prop="score" label="操行分數" width="180"></el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!-- 操行公式顯示匡 -->
    <el-dialog title="操行公式" :visible.sync="dialogVisible" width="30%">
      <span>1+1 = 2</span>
    </el-dialog>
  </div>
</template>

<script>
function conductData () {
  return [
    { name: '王大名', studentID: 1234567, score: 50 },
    { name: '王大華', studentID: 7654321, score: 90 }
  ]
}

export default {
  data () {
    return {
      conductData: [],
      dialogVisible: false
    }
  },
  created () {
    this.getConductData()
  },
  methods: {
    getConductData () {
      this.conductData = conductData()
    }
  }
}
</script>
