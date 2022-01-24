import { generateColors } from '@/utils/theme'
import { getStorage } from '@/utils/storage'
import { THEME } from '@/constant'
const gettters = {
  token: (state) => state.user.token,
  /**
   hasUserInfo 为true 表示已登录 false 未登录
   */
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  /**
   * 用户信息
   *  */
  userInfo: (state) => state.user.userInfo,
  /**
   * 样式
   *  */
  cssVar: (state) => ({
    ...state.theme.variables,
    ...generateColors(getStorage(THEME))
  }),
  /*
  菜单展开还是关闭
  */
  sidebarOpened: (state) => state.app.sidebarOpened,
  /**
   * 多语言
   */
  language: (state) => state.app.language,

  /**
   * 主题色
   */
  mcolor: (state) => state.theme.theme,

  /**
   * tags
   */
  tagsnav: (state) => state.app.tagsnav,

  /*
  用户信息
  */
  userInfos: (state) => state.user.userInfo
}
export default gettters
