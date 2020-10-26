<template>
  <a-layout>
    <a-layout-header style="background: #fff; padding: .5rem;margin-bottom:1rem;">
      <BreadCrumb />
    </a-layout-header>
    <a-layout-content style="background: #fff; padding: .5rem;">
      <div class="index-container">
        <a-button
          type="primary"
          @click="clickHandle"
        >
          打开
        </a-button>
        <!-- <XiaLogin /> -->

        <a-divider />
        <a-divider />
        <a-input
          :value="antInput"
          placeholder="Basic usage"
          @input="changeHandle"
        >
          <a-icon
            slot="prefix"
            type="user"
          />
          <a-tooltip
            slot="suffix"
            title="Extra information"
          >
            <a-icon
              type="info-circle"
              style="color: rgba(0,0,0,.45)"
            />
          </a-tooltip>
        </a-input>
        <a-divider />
        <input
          v-model="nativeInput"
          type="text"
          style="border:1px solid #eee"
        >
        <a-divider />
        <div>{{ antAndNative }}</div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import BreadCrumb from '@/components/breadcrumb'
export default {
  components:{
    BreadCrumb
  },
  data(){
    return{
      antInput: 'antInput',
      nativeInput: 'nativeInput'
    }
  },
  watch:{
    onAntInputChanged(n, o) {
      console.log(n,o);
    },
    onNativeInputChanged(n, o) {
      console.log(n,o);
      // 改名
    }
  },
  created(){
    this.$axios.get('/mock/news').then(res=>{
      console.log(res)
    })
  },
  methods:{
    clickHandle(){
    // XiaLogin.init()
      this.antAndNative ='打开';
    },
    changeHandle(){

    }
  }
}
</script>
<style scoped lang="scss">

</style>
