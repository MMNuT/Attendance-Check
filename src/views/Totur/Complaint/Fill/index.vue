<template>
  <div>
    <el-form :model="recordFillData" :rules="recordFillDataFormRules" ref="ruleForm">
      <el-form-item label="聯繫時間" prop="contentTime">
        <el-date-picker v-model="recordFillData.contentTime" type="datetime"></el-date-picker>
      </el-form-item>
      <el-form-item label="學生" prop="student">
        <el-select v-model="recordFillData.student">
          <el-option label="哈哈哈" value="哈哈哈"></el-option>
          <el-option label="哈哈哈2" value="哈哈哈2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="學生家長" prop="parent">
        <el-input v-model="recordFillData.parent"></el-input>
      </el-form-item>
      <el-form-item label="聯繫方法" prop="contentMethod">
        <el-input type="textarea" v-model="recordFillData.contentMethod"></el-input>
      </el-form-item>
      <el-form-item label="聯繫原因" prop="contentReason">
        <el-input type="textarea" v-model="recordFillData.contentReason"></el-input>
      </el-form-item>
      <el-form-item label="聯繫結果" prop="contentResult">
        <el-input type="textarea" v-model="recordFillData.contentResult"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="sendRecordFill">送出</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      recordFillData: {
        contentTime: '',
        student: '',
        parent: '',
        contentMethod: '',
        contentReason: '',
        contentResult: ''
      },
      recordFillDataFormRules: {
        contentTime: []
      }
    }
  },
  methods: {
    async sendRecordFill () {
      console.log(this.recordFillData)
      // 送出
    }
  }
}
</script>
