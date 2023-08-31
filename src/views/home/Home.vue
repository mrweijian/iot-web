<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Top></Top>
      </el-header>

      <el-container class="name-container">

        <el-aside class="name-aside">
          <Left></Left>
        </el-aside>

        <el-main class="name-main">
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

<style scoped lang="less">
.common-layout{
  height: 100vh;
  :deep(.el-header){
    padding:0;
  }
  .name-container{
    //margin-top:16px;
    display: flex;
    height:calc(100vh - 60px)
  }
  .name-aside{
    height:100%;
    overflow: auto;
    width:200px;
    box-shadow: 0 12px 12px 0 rgba(0,0,0,.1);
  }
  .el-main{
    flex: 1;
  }
}
</style>