<template>
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :uniqueOpened="true"
    :default-active="activedmenu"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
  >
    <!--子集 menu 菜单-->
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import { filterRouters, generateMenus } from '@/utils/route'
const router = useRouter()

const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
// 刷新获取当前路由
const activedmenu = computed(() => {
  const { path } = useRoute()
  return path
})
</script>

<style lang="scss" scoped></style>
