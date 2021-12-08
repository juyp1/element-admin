<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
const store = useStore()
generateNewStyle(store.getters.mcolor).then((newStyleText) => {
  // 1.2 写入最新主题色
  writeNewStyle(newStyleText)
})
</script>

<style></style>
