<template>
  <div class="app-main">
    <router-view />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { isTags } from '@/utils/tags'
import { useStore } from 'vuex'
import { generateTitle, watchSwitchLang } from '@/utils/i18n'
const route = useRoute()
const store = useStore()
/**
 *
 */
const getTitle = (route) => {
  let title = ''
  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}

/**
 * 监听路由变化
 */
watch(
  route,
  (to, from) => {
    console.log('to.path', to.path)
    if (!isTags(to.path)) return
    const { fullPath, meta, name, params, path, query } = to
    console.log({
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
    store.commit('app/setTagsNav', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  {
    // 进入组件就触发
    immediate: true
  }
)
watchSwitchLang(() => {
  store.getters.tagsnav.forEach((route, index) => {
    store.commit('app/changeTagsView', {
      index,
      tag: {
        ...route,
        title: getTitle(route)
      }
    })
  })
})
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
