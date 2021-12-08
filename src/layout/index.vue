<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <side-bar
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    ></side-bar>
    <div class="main-container">
      <!--吸顶-->
      <div class="fixed-header">
        <nav-bar />
      </div>
      <!--内容区域-->
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import NavBar from './components/NavBar'
import SideBar from './components/Sidebar/SidebarMenu'
import AppMain from './components/AppMain'
import variables from '@/styles/variables.scss'
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}
.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
