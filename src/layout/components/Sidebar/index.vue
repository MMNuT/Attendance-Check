<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" :class="{ hidden: isCollapse }">
    <Logo @backToHome="backToHome"/>
    <Menu :isCollapse="isCollapse"/>
  </el-scrollbar>
</template>

<script>
import Logo from './Logo'
import Menu from './Menu'

export default {
  components: { Logo, Menu },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    backToHome () {
      this.$router.push(`/${this.$store.getters.roles[0]}`).catch(error => error)
    }
  }
}
</script>

<style>
.hidden .el-submenu__title span,
.hidden .el-submenu__title i {
  display: none;
}

.hidden .el-menu-item,
.hidden .el-submenu {
  width: 7rem;
}
</style>
