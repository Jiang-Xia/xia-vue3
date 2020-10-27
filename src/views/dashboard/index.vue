<template>
  <div class="index-container">
    <BreadCrumb />
  </div>
</template>

<script>
export default {
  data(){
    return{
      antInput: 'antInput',
      nativeInput: 'nativeInput',
      antAndNative:''
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
