/**
 * 通过按需导入的createRouter方法来构建router实例
 * 通过按需导入的createWebHashHistory方法来创建has模式对象进行路由模式指定
 * 无需通过Vue.use(VueRouter)的形式进行挂载
 * routes路由表无差别
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout/index'
import Article from './module/Article'
import PermissionList from './module/PermissionList'
import RoleList from './module/RoleList'
import UserManage from './module/UserManage'
import ArticleCreate from './module/ArticleCreate'
import Excel from './module/Excel'
/**
 * publicRoutes无权限路由
 * privateRoutes权限路由
 */

/**
 * 私有路由表
 */
export const privateRoutes = [
  Article,
  PermissionList,
  RoleList,
  UserManage,
  ArticleCreate,
  Excel
]

/**
 * 公开路由表
 */
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/home',
    component: layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: 'home',
          icon: 'el-icon-home'
        }
      }]
  },
  {
    path: '/profile',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: layout,

    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes]
})

export default router
