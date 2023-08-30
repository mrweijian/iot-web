<template>
  <el-row class="mb-4">
    <el-button type="primary" @click="dialogVisible = true">新增</el-button>
  </el-row>

  <div style="margin-top: 30px">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"/>
  </div>


  <el-dialog
      v-model="dialogVisible"
      title="新增菜单"
      width="50%"
  >
    <el-row :gutter="20">
      <el-col :span="6" style="text-align: right">菜单名称：</el-col>
      <el-col :span="18">
        <el-input placeholder="请输入菜单名称" v-model="menu.title"></el-input>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="6" style="text-align: right">菜单图标：</el-col>
      <el-col :span="18">
        <el-input placeholder="请输入菜单图标" v-model="menu.icon"></el-input>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="6" style="text-align: right">菜单唯一标识：</el-col>
      <el-col :span="18">
        <el-input placeholder="请输入菜单唯一标识" v-model="menu.menuKey"></el-input>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="6" style="text-align: right">菜单路由路径：</el-col>
      <el-col :span="18">
        <el-input placeholder="请输入菜单路由路径" v-model="menu.menuPath"></el-input>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="6" style="text-align: right">父类id：</el-col>
      <el-col :span="18">
        <el-input placeholder="请输入父类id" v-model="menu.parentId"></el-input>
      </el-col>
    </el-row>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="addMenu">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>


<script lang="ts" setup>
import {addMenuInfo, getMenuListTree} from "../../service/menu/MenuService"


const dialogVisible = ref(false)

const menu = reactive({
  title: '',
  icon: '',
  menuKey: '',
  menuPath: '',
  parentId: ''
});


// 添加菜单信息
function addMenu() {
  addMenuInfo(menu).then((result) => {
    dialogVisible.value = false
  }).catch((error) => {
    console.log(error)
  })
}

interface Tree {
  label: string
  children?: Tree[]
}

let data = ref([])

getMenuListTree().then((result) => {
  data.value = result.data
  console.log("data", data)
})

const handleNodeClick = (data: Tree) => {
  console.log(data)
}

const defaultProps = {
  children: 'children',
  label: 'label',
}
</script>

<style scoped>

</style>