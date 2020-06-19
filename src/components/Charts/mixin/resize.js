export default {
  beforeMount () {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy () {
    console.log(123123)
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  methods: {
    $_resizeHandler () {
      console.log(123)
      this.chart && this.chart.resize()
    }
  }
}
