<template>
  <el-container>
    <el-aside :width="isCollapse ? '70px': '250px'" class="side-bar" :class="{ open: !isCollapse }"><Sidebar :isCollapse="isCollapse"/></el-aside>
    <el-container>
      <div v-if="!isScreenLarge && !isCollapse" class="mask" @click="toggleCollapse"></div>
      <el-header><Head @toggleCollapse="toggleCollapse"/></el-header>
      <el-main>
        <transition name="test" mode="out-in">
          <router-view/>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from './components/Sidebar'
import Head from './components/Head'
import resize from './mixin/resize'
import { mapState } from 'vuex'

export default {
  mixins: [resize],
  components: { Sidebar, Head },
  watch: {
    isScreenLarge (newVal) {
      if (!newVal) {
        this.isCollapse = true
      }
      console.log('isCollapse: ', this.isCollapse, '\r\n', 'isScreenLarge: ', this.isScreenLarge)
    },
    isCollapse () {
      console.log('isCollapse: ', this.isCollapse, '\r\n', 'isScreenLarge: ', this.isScreenLarge)
    }
  },
  data () {
    console.log(this.$store.getters.permission_routes)
    return {
      // 側邊欄縮小與否
      isCollapse: false
    }
  },
  computed: {
    ...mapState({
      isScreenLarge: state => state.app.isScreenLarge
    })
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped>
.el-container {
  position: relative;
}

aside.el-aside {
  background: var(--main-yellow);
}

.test-enter {
  opacity: 0;
  transform: translateX(-10rem);
}

.test-leave-to {
  opacity: 0;
  transform: translateX(10rem);
}
.test-leave-active,
.test-enter-active {
  transition: all .5s;
}

.mask {
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 998;
  background: rgba(0,0,0,.2);
}

@media screen and (max-width: 992px) {
  .side-bar {
    position: absolute;
    z-index: 999;
    height: 100%;
    transform: translateX(-100%);
    transition: .4s transform ease;
  }

  .open {
    transform: translateX(0);
    width: 220px!important;
  }
}

@media screen and (max-width: 576px) {
  .el-main {
    /* overflow-x: hidden; */
  }
}
</style>
