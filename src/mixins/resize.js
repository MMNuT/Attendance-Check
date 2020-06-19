export default {
  data () {
    return {
      size: 0
    }
  },
  beforeMount () {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  mounted () {
    this.$_resizeHandler()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  methods: {
    $_resizeHandler () {
      this.size = document.documentElement.clientWidth
    }
  }
}
