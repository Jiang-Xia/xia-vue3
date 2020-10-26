<template>
  <a-modal
    title="登录"
    :visible="loginVisible"
    class="xia-dialog-login"
    :modal="modal"
    ok-text="登录"
    cancel-text="取消"
    @cancel="closeHandle"
    @ok="tologinForm('loginForm')"
  >
    <a-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginrules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item
        name="username"
        required
      >
        <a-input
          v-model:value="loginForm.username"
          placeholder="Username"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color:rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item
        required
        name="password"
      >
        <a-input
          v-model:value="loginForm.password"
          type="password"
          placeholder="Password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color:rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import loginMixins from './mixin'
export default {
  mixins: [loginMixins],
  props: {
    options: {
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      token: '',
      loginVisible: true,
      modal: true // 蒙层
    }
  },
  mounted() {
    const dom = document.querySelector('.xia-dialog-login .a-modal__headerbtn')
    if (dom) {
      dom.style.display = 'none'
    }
    const options = this.options || {}
    if (Object.keys(options).length) {
      !options.modal ? this.modal = options.modal : this.modal = options.modal
    }
  },
  methods: {
    closeHandle() {
      this.loginVisible = false
      this.$emit('close')
    }
  }
}
</script>
<style scoped lang="scss">
@import "~@/styles/scss/_mixins";
.xia-dialog-login {
  .xia-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
