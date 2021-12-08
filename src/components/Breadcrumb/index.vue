<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, key) in breadcrumData"
        :key="key"
        :to="item.path"
      >
        <!--不可点击-->
        <span class="no-redirect" v-if="key === breadcrumData.length - 1">
          {{ generateTitle(item.meta.title) }}
        </span>
        <!--可点击项-->
        <span class="redirect" v-else @click="onLinkClick(item)">
          {{ generateTitle(item.meta.title) }}
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { generateTitle } from '@/utils/i18n'
const route = useRoute()
const router = useRouter()
const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
const breadcrumData = ref([])

const getBreadcrumData = () => {
  breadcrumData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}
// 跳转路径
const onLinkClick = (item) => {
  router.push(item.path)
}
watch(
  route,
  () => {
    getBreadcrumData()
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .redirect {
    color: #666;
    font-weight: 600;
  }

  .redirect:hover {
    // 将来需要进行主题替换，所以这里不去写死样式
    color: v-bind(linkHoverColor);
  }

  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
