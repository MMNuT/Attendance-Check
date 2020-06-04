<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path">
        <!-- 不能跳轉: 路由沒有配置重定向 或 當前已是最後項 -->
        <!--
        <span v-if="item.redirect === 'noRedirect' || index === levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        -->
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
    // 觀察路由變化, 重新生成麵包屑
    $route: {
      handler () {
        this.getBreadcrumb()
      },
      immediate: true
    }
  },
  methods: {
    getBreadcrumb () {
      /**
       *  1. 麵包屑只匹配有 meta.title 且 meta.breadcrumb 不為 false 的路由
       *  2. 避免有了 Home 跟 / 兩個首頁的麵包屑, 把 / 篩掉
       *   + path 如果只有 / 的話, 會被直接解析成空字串, 所以 item.path 就 false 了
       */
      console.log(this.$route.matched)
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false && item.path)

      /*
      // 根路由
      const first = matched[0]
      // 希望第一個麵包屑一定是 HOME
      if (!this.isHome(first)) {
        matched = [{ path: '/', redirect: `/${this.$store.getters.roles[0]}`, meta: { title: 'Home' } }].concat(matched)
      }
      */
      this.levelList = matched
    }/*,
    isHome (route) {
      const name = route && route.name
      // 沒名字就直接判定不是 HOME
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'home'.toLocaleLowerCase()
    },
    pathCompile (path) {
      /**
       *  - 把 /home/:id => 處理成替換過的路徑
       *\/

      // 1. 獲取路由參數
      const { params } = this.$route
      // 2. 獲取編譯函數
      const toPath = pathToRegexp.compile(path)
      // 3. 編譯
      return toPath(params)
    },
    handleLink (item) {
      const { redirect, path } = item

      // 重定向就直接走
      if (redirect) {
        this.$router.push(redirect)
        return
      }

      // 編譯 path, 避免存在參數路徑 /home/:id
      this.$router.push(this.pathCompile(path))
    }
    */
  }
}
</script>

<style scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 15px;
  line-height: 50px;
  margin-left: 10px;
}

.app-breadcrumb.el-breadcrumb .no-redirect {
  color: #97a8be;
  cursor: text;
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px)
}

.breadcrumb-move {
  transition: all .5s
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
