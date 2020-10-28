<template>
  <a-breadcrumb :separator="separator">
    <a-breadcrumb-item>
      <router-link to="/dashboard">
        <svg-icon icon-class="dashboard" />
      </router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item
      v-for="route in routes" 
      :key="route.path"
    >
      <router-link :to="route.path">
        {{ route.meta.title }}
      </router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script>
import { useRoute } from "vue-router";
import router from '@/router'
import {computed} from 'vue';
export default {
    name:'BreadCrumb',
    setup(){
        const route = useRoute()
        const goto = (item)=>{
            router.push(item.path)
        }
        const separator = computed(()=>{
          if(route.matched.length>1){
            return '/'
          }else{
            return ''
          }
        })
        return {
            routes:route.matched.filter(v=>v.path!=='/dashboard'),
            goto:goto,
            separator
        }
    }
}
</script>