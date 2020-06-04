<template>
  <svg :class="svgClass"  aria-hidden="true" v-on="$listeners">
      <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  props: {
    iconClass: {
      type: String,
      require: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return `svg-icon ${this.className}`
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style>
.svg-icon {
  height: 1em;
  width: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  margin-right: 16px;
}
</style>
