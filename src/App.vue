<template>
<div>
  <router-view />
</div>
</template>

<script setup lang="ts">

onMounted(() => {
  window.addEventListener('onubload', (event) => {
    // 此处可以执行一些代码，例如询问用户是否确定离开页面
    console.log("重新加载")
    return false;
  })
})
</script>

<style scoped lang="less">

</style>
