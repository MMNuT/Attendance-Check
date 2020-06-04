<template>
  <div ref="test" :style="{height: '800px', width: '100%'}"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    option: {
      type: Object,
      require: true
    }
  },
  methods: {
    getTodayAttendance () {
      const charts = echarts.init(this.$refs.test)
      charts.setOption(this.option)
      charts.on('mouseover', ev => {
        this.$emit('mouseover', ev)
      })
    }
  },
  watch: {
    option (...arg) {
      this.getTodayAttendance()
    }
  }
}
</script>
