<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" :class="{ hidden: isCollapse }">
    <div class="logoBox">
      <h1 class="logoBox__logo">AC</h1>
    </div>
    <el-menu
      :default-active="activeMenu"
      :unique-opened="true"
      :active-text-color="this.color.mainRed"
      :background-color="this.color.mainYellow"
      :text-color="this.color.white"
      :collapse="isCollapse"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        class="test1"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import styleMixin from '@/mixins/style'

export default {
  mixins: [styleMixin],
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters(['permission_routes']),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
}
</script>

<style scoped>
@import './style/logo.css';
</style>
