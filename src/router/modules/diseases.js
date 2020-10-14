import layout from '@/layout/index.vue'
// activeMenu 用来高亮导航的参数
const Diseases = {
  path: '/diseases',
  name: 'Diseases',
  component: layout,
  redirect: { path: '/diseases/result-query' },
  meta: {
    title: '病种数据'
    // role: 'normal'
  },
  children: [
    {
      path: 'result-query',
      props: true,
      component: () => import('@/views/diseases/index.vue'),
      meta: {
        activeMenu: '/diseases'
      }
    }
  ]
}
export default Diseases
