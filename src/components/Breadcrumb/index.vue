<template>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path">
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
// import pathToRegexp from 'path-to-regexp'

export default {
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route: {
      handler () {
        this.getBreadcrumb()
      },
      immediate: true
    }
  },
  methods: {
    getBreadcrumb () {
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false && item.path)
      this.levelList = matched
    }
  }
}
</script>

<style scoped>
.el-breadcrumb {
  font-size: 2rem;
  color: var(--main-black);
}

.breadcrumb-enter,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(2rem)
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
