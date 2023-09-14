<template>
  <template v-for="item in menuList" :key="item.id">
    <!-- 没有子集 -->
    <template v-if="!item.children">
      <el-menu-item
          :index="`${item.id}`"
          v-if="!item.hidden"
          @click="goRoute"
      >
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 只有一个子集 -->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
          @click="goRoute"
          :index="item.children[0].id"
          v-if="!item.children[0].hidden"
      >
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 多个子集 -->
    <el-sub-menu
        :index="`${item.id}`"
        v-if="item.children && item.children.length > 1"
    >
      <template #title>
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import {useRouter} from 'vue-router'
import {useLeftMenuStore} from "../store/LeftMenu";

const leftMenu = useLeftMenuStore();

const router = useRouter()

defineProps(['menuList'])

const goRoute = (e: any) => {
  //console.log(leftMenu.menus[e.index-1])
}
</script>
<script lang="ts" setup>

</script>

<style scoped></style>