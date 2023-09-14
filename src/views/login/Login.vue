<template>
  <div class="container">
    <div class="left">
      <img :src="getImage('/bg1.svg')" />
    </div>
    <div class="right">

      <div class="top">
        <div class="main">
          <div class="header-con">
            <div class="header">
              <img :src="getImage('/logo.svg')" class="logo">
              <h2 class="name">物联协管中心</h2>
            </div>
          </div>
          <div>
            <el-row>
              <el-col :span="4">
                <span>账号:</span>
              </el-col>
              <el-col :span="20">
                <el-input v-model="form.username" class="w-50 m-2" placeholder="请输入用户名" size="large" />
              </el-col>
            </el-row>
            <el-row style="margin-top: 20px">
              <el-col :span="4">
                <span>密码：</span>
              </el-col>
              <el-col :span="20">
                <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password size="large" />
              </el-col>
            </el-row>

            <el-row style="margin-top: 20px">
              <el-col :span="4">
                <span>验证码：</span>
              </el-col>
              <el-col :span="10">
                <el-input v-model="form.verifyCode" placeholder="验证码"  size="large" />
              </el-col>

              <el-col :span="8">
                <img :src="getImage('/验证码.png')" style="width: 100px">
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="button">
          <el-button type="primary"  size="large" @click="onLogin"> 登录</el-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImage } from '../../utils/comm';
import { useRouter } from "vue-router";
import { login } from '../../service/login/LoginService'
import { ElMessage } from 'element-plus'
import { LocalStore } from '../../utils/comm';
import { useLeftMenuStore } from "../../store/LeftMenu"
import { MENU_LIST, TOKEN_KEY } from "../../utils/variable";
import { getMenuList } from "../../service/menu/MenuService";
import { useMenuStore } from "../../store/menu"

const form = reactive({
  username: '',
  password: '',
  remember: false,
  expires: 3600000,
  verifyCode: '',
  verifyKey: '',
});
const route = useRouter();
const menuStore = useMenuStore();
const leftMenu = useLeftMenuStore();


function onLogin() {

  const userData = {
    userName: form.username,
    password: form.password
  }


  login(userData).then((param) => {
    console.log("登录成功！")
    LocalStore.set(TOKEN_KEY, param.data)
    // 获取菜单列表
    getMenuList().then((menuParam) => {
      menuStore.$patch({ menus: menuParam.data })
      if(menuParam.data.length>0){
        leftMenu.$patch({menus:menuParam.data[0].children})
      }
    }).catch((error) => {
      console.log(error)
    })
    route.push("/Home")
  }).catch((err) => {
    ElMessage.error('登录失败!')
    //todo:刷新验证码
  });


}
function getNotChildrenItem(data){
  if(data[0].children.length>0){
    getNotChildrenItem(data[0].children)
  }else{
    return data[0]
  }
  
}
</script>

<style scoped lang="less">
.container {
  // display: flex;
  height: 100vh;
  position: relative;
  background: url(../../../public/images/bg.png) no-repeat;
  background-size: 100%;

  //overflow: auto;

  .left {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10%;

    img {
      width: 500px;
    }

  }

  .right {
    position: absolute;
    flex-direction: column;
    justify-content: space-between;
    width: 27%;
    background: #fff;
    margin-left: 50px;
    top: 50%;
    min-height: 300px;
    transform: translateY(-50%);
    right: 60px;
    border-radius: 16px;
    padding: 30px 16px;
    .top {
      min-height: 300px;
      border-radius: 16px;

      .main {
        //min-height: 570px;
        border-radius: 16px;
        
        .header-con{
          width:100%;
          display: flex;
          justify-content: center;
        }
        .header {
          border-radius: 16px;
          display: flex;
          //flex-direction: column;
          margin-bottom: 30px;
          .name{
            margin:0;
            padding-left:20px;
            line-height:50px;
          }
          .logo {
            height: 50px;
            
          }
        }
      }

      .button {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        padding:0 100px;
        :deep(.el-button){
          border:none;
          background: linear-gradient(110deg, #027FF3 0%, #00E4FE 100%);
        }
      }

    }
  }
}
</style>

