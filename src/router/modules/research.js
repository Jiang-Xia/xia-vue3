import layout from '@/layout/index.vue'
// activeMenu 用来高亮导航的参数
const Research = {
  path: '/research',
  name: 'Research',
  component: layout,
  redirect: { path: '/research/result-query' },
  meta: {
    title: '科研项目'
    // role: 'normal'
  },
  children: [
    {
      path: 'result-query',
      props: true,
      component: () => import('@/views/research/index.vue'),
      meta: {
        activeMenu: '/research'
      }
    }
  ]
}
export default Research
