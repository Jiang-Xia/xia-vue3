import layout from '@/layout/index.vue'
// activeMenu 用来高亮导航的参数
const Profile = {
  path: '/profile',
  name: 'Profile',
  component: layout,
  redirect: { path: '/profile/result-query' },
  meta: {
    title: '个人中心'
    // role: 'normal'
  },
  children: [
    {
      path: 'result-query',
      props: true,
      component: () => import('@/views/profile/index.vue'),
      meta: {
        activeMenu: '/profile'
      }
    }
  ]
}
export default Profile
