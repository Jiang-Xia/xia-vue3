import layout from '@/layout/index.vue'
// activeMenu 用来高亮导航的参数
const Home = {
  path: '/home',
  name: 'Home',
  component: layout,
  redirect: { path: '/home/result-query' },
  meta: {
    title: '基础数据'
    // role: 'normal'
  },
  children: [
    {
      path: 'result-query',

      props: true,
      component: () => import('@/views/home/index.vue'),
      meta: {
        activeMenu: '/home'
      }
    }
  ]
}
export default Home
