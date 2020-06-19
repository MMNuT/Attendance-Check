<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children, item) &&
      (!showingRouteMenuItem.children || showingRouteMenuItem.noShowingChildren) &&
      !item.alwaysShow">
      <router-link v-if="showingRouteMenuItem.meta" :to="resolvePath(showingRouteMenuItem.path)">
        <el-menu-item :index="resolvePath(showingRouteMenuItem.path)">
          <item :icon="showingRouteMenuItem.meta.icon || (item.meta && item.meta.icon)" :title="showingRouteMenuItem.meta.title" />
        </el-menu-item>
      </router-link>
    </template>
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta && item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import Item from './Item'

export default {
  name: 'SidebarItem',
  components: { Item },
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showingRouteMenuItem: null
    }
  },
  methods: {
    hasOneShowingChild (children = [], parent) {
      // 把不顯示的篩掉
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.showingRouteMenuItem = item
          return true
        }
      })

      // 只有一個子路由: 顯示該子路由
      if (showingChildren.length === 1) {
        return true
      }

      // 沒有子路由: 顯示父路由
      if (showingChildren.length === 0) {
        this.showingRouteMenuItem = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    resolvePath (routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style>
.menu-wrapper .el-menu-item > span,
.menu-wrapper .el-submenu__title > span {
  font-size: 30px;
  font-weight: 900;
}
</style>
