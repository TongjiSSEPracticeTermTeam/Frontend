<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const registerForm = ref({
  username: '',
  password: '',
  email: ''
})

const loginForm = ref({
  email: '',
  password: ''
})

const register = () => {
  let form = registerForm.value
  if (form.username.length === 0 || form.password.length === 0) {
    ElMessage({
      message: '用户名或密码为空',
      type: 'warning'
    })
    return
  }

  if (form.email.length === 0) {
    ElMessage({
      message: '邮箱为空',
      type: 'warning'
    })
    return
  }

  let apiPath = '/api/Customer'
  let login = loginForm.value

  login.email = form.email
  login.password = form.password

  axios.put(apiPath, form).then((r) => {
    if (r.data && r.data.status && r.data.status === '10000') {
      ElMessage({
        message: `注册成功,即将自动登录`,
        type: 'success'
      })

      let loginApiPath = '/api/Customer/login'
      axios.post(loginApiPath, login).then((r) => {
        if (!(r.data && r.data.status && r.data.status === '10000')) {
          ElMessage({
            message: `登录失败`,
            type: 'warning'
          })
          console.log(r.data)
          return
        } else {
          window.localStorage.setItem('token', `Bearer ${r.data.token}`)
          router.push('/').then(() => {
            window.location.reload()
          })
        }
      })
    } else {
      ElMessage({
        message: `注册失败`,
        type: 'warning'
      })
      return
    }
  })
}
</script>

<template>
  <main>
    <div class="content">
      <transition name="el-zoom-in-top">
        <div class="center">
          <h1 class="text-left text-4xl">注册</h1>
          <h1 class="text-left text-3xl font-light">Register</h1>
          <el-form :model="registerForm" label-width="80px" class="mt-10">
            <el-form-item label="用户名">
              <el-input v-model="registerForm.username" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input type="email" v-model="registerForm.email" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input show-password v-model="registerForm.password" />
            </el-form-item>
            <el-form-item style="min-width: 100%">
              <el-button class="w-auto" type="primary" @click="register">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </transition>
    </div>
  </main>
</template>

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