<template>
  <div class="login-component-container">
    <!-- <component :is="currentComponent" /> -->
  </div>
</template>

<script>
/*
* 中转页面
*
*/
// import defaultComponent from './index-default.vue'
import { getToken } from '@/utils/cookie'
export default {
  beforeRouteEnter: (to, from, next) => {
    next((that) => {
      if (getToken()) {
        that.$router.push('/index')
      }
    })
  },
  data() {
    return {
      code: ''
    }
  },
  computed: {
    currentComponent() {
      const code = this.code
      let component = null
      switch (code) {
        case 'demo_000':
          component = 'defaultComponent'
          break
        default:
          // 空值不渲染s
          component = ''
          break
      }
      return component
    }
  },
  created() {
    const code = this.$getCode()
    this.code = code
    switch (code) {
      case 'gyfy_117':
        this.gyfyLoginHandle()
        break
      default:
        this.defaultLoginHandle()
        break
    }
  },
  methods: {
    defaultLoginHandle() {
    },
    gyfyLoginHandle() {
      const service_url = location.protocol + '//' + location.host + location.pathname + 'login'
      const obj = {
        ticket: this.$route.query.ticket,
        service_url: service_url, // 密码
        grant_type: 'gyfy_ticket' // 授权形式
      }
      this.$store.dispatch('user/login', obj).then(async res => {
        if (res) {
        // 重定向或者首页
          this.$message.success('登录成功')
          await this.$store.dispatch('user/getUserInfo')
          this.$router.push('/home')
        } else {
          this.$message.error('登录失败')
          location.href = 'https://www.elungcare.com/sso/logout'
        }
      }).catch(err => {
        location.href = 'https://www.elungcare.com/sso/logout'
        return err
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-component-container{
    height: 100%;
    color: #333;
}
</style>
