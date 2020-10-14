import layout from '@/layout/index.vue'
// activeMenu 用来高亮导航的参数
const Export = {
  path: '/export',
  name: 'Export',
  component: layout,
  redirect: { path: '/export/result-query' },
  meta: {
    title: '数据导出'
    // role: 'normal'
  },
  children: [
    {
      path: 'result-query',
      props: true,
      component: () => import('@/views/export/index.vue'),
      meta: {
        activeMenu: '/export'
      }
    }
  ]
}
export default Export
