import layout from '@/layout/index.vue'
// activeMenu 用来高亮导航的参数
const Icon = {
  path: '/icon',
  name: 'Icon',
  component: layout,
  redirect: { path: '/icon/index' },
  meta: {
    title: '图标'
    // role: 'normal'
  },
  children: [
    {
      path: 'index',
      props: true,
      component: () => import('@/views/icon/index.vue'),
      meta: {
        activeMenu: '/icon'
      }
    }
  ]
}
export default Icon
