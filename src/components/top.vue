<template>
  <div class="header-con">
    <div class="logo"> <img :src="getImage('/nav.svg')" class="logo" style="margin-top:9px;height: 40px;display: block;">
    </div>
    <div class="menu">
      <el-menu :default-active="topActive" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <el-menu-item :index="`${item.id}`" v-for="item in menus">{{ item.title }}</el-menu-item>
      </el-menu>
    </div>
    <div class="user">
      <div class="name">管理员</div>
      <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <el-sub-menu index="4">
          <template #title>
            <el-avatar :size="size" :src="getImage('/logo.png')"></el-avatar>
          </template>
          <el-menu-item index="4-1">个人中心</el-menu-item>
          <el-menu-item index="4-2">修改密码</el-menu-item>
          <el-menu-item index="4-3">退出登录</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue"
import { ElMessage } from 'element-plus'
import { getImage } from '../utils/comm';
import { useMenuStore } from "../store/Menu"
import { useLeftMenuStore } from "../store/LeftMenu"
import { useRouter } from "vue-router"
import { storeToRefs } from 'pinia'


const enumStore = useMenuStore();
const leftMenu = useLeftMenuStore();
const size = ref('')
const { menus,topActive} = storeToRefs(enumStore)
console.log('enumStore',enumStore.topActive,topActive)
 const activeIndex = '4-1';

// function getActiveIndex() {
//   if (enumStore.menus[0]) {
//     return ref(enumStore.menus[0].id);
//   } else {
//     return ref(1);
//   }
// }
const route = useRouter();
function getChildrenRoute(data){
  
  if((data.children&&data.children.length===0)||!data.children){
    return data.menuPath;
  }else{
    getChildrenRoute(data.children[0])
  }
};
const handleSelect = (key,) => {
  //enumStore.$patch({topActive:key})
  for (const idex in enumStore.menus) {
    const item = enumStore.menus[idex]
    if (key == item.id) {
      leftMenu.$patch({ menus: enumStore.menus[idex].children })
      if(!enumStore.menus[idex].children){
        ElMessage.error('菜单结构异常!')
      }
      const path = getChildrenRoute(enumStore.menus[idex].children[0])
      route.push(path)
      break;
    }
  }


  if (key == "4-3") {
    console.log("退出登录！")
    localStorage.clear();
    route.push("/Login")
  }
}

</script>

<style scoped lang="less">
:deep {

  .el-menu--horizontal>.el-menu-item,
  .el-menu--horizontal>.el-menu-item.is-active,
  .el-menu--horizontal.el-menu,.el-menu {
    border: none;
  }
}

.header-con {
  padding-left: 20px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

  .logo {
    padding: 0 10px 0 10px;
  }

  .menu {
    flex: 1;
  }

  .user {
    display: flex;

    .name {
      font-size: 14px;
      line-height: 56px;
    }
  }
}</style>