<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Top></Top>
      </el-header>

      <el-container>

        <el-aside width="400px" style="margin-top: 50px">
          <Left></Left>
        </el-aside>

        <el-main style="margin-top: 50px;margin-left:-190px;height: 80vh;">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Left from "../../components/left.vue"
import Top from "../../components/top.vue"

</script>

<style scoped>

</style>