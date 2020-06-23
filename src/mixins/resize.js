export default {
  data () {
    return {
      size: 0,
      height: 0
    }
  },
  computed: {
    isLowThan768 () {
      return this.size <= 768
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
      this.height = document.documentElement.clientHeight
    }
  }
}
