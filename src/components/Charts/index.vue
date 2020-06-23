<template>
  <div ref="test" :style="{ height, width }"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import resize from './mixin/resize'
import { mapState } from 'vuex'

export default {
  mixizs: [resize],
  props: {
    option: {
      type: Object,
      require: true
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data () {
    return {
      charts: null
    }
  },
  computed: {
    ...mapState({
      isScreenLarge: state => state.app.isScreenLarge
    })
  },
  methods: {
    getTodayAttendance () {
      const charts = echarts.init(this.$refs.test)
      charts.setOption(this.option)
      charts.on('mouseover', ev => {
        this.$emit('mouseover', ev)
      })
      this.charts = charts
    }
  },
  watch: {
    option (...arg) {
      console.log(...arg)
      this.getTodayAttendance()
    },
    isScreenLarge (newVal) {
      if (newVal) {
        this.charts && this.charts.resize()
      }
    }
  }
}
</script>
