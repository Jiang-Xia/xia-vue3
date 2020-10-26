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
        <template v-for="(item,index) in newNavlist">
          <a-menu-item
            v-if="!item.submenu"
            :key="item.path"
            class="me-item"
            :index="index"
          >
            <span>{{ item.cn }}</span>
          </a-menu-item>

          <a-sub-menu
            v-else
            :key="item.path"
            :index="item.path"
          >
            <template #title>
              <span>{{ item.cn }}</span>
            </template>
            <a-menu-item
              v-for="(item2,index2) in item.submenu"
              :key="String(item2.id)"
              class="submenu-item"
              :index="index2"
            >
              <span>{{ item2.cn }}</span>
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
import {MenuUnfoldOutlined,MenuFoldOutlined} from '@ant-design/icons-vue'
import { getToken, getInfo } from '@/utils/cookie'
import { mapGetters } from 'vuex'
export default {
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  data(){
    return{
    selectedKeys : ['1'],
    collapsed : false,
    truename : '',
    disease_list: [],
    selectDiseaseId: '',
    }
  },
  computed:{
     ...mapGetters([
      'permission_routes',
      'userInfo',
      'globalConfigs'
    ]),
    newNavlist () {
    const list = this.permission_routes.filter(v => !v.hidden)
        .map(v => {
          return {
            path: v.path,
            cn: v.meta.title
          }
        })
    const plist= this.disease_list
    // console.log(plist)
    const token = 'getToken()'
    if (!token) {
      return list.filter(v => v.path === '/dashboard')
    } else {
      return list.map(v => {
        if (v.path === '/diseases'&&plist.length) {
          v.submenu = plist.map(v2 => {
            const obj = {
              path: '/diseases/result-query?disease_id=' + String(v2.disease_id),
              id: v2.disease_id,
              icon: 'el-icon-document',
              cn: v2.disease_name
            }
            return obj
          })
        }
        return v
      })
    }
  },
  // 选中高亮
   defaultActive () {
    // console.log(this.$route.meta)
    const path = this.$route.meta.activeMenu
    // console.log(path);
    if (path === '/diseases') {
      return this.$route.query.disease_id
    } else {
      return path
    }
    
  },
   openKeys(){
    const path = this.$route.meta.activeMenu
    if (path === '/diseases') {
        return [this.$route.query.disease_id]
      } else {
        return [path]
      }
  }
  },
    created () {
  },
  methods:{
     handleSelect({ item={}, key ='', keyPath=[],selectedKeys=[] }) {
      console.log(item,key, keyPath,selectedKeys)
      // 切换导航清空条件
      const list_= this.disease_list
      // console.log(this.$route.name);
      
      if (this.$route.name === 'DiseaseQuery') {
        const list = list_.filter(v => String(v.disease_id) === key)
        if (list.length) {
          this.$route.meta.title = list[0].disease_name
          // console.log(this.$route.meta.title)
        }
      }
      if (!isNaN(Number(key))) {
        this.selectDiseaseId = key
        this.$router.push({
          path: '/diseases/result-query',
          query: {
            disease_id: key
          }
        })
        this.$emit('click-specific', 1)
      } else {
        this.$router.push({
          path: key
        })
      }
      return
    },
        // 头像下拉命令
    commandHandle(v) {
      if (v === 2) {
        this.logoutHandle()
      } else {
        this.$router.push('/profile')
      }
    },
    // 退出登录
    async logoutHandle() {
      console.log(this)
      this.$store.dispatch('user/logout').then(() => {
        this.$success({
          title:'退出',
          content: '退出成功',
          okText:'确认',
          onOk: () => {
            this.logoutRedirectControl()
          }
        } )
      })
    },
    // 退出跳转控制
    logoutRedirectControl() {
      const code = this.$getCode()
      this.token = ''
      switch (code) {
        case 'gyfy_117' :
          location.href = 'https://www.elungcare.com/sso/logout'
          break
        default:
          location.reload()
          break
      }
    },
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
