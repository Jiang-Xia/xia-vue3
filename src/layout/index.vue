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
    sysTitle : '',
    disease_list: [],
    selectDiseaseId: '',
    }
  },
  computed:{
     ...mapGetters([
      'permission_routes'
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
    const info = getInfo()
    const token = getToken()
    // globalConfigs().then((res) => {
    //   const config = res.data
    //   storage.local.set('global_config', res.data)
    //   document.title = config.site_config.global_site_title
    //   this.sysTitle = config.site_config.global_site_name
    // })
    // console.log(info)
    // if (token) {
    //   this.truename = info.truename
    //   request.userResource({}, 'disease_list').then((res) => {
    //     this.disease_list = res.data.result.disease_list
    //   })
    // }
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
