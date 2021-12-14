import { setStorage, getStorage } from '@/utils/storage'
import { LANGUAGE, TAGS_NAV } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true, // 菜单按钮展开还是关闭
    language: getStorage(LANGUAGE) || 'zh', // 多语言配置
    tagsnav: getStorage(TAGS_NAV) || []
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state, lang) {
      setStorage(LANGUAGE, lang)
      state.language = lang
    },
    setTagsNav(state, tags) {
      // 去重tagsnav
      const isFind = state.tagsnav.find((item) => {
        return item.path === tags.path
      })
      if (!isFind) {
        state.tagsnav.push(tags)
        console.log('aa', state.tagsnav.length)
        setStorage(TAGS_NAV, state.tagsnav)
      }
    },
    /**
     * 修改
     */
    changeTagsView(state, { index, tag }) {
      state.tagsnav[index] = tag
      setStorage(TAGS_NAV, state.tagsnav)
    }
  }
}
