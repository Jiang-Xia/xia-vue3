<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      :collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo ellipsis">
        {{ sysTitle }}
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
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {MenuUnfoldOutlined,MenuFoldOutlined} from '@ant-design/icons-vue'
// import router from 'vue-router'
import { getToken, getInfo } from '@/utils/cookie'
import storage from '@/utils/storage'
import * as request from '@/api/home'
import { globalConfigs } from '@/api/common'
const navlist =[
  {
    path: '/home',
    icon: 'el-icon-location',
    cn: '基础数据'
  },
  {
    path: '/diseases',
    icon: 'el-icon-menu',
    cn: '专病数据',
    submenu:[]
  },
  {
    path: '/export',
    icon: 'el-icon-setting',
    cn: '数据导出'
  },
  {
    path: '/research',
    icon: 'el-icon-document',
    cn: '科研项目'
  },
  // {
  //   path: '/models',
  //   icon: 'el-icon-postcard',
  //   cn: '模型管理'
  // },
  // {
  //   path: '/statistics',
  //   icon: 'el-icon-s-data',
  //   cn: '数据统计'
  // },
  {
    path: '/profile',
    icon: 'el-icon-setting',
    cn: '个人中心'
  }
]
export default {
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  data(){
    return{
    selectedKeys : ['1'],
    collapsed : false,
    navlist : navlist,
    truename : '',
    sysTitle : '',
    disease_list: [],
    selectDiseaseId: '',
    }
  },
  computed:{
       newNavlist () {
    const list = this.navlist
    const plist= this.disease_list
    // console.log(plist)
    const token = 'getToken()'
    if (!token) {
      return list.filter(v => v.path === '/home')
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
    const info = getInfo()
    const token = getToken()
    globalConfigs().then((res) => {
      const config = res.data
      storage.local.set('global_config', res.data)
      document.title = config.site_config.global_site_title
      this.sysTitle = config.site_config.global_site_name
    })
    // console.log(info)
    if (token) {
      this.truename = info.truename
      request.userResource({}, 'disease_list').then((res) => {
        this.disease_list = res.data.result.disease_list
      })
    }
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
      this.$store.commit('home/search_condition', [])
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
}
</style>
