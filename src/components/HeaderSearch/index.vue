<template>
  <div class="header-search" :class="{ show: isShow }">
    <el-tooltip content="全局搜索">
      <span @click.stop="onShowClick">
        <svg-icon class-name="search-icon" icon="search"></svg-icon>
      </span>
    </el-tooltip>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      default-first-option
      remote
      :remote-method="querySearch"
      placeholder="search"
      @change="onSelectChange"
      filterable
    >
      <el-option
        v-for="option in searchOption"
        :key="option.item.path"
        :value="option.item"
        :label="option.item.title.join('>')"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { useRouter } from 'vue-router'

import Fuse from 'fuse.js'

import { filterRouters, generateMenus } from '@/utils/route'
import { watchSwitchLang } from '@/utils/i18n'
import { generateRoutes } from './FuseData'
const isShow = ref(false)
const router = useRouter()
const search = ref('')
const searchOption = ref([])
// 创建ref 取消、获取焦点
const headerSearchSelectRef = ref(null)
/**
 * 处理数据源
 */
const searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateRoutes(filterRoutes)
})
// shouldSort 是否按优先级搜索
// minMatchCharLength 匹配长度多少人为匹配
// keys 搜索条件 根据xx搜索
// 搜索库
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    shouldSort: true,
    minMatchCharLength: 1,
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'path', weight: 0.3 }
    ]
  })
}
initFuse(searchPool.value)
// 搜索图标事件
const onShowClick = () => {
  isShow.value = !isShow.value
  headerSearchSelectRef.value.focus()
}

// 下拉搜索事件
const querySearch = (query) => {
  const result = fuse.search(query)
  if (query !== '') {
    searchOption.value = result
  } else {
    searchOption.value = []
  }
}
// 监听 给body 添加事件
watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})
// 选择下拉数据后跳转到指定路由
const onSelectChange = (value) => {
  router.push(value.path)
}
// 关闭
const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOption.value = []
}
// 监听语言 重新计算数据源
watchSwitchLang(() => {
  const searchPool = computed(() => {
    const filterRoutes = filterRouters(router.getRoutes())
    return generateRoutes(filterRoutes)
  })
  initFuse(searchPool.value)
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  ::v-deep .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
