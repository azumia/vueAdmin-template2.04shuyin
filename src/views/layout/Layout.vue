<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="sidebar-wrapper">
      <sidebar class="sidebar-container"></sidebar>
    </div>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>


<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout'
import { mapState } from 'vuex'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    // sidebar() {
    //   console.log(this.$store)
    //   return this.$store.state.app.sidebar
    // },
    ...mapState('app', [
      'sidebar'
    ])
  },
  mounted: function() {
    // console.log('0002')
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        &.hideSidebar {
            .sidebar-wrapper {
                transform: translate(-140px, 0);
                .sidebar-container {
                    transform: translate(132px, 0);
                }
                &:hover {
                    transform: translate(0, 0);
                    .sidebar-container {
                        transform: translate(0, 0);
                    }
                }
            }
            .main-container {
                margin-left: 40px;
            }
        }
        .sidebar-wrapper {
            width: 180px;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 1001;
            overflow: hidden;
            transition: all .28s ease-out;
        }
        .sidebar-container {
            transition: all .28s ease-out;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: -17px;
            overflow-y: scroll;
            overflow-x: hidden;
        }
        .main-container {
            min-height: 100%;
            transition: all .28s ease-out;
            margin-left: 180px;
        }
    }
</style>
