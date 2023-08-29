<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0">
      <img :src="getImage('/logo.png')" class="logo" style="width: 100px;height: 100px">
    </el-menu-item>

    <el-menu-item :index="item.id" v-for="item in menus"><h3>{{ item.title }}</h3></el-menu-item>

    <div class="flex-grow"/>
    <h5 style="margin: auto">管理员</h5>

    <el-sub-menu index="4">
      <template #title>
        <h4><img :src="getImage('/logo.png')" class="logo" style="width: 50px;height: 50px"></h4>
      </template>
      <el-menu-item index="4-1">个人中心</el-menu-item>
      <el-menu-item index="4-2">修改密码</el-menu-item>
      <el-menu-item index="4-3">退出登录</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import {getImage} from '../utils/comm';
import {useMenuStore} from "../store/Menu"
import {useLeftMenuStore} from "../store/LeftMenu"
import {useRouter} from "vue-router"
import {storeToRefs} from 'pinia'


const enumStore = useMenuStore();
const leftMenu = useLeftMenuStore();

const {menus} = storeToRefs(enumStore)

const activeIndex = getActiveIndex();

function getActiveIndex() {
  if (enumStore.menus[0]) {
    return ref(enumStore.menus[0].id);
  } else {
    return ref(1);
  }
}

console.log("activeIndex", activeIndex)
const route = useRouter();
const handleSelect = (key, keyPath) => {
  for (const idex in enumStore.menus) {
    const item = enumStore.menus[idex]
    if (key === item.id) {
      leftMenu.$patch({menus: enumStore.menus[idex].children})
      return;
    }
  }


  if (key == "4-3") {
    console.log("退出登录！")
    localStorage.clear();
    route.push("/Login")
  }
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>