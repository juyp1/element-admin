<template>
  <el-tooltip content="全屏">
    <div @click="onTaggle">
      <svg-icon
        :icon="isFullScreen ? 'exit-fullscreen' : 'fullscreen'"
      ></svg-icon>
    </div>
  </el-tooltip>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import screenfull from 'screenfull'
const isFullScreen = ref(false)
const onTaggle = () => {
  screenfull.toggle()
}
const change = () => {
  isFullScreen.value = screenfull.isFullscreen
}
onMounted(() => {
  screenfull.on('change', change)
})
onUnmounted(() => {
  screenfull.on('change', change)
})
</script>

<style lang="scss" scoped></style>
