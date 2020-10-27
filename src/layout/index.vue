<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      :collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo ellipsis">
        {{ globalConfigs.site_config.global_site_title }}
      </div>
      <a-menu
        :inline-collapsed="collapsed"
        :selected-keys="[defaultActive]"
        theme="dark"
        mode="inline"
        @select="handleSelect"
      >
        <template v-for="(item,index) in permission_routes">
          <a-menu-item
            v-if="item.children.length===1"
            :key="item.path"
            class="me-item"
            :index="index"
          >
            <span>{{ item.meta.title }}</span>
          </a-menu-item>

          <a-sub-menu
            v-else
            :key="item.path"
            :index="item.path"
          >
            <template #title>
              <span>{{ item.meta.title }}</span>
            </template>
            <a-menu-item
              v-for="(item2,index2) in item.children"
              :key="item2.meta.activeMenu"
              class="submenu-item"
              :index="index2"
            >
              <span>{{ item2.meta.title }}</span>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />

        <div class="user-wrap">
          <a-avatar
            size="large"
            style="margin-right:12px;"
          >
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          <a-dropdown>
            <a
              class="ant-dropdown-link"
              @click="e => e.preventDefault()"
            >{{ userInfo.truename }}<DownOutlined /></a>

            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a
                    href="javascript:;"
                    @click="commandHandle(1)"
                  >个人中心</a>
                </a-menu-item>
                <a-menu-item>
                  <a
                    href="javascript:;"
                    @click="commandHandle(2)"
                  >退出</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px',background: '#fff', minHeight: '280px' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {useStore} from 'vuex'
import { useRoute } from "vue-router";
import router from '@/router'
import store from '@/store'
import {Modal} from 'ant-design-vue'
import { getCode } from '@/utils/common'
function handleSelect(options) {
  console.log(options.key)
  // 切换导航清空条件
  router.push({path: options.key})
  return
}
  // 头像下拉命令
function commandHandle(v) {
  if (v === 2) {
    logoutHandle()
  } else {
    router.push('/profile')
  }
}
// 退出登录
function logoutHandle() {
  store.dispatch('user/logout').then(() => {
    Modal.confirm({
      title:'退出',
      content: '退出成功',
      okText:'确认',
      onOk: () => {
        logoutRedirectControl()
      }
    } )
  })
}
// 退出跳转控制
function logoutRedirectControl() {
  const code = getCode()
  switch (code) {
    case 'gyfy_117' :
      location.href = 'https://www.elungcare.com/sso/logout'
      break
    default:
      location.reload()
      break
  }
}
import { MenuUnfoldOutlined,MenuFoldOutlined,DownOutlined,UserOutlined } from '@ant-design/icons-vue'
import { reactive,computed, ref } from 'vue'
export default {
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined,
    UserOutlined 
  },
  setup(){
    const store= useStore()
    const route = useRoute()
    /* computed */
    // 选中高亮
    const defaultActive = computed(()=> route.meta.activeMenu)
    const openKeys = computed(()=>[route.meta.activeMenu])
    /* state */
    const collapsed = ref(false)
    const selectedKeys =reactive(['1']) 
    return{
      permission_routes:store.getters.permission_routes.filter(v => !v.hidden),
      userInfo:store.getters.userInfo,
      globalConfigs:store.getters.globalConfigs,
      defaultActive,
      openKeys,
      collapsed,
      selectedKeys,
      handleSelect,
      commandHandle
    }
  }
}
</script>
<style scoped lang="scss">
#components-layout-demo-custom-trigger{
  height: 100%;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .trigger:hover {
    color: #1890ff;
  }
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
    font-size: 14px;
    text-align: center;
    line-height: 32px;
    color: #fff;
  }
  .user-wrap{
    height: 100%;
    float: right;
    padding-right: 24px;
  }
}
</style>
