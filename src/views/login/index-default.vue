<template>
  <div class="login-container">
    <div class="title">
      {{ title }}
    </div>
    <img
      class="img-wrap img-wrap1"
      src="@/views/login/img/triangle1.png"
      alt="icon"
    >
    <img
      class="img-wrap img-wrap2"
      src="@/views/login/img/triangle1.png"
      alt="icon"
    >
    <img
      class="img-wrap img-wrap3"
      src="@/views/login/img/triangle1.png"
      alt="icon"
    >
    <img
      class="img-wrap img-wrap4"
      src="@/views/login/img/triangle1.png"
      alt="icon"
    >
    <img
      class="img-wrap computer"
      src="@/views/login/img/computer.png"
      alt="icon"
    >

    <section class="login-content center">
      <a-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginrules"
        class="loginForm"
      >
        <a-form-item prop="username">
          <i class="a-icon-user" />
          <a-input
            v-model="loginForm.username"
            type="username"
            auto-complete="on"
          />
        </a-form-item>
        <a-form-item prop="password">
          <i class="a-icon-lock" />
          <a-input
            v-model="loginForm.password"
            type="password"
            auto-complete="on"
            @keydown.native.enter="tologinForm('loginForm')"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            class="loginbutton"
            type="primary"
            @click="tologinForm('loginForm')"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </section>
  </div>
</template>
<script>
import { getSiteTitle } from '@/utils/common'
export default {

  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        grant_type: 'password'
    },
    loginrules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
    title: getSiteTitle()
    }
  },
  methods: {
    /* 登录回调 */
    tologinForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm).then(async (res=null) => {
            if (res) {
              // 重定向或者首页
              this.$message.success('登录成功')
              this.token = this.$getToken()
              this.loginVisible = false
              await this.$store.dispatch('user/getUserInfo')
              this.$router.push('/index')
            } else {
              this.$message.error('用户名，密码不匹配')
            }
          })
        } else {
          this.$message.error('输入信息有误！请重新输入')
          return false
        }
      })
    }
    // getOtherQuery(query) {
    //   return Object.keys(query).reduce((acc, cur) => {
    //     if (cur !== 'redirect') {
    //       acc[cur] = query[cur]
    //     }
    //     return acc
    //   }, {})
    // }
  }
}
</script>

<style lang="scss">
@import "~@/styles/scss/_mixins";
.login-container{
  .a-input{
    width: 80%;
    line-height: 40px;
  }
  .a-form-item__content{
    display: flex;
    justify-content: center;
  }
  .a-form-item{
    margin-top: 2rem;
  }
  .a-form-item__error{
    left: 80px;
  }
  .a-icon-user,.a-icon-lock{
    line-height: 40px;
    font-size: 26px;
    text-align: center;
    color: $main-color;
    width: 10%;
  }
}
</style>
<style lang="scss" scoped>
@import "~@/styles/scss/_mixins";
.login-container {
  background-color: #fff;
  background-image: url(./img/mask.png);
  background-size: 100% 100%;
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  .title{
    display: flex;
    align-items: center;
    font-size: 30px;
    color: #fff;
    letter-spacing: 3px;
    padding-left: 8rem;
  }
  .img-wrap{
    position: absolute;
  }
  .img-wrap1{
    bottom: 9.5rem;
    left: 11rem;
    transform: scale(1.5);
  }
  .img-wrap2{
    bottom: 5rem;
    left: 4rem;
    transform: scale(1.2);
  }
  .img-wrap3{
    top: 8.5rem;
    right: 22rem;
    transform: scale(1);
  }
  .img-wrap4{
    top: 4rem;
    right: 19.5rem;
    transform: scale(0.6);
  }
  .computer{
    bottom: 2.5rem;
    right: 0;
  }
  .login-content {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 1;
    .loginForm {
      position: relative;
      background-color: #fff;
      border-radius: .8rem;
      width: 27rem;
      height: 21rem;
      max-width: 460px;
      max-height: 340px;
      padding: 2rem 2rem 0 2rem;
      margin-left: 8rem;
      margin-bottom: 4rem;
      overflow: hidden;
      .loginbutton {
        width: 70%;
        border-radius: 1px;
        background:$main-color;
        border-radius: 0.5rem;
        margin-left: 1.6rem;
        margin-top: .5rem;
        cursor: pointer;
        color: #fff;
        font-size: 1.2rem;
      }
    }
  }
}
</style>
