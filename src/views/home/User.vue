<template>
  <el-table :data="tableData" height="250" style="width: 100%">
    <el-table-column prop="id" label="编号" width="180" />
    <el-table-column prop="userName" label="姓名" width="180" />
    <el-table-column prop="state" label="状态" />
  </el-table>
</template>

<script lang="ts" setup>
const tableData = [{
  id:1,
  userName:"weijian",
  state:"正常"
}]
</script>

<style scoped>

</style>