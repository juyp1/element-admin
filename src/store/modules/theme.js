import { setStorage, getStorage } from '@/utils/storage'
import { THEME } from '@/constant'
import variables from '@/styles/variables.scss'
export default {
  namespaced: true,
  state: () => ({
    theme: getStorage(THEME) || '#409eff',
    variables: variables
  }),
  mutations: {
    setTheme(state, mcolor) {
      setStorage(THEME, mcolor)
      state.variables.menuBg = mcolor
      state.theme = mcolor
    }
  }
}
