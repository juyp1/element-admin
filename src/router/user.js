import Layout from '../layout/index.vue'
export default {
  path: '/user',
  name: 'user',
  redirect: '/user/manage',
  component: Layout,
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/manage',
      name: 'usermanager',
      component: () => import('@/views/user-manage/index'),
      meta: {
        title: 'userManage',
        icon: 'personnel-manage'
      }
    },
    {
      path: '/user/role',
      name: 'userole',
      component: () => import('@/views/role-list/index'),
      meta: {
        title: 'roleList',
        icon: 'role'
      }
    },
    {
      path: '/user/permission',
      name: 'permission',
      component: () => import('@/views/permission-list/index'),
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    },
    {
      path: '/user/info/:id',
      name: 'userInfo',
      component: () => import('@/views/user-info/index'),
      meta: {
        title: 'userInfo'
      }
    },
    {
      path: '/user/import',
      name: 'import',
      component: () => import('@/views/import/index'),
      meta: {
        title: 'excelImport'
      }
    }
  ]
}
