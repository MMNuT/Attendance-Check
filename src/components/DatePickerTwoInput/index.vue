<template>
  <div class="date-picker-container">
    <el-date-picker
      v-model="selectData.time"
      type="daterange"
      range-separator="至"
      start-placeholder="起始日期"
      end-placeholder="結束日期"
      value-format="yyyy-MM-dd"
      clearable
      @change="$emit('changeSelect')">
    </el-date-picker>
    <div class="low768">
      <el-date-picker
        v-model="selectData.StartDate"
        type="date"
        placeholder="起始日期"
        value-format="yyyy-MM-dd"
        clearable
        @change="handleChnageEachDateData">
      </el-date-picker>
      <el-date-picker
        v-model="selectData.EndDate"
        type="date"
        placeholder="結束日期"
        value-format="yyyy-MM-dd"
        clearable
        @change="handleChnageEachDateData">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
import { resize } from '@/mixins'
import { splitTimesToStartAndEnd } from '@/utils/format'

export default {
  mixins: [resize],
  data () {
    return {
      selectData: {
        time: '',
        StartDate: '',
        EndDate: ''
      }
    }
  },
  computed: {
    time () {
      if (this.isLowThan768) {
        return {
          StartDate: this.selectData.StartDate || '',
          EndDate: this.selectData.EndDate || ''
        }
      } else {
        return splitTimesToStartAndEnd(this.selectData.time)
      }
    }
  },
  watch: {
    isLowThan768 (newVal) {
      if (newVal) {
        const { StartDate, EndDate } = splitTimesToStartAndEnd(this.selectData.time)
        this.selectData.StartDate = StartDate
        this.selectData.EndDate = EndDate
        this.selectData.time = ''
      } else {
        this.handleEachDateData()
        this.selectData.time = [this.selectData.StartDate, this.selectData.EndDate]
        this.selectData.StartDate = ''
        this.selectData.EndDate = ''
      }
    },
    time (newVal) {
      this.$emit('handleDatePickerInput', newVal)
    }
  },
  methods: {
    handleEachDateData () {
      if (this.selectData.StartDate && !this.selectData.EndDate) {
        this.selectData.EndDate = this.selectData.StartDate
      }
      this.$_handleDateData()
    },
    handleChnageEachDateData () {
      this.$_handleDateData()
      this.$emit('changeSelect')
    },
    $_handleDateData () {
      // 避免清除時他附值 null 造成後面的報錯
      this.selectData.StartDate = this.selectData.StartDate || ''
      this.selectData.EndDate = this.selectData.EndDate || ''

      // 如果是直接改結束時間的話, 開始時間直接複製
      if (!this.selectData.StartDate && this.selectData.EndDate) {
        this.$nextTick(_ => {
          this.selectData.StartDate = this.selectData.EndDate
        })
        return null
      }
      console.log(123)
      // 如果結束時間比開始時間早, 對調
      if (new Date(this.selectData.StartDate).getTime() > new Date(this.selectData.EndDate).getTime()) {
        const tmp = this.selectData.StartDate
        this.selectData.StartDate = this.selectData.EndDate
        this.selectData.EndDate = tmp
        return null
      }
    }
  }
}
</script>

<style scoped>
.date-picker-container .el-date-editor.el-input {
  width: 18rem;
}

@media screen and (max-width: 768px) {
  .date-picker-container .el-range-editor.el-input__inner {
    display: none;
  }
  .low768 {
    display: block;
  }
}
</style>
