export default {
  created () {
    // 如果解析是 992 以下, 預設側邊欄收起來
    if (!this.$_isScreenLarge()) {
      this.isCollapse = true
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
      // 1. rem
      // element-ui 動態添加 style , 導致我現在改不了 rem ... 等我找到方法再來弄
      // document.documentElement.style.fontSize = document.documentElement.clientWidth / 168 + 'px'

      // 2. sidebar
      this.$store.dispatch('app/toggleScreenLarge', this.$_isScreenLarge())
      this.$store.dispatch('app/setClientWidth', this.$_getClientWidth())
      this.$store.dispatch('app/setClientHeight', this.$_getClientHeight())
      this.$store.dispatch('app/toggleScreenLow576', this.$_low576())
    },
    $_isScreenLarge () {
      return document.documentElement.clientWidth - 1 >= 992
    },
    $_getClientWidth () {
      return document.documentElement.clientWidth
    },
    $_getClientHeight () {
      return document.documentElement.clientHeight
    },
    $_low576 () {
      return document.documentElement.clientWidth - 1 <= 576
    }
  }
}
