<template>
  <el-menu :default-active="`${leftActive}`" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
    @select="handleSelect">
    <Menu :menuList="leftMenuStore.menus"></Menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { Menu as IconMenu } from '@element-plus/icons-vue'
import Menu from "./Menu.vue"
import { getNodeByMenuPath } from "../utils/comm";
import { useMenuStore } from "../store/Menu"
import { useLeftMenuStore } from "../store/LeftMenu"
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const leftMenuStore = useLeftMenuStore()
const enumStore = useMenuStore();
const {leftActive} = storeToRefs(enumStore)
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
const handleSelect = (key:string) => {
  
  if (leftMenuStore.menus) {
    const pathItem:any = getNodeByMenuPath(leftMenuStore.menus,Number(key),'id')
    console.log(pathItem,leftMenuStore.menus)
    router.push(pathItem.menuPath)
  }
}
</script>
<style lang="less" scoped>

  .el-menu-vertical-demo{
    border:none;
  }

</style>

