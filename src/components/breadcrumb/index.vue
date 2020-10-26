<template>
  <a-breadcrumb separator="">
    <a-breadcrumb-item
      v-for="route in routes" 
      :key="route.path"
      @click="goto(route)"
    >
      {{ route.meta.title }}
    </a-breadcrumb-item>
    <a-breadcrumb-separator v-if="routes.length>1" />
  </a-breadcrumb>
</template>
<script>
import { useRoute } from "vue-router";
import router from '@/router'
export default {
    name:'BreadCrumb',
    setup(){
        const route = useRoute()
        const goto = (item)=>{
            // console.log(item,router)
            router.push(item.path)
        }
        return {
            routes:route.matched,
            goto:goto
        }
    }
}
</script>