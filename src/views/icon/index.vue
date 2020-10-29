<template>
  <div class="disease-container">
    <svg-icon icon-class="approval-config" />
    <span
      v-for="(v,i) in list"
      :key="i"
      style="padding:0.5rem;"
    >{{ v }}</span>

    <span
      v-for="(v,i) in list2"
      :key="i"
      style="padding:0.5rem;"
    >{{ lib[v].char }}</span>
  </div>
</template>

<script>
// var emoji = require("emojilib")
import emoji from 'emojilib'
export default {
  setup(){
    const list =emoji.fitzpatrick_scale_modifiers
    const list2= emoji.ordered
    const lib = emoji.lib
    console.log(emoji)
    list.forEach((v,i)=>{
      console.log(v)
    })
    list2.forEach((v,i)=>{
      // console.log(lib[v].lib)
    })
    return{
      list,
      list2,
      lib
    }
  }
}
</script>
<style scoped lang="scss">
.disease-container{
  overflow: auto;
}
</style>
