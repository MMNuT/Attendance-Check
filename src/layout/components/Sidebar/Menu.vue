<template>
  <el-menu
    :default-active="activeMenu"
    :unique-opened="true"
    :active-text-color="'#871A1A'"
    :background-color="this.color.mainYellow"
    :text-color="this.color.black"
    :collapse="isCollapse"
    :collapse-transition="false"
    mode="vertical"
  >
    <sidebar-item
      v-for="route in permission_routes"
      :key="route.path"
      :item="route"
      :base-path="route.path"
    />
  </el-menu>
</template>

<script>
import SidebarItem from './SidebarItem'
import styleMixin from '@/mixins/style'
import { mapGetters } from 'vuex'

export default {
  components: { SidebarItem },
  mixins: [styleMixin],
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
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
