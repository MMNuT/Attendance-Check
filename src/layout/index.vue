<template>
  <el-container>
    <el-aside :width="isCollapse?'50px':'200px'"><Sidebar :isCollapse="isCollapse"/></el-aside>
    <el-container>
      <el-header><Head @toggleCollapse="toggleCollapse"/></el-header>
      <el-main><router-view/></el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from './components/Sidebar'
import Head from './components/Head'

export default {
  components: { Sidebar, Head },
  data () {
    console.log(this.$store.getters.permission_routes)
    return {
      // 側邊欄縮小與否
      isCollapse: false
    }
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  },
  computed: {

  }
}
</script>

<style>
.el-main {
  height: calc(100vh - 60px);
}
</style>
