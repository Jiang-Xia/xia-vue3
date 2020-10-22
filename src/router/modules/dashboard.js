import layout from '@/layout/index.vue'
// activeMenu 用来高亮导航的参数
const Dashboard = {
  path: '/dashboard',
  name: 'Dashboard',
  component: layout,
  redirect: { path: '/dashboard/result-query' },
  meta: {
    title: '首页'
    // role: 'normal'
  },
  children: [
    {
      path: 'result-query',
      name:'DashboardResultQuery',
      component: () => import('@/views/dashboard/index.vue'),
      meta: {
        activeMenu: '/dashboard'
      }
    }
  ]
}
export default Dashboard
