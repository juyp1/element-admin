import router from '@/router'
import { getStorage } from '@/utils/storage'
import store from '@/store'

// 白名单进入页面
const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  // 用户 已登录 不允许进入login
  // 用户未登录 只允许进入login
  // if(to.name==='login'&&getStorage)
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.hasUserInfo) {
        const { permission } = await store.dispatch('user/getUserInfoAction')
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })
        // 添加完路由主动跳转
        return next(to.path)
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
