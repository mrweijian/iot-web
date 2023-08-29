<template>
  <div class="container">
    <div class="left">
      <!--    <img style="width: 100%; height: 100%" src="/Users/weijian/my-codes/java/iot-web/public/images/login.png"/>-->
      <img style="width: 100%; height: 100%" :src="getImage('/login.png')"/>
    </div>
    <div class="right">

      <div class="top">
        <div class="main">
          <div class="header">
            <img :src="getImage('/logo.png')" class="logo">
            <h2>物联协管中心</h2>
          </div>
          <div>
            <el-row>
              <el-col :span="4">
                <span>账号:</span>
              </el-col>
              <el-col :span="20">
                <el-input v-model="form.username" class="w-50 m-2" placeholder="请输入用户名"/>
              </el-col>
            </el-row>
            <el-row style="margin-top: 20px">
              <el-col :span="4">
                <span>密码：</span>
              </el-col>
              <el-col :span="20">
                <el-input
                    v-model="form.password"
                    type="password"
                    placeholder="请输入密码"
                    show-password
                />
              </el-col>
            </el-row>

            <el-row style="margin-top: 20px">
              <el-col :span="6">
                <span>验证码：</span>
              </el-col>
              <el-col :span="10">
                <el-input style="width: 150px" v-model="form.verifyCode" placeholder="验证码"/>
              </el-col>

              <el-col :span="8">
                <img :src="getImage('/验证码.png')" style="width: 100px">
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="button">
          <el-button type="primary" plain size="large" @click="onLogin"> 登录</el-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getImage} from '../../utils/comm';
import {useRouter} from "vue-router";
import {login} from '../../service/login/LoginService'
import {ElMessage} from 'element-plus'
import {LocalStore} from '../../utils/comm';
import {MENU_LIST, TOKEN_KEY} from "../../utils/variable";
import {getMenuList} from "../../service/menu/MenuService";
import {useMenuStore} from "../../store/menu"

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
      menuStore.$patch({menus: menuParam.data})
    }).catch((error) => {
      console.log(error)
    })
    route.push("/Home")
  }).catch((err) => {
    ElMessage.error('登录失败!')
    //todo:刷新验证码
  });


}
</script>

<style scoped lang="less">
.container {
  display: flex;
  height: 100vh;
  //overflow: auto;

  .left {
    width: 73%;
    height: 100%;
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 27%;
    background: #fff;
    margin-left: 50px;

    .top {
      width: 100%;

      .main {
        .header {
          display: flex;
          flex-direction: column;
          margin-bottom: 50px;

          .logo {
            height: 150px;
            margin-right: 16px;
            vertical-align: top;
          }
        }
      }

      .button {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
      }

    }
  }
}
</style>
