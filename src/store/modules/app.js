import { setStorage, getStorage } from '@/utils/storage'
import { LANGUAGE } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true, // 菜单按钮展开还是关闭
    language: getStorage(LANGUAGE) || 'zh' // 多语言配置
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state, lang) {
      setStorage(LANGUAGE, lang)
      state.language = lang
    }
  }
}
