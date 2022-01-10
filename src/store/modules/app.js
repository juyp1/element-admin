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
    },
    /**
     * 移除标签
     */
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        state.tagsnav.splice(payload.index, 1)
      } else if (payload.type === 'other') {
        // 移除 当前位置往后的+1
        state.tagsnav.splice(
          payload.index + 1,
          state.tagsnav.length - payload.index + 1
        )
        state.tagsnav.splice(0, payload.index)
        // 移除当前位置之前的-1
      } else if (payload.type === 'right') {
        state.tagsnav.splice(
          payload.index + 1,
          state.tagsnav.length - payload.index + 1
        )
      }
      setStorage(TAGS_NAV, state.tagsnav)
    }
  }
}
