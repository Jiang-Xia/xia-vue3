import layout from '@/layout/index.vue'
// activeMenu 用来高亮导航的参数
const Charts = {
  path: '/charts',
  name: 'Charts',
  component: layout,
  redirect: { path: '/charts/result-query' },
  meta: {
    title: '图表'
    // role: 'normal'
  },
  children: [
    {
      path: 'result-query',
      props: true,
      component: () => import('@/views/charts/index.vue'),
      meta: {
        activeMenu: '/charts'
      }
    }
  ]
}
export default Charts
