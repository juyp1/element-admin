import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/import',
  name: 'excelImport',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/import',
      component: () => import('@/views/import/index'),
      meta: {
        title: 'excelImport',
        icon: 'article-create'
      }
    }
  ]
}
