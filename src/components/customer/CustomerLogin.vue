<script setup lang="ts"></script>

<template>
  <main>
    <div class="content">
      <transition name="el-zoom-in-top">
        <div class="center">
          <h1 class="text-left text-4xl">登录</h1>
          <h1 class="text-left text-3xl font-light">Login</h1>
          <el-form :model="loginForm" label-width="80px" class="mt-10">
            <el-form-item label="注册邮箱">
              <el-input v-model="loginForm.username" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input show-password v-model="loginForm.password" />
            </el-form-item>
            <el-form-item style="min-width: 100%">
              <el-button class="w-auto" type="primary" @click="login">登录</el-button>
              <el-button class="w-auto" @click="register">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </transition>
    </div>
  </main>
</template>

<script lang="ts">
import axios from 'axios'
import { ElMessage } from 'element-plus'

export default {
  data: () => {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login: function () {
      let form = this.loginForm
      if (form.username.length === 0 || form.password.length === 0) {
        ElMessage({
          message: '用户名或密码为空',
          type: 'warning'
        })
        return
      }
      axios.post('/api/customer/login', form).then((r) => {
        if (r.data.status != '10000') {
          ElMessage({
            message: r.data.message,
            type: 'warning'
          })
        } else {
          ElMessage(r.data.message + ' ' + r.data.userdata.name)
        }
      })
    },
    register: function () {}
  }
}
</script>

<style scoped>
.center {
  text-align: center;
  padding: 40px 80px;
  min-width: 500px;
  position: absolute;
  top: 50%; /* 垂直定位在 50% 的位置 */
  left: 50%; /* 水平定位在 50% 的位置 */
  transform: translate(-50%, -50%); /* 使用 transform 进行位移来居中 */
  backdrop-filter: blur(11px) saturate(180%) brightness(105%);
  -webkit-backdrop-filter: blur(11px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.45);
  border-radius: 20px;
  border: 1px solid rgba(209, 213, 219, 0.3);
}
</style>
