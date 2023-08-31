<template>
  <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
    @select="handleSelect">
    <Menu :menuList="leftMenuStore.menus"></Menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { Menu as IconMenu } from '@element-plus/icons-vue'
import Menu from "./Menu.vue"
import { useLeftMenuStore } from "../store/LeftMenu"
import { useRouter } from 'vue-router'

const leftMenuStore = useLeftMenuStore()

const activeIndex = getActiveIndex()

function getActiveIndex() {
  // if (leftMenuStore.menus[0]) {
  //   return ref(leftMenuStore.menus[0].id)
  // }
  return ref(1);
}

const router = useRouter();
const handleOpen = (key: string, keyPath: string[]) => {
  console.log("handleOpen-key", key)
  // if (leftMenuStore.menus) {
  //   router.push(leftMenuStore.menus[key-1].menuPath)
  // }

}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleSelect = (key, keyPath) => {
  console.log("key", key)
  if (leftMenuStore.menus) {
    router.push(leftMenuStore.menus[key - 1].menuPath)
  }
}
</script>
<style lang="less" scoped>

  .el-menu-vertical-demo{
    border:none;
  }

</style>

