<template>
  <el-dropdown
    v-bind="$attrs"
    class="international"
    trigger="click"
    @command="handleSetTheme"
  >
    <!--图标-->

    <el-tooltip
      :content="$t('msg.navBar.themeChange')"
      effect="dark"
      placement="bottom-end"
    >
      <div>
        <svg-icon icon="change-theme"></svg-icon>
      </div>
    </el-tooltip>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">{{
          $t('msg.theme.themeColorChange')
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!--弹出层-->
  <div>
    <select-color v-model="selectColorVisible"></select-color>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import selectColor from './components/SelectColor.vue'
const selectColorVisible = ref(false)
const handleSetTheme = (command) => {
  selectColorVisible.value = true
}
</script>

<style lang="scss" scoped></style>
