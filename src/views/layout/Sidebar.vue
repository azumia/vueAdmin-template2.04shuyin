<template>
  <el-menu mode="vertical" background-color="#545c64" text-color="#fff" active-text-color="#4ebcb3" :default-active="$route.path" >
    <sidebar-item :routes='routers'></sidebar-item>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapState('permission', [
      'routers'
    ]),
    ...mapState('app', [
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  min-height: 100%;
}
</style>
