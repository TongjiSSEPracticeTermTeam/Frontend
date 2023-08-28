<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const isCustomer = ref(true)
const switchCustomer = () => {
  isCustomer.value = !isCustomer.value
}

const isAdmin = ref(false)

const loginForm = ref({
  username: '',
  password: ''
})

const login = () => {
  let form = loginForm.value
  if (form.username.length === 0 || form.password.length === 0) {
    ElMessage({
      message: '用户名或密码为空',
      type: 'warning'
    })
    return
  }
  let apiPath = '/api/customer/login'
  if (!isCustomer.value) {
    if (isAdmin.value) apiPath = '/api/Administrator/login'
    else apiPath = '/api/Manager/login'
  }
  axios.post(apiPath, form).then((r) => {
    if (r.data && r.data.status && r.data.status === '10000') {
      ElMessage({
        message: `登录成功`,
        type: 'success'
      })
      window.localStorage.setItem('token', `Bearer ${r.data.token}`)
      if (!isCustomer.value) {
        if (isAdmin.value)
          router.push('/admin').then(() => {
            window.location.reload()
          })
        else
          router.push('/manager').then(() => {
            window.location.reload()
          })
      } else {
        router.push('/').then(() => {
          window.location.reload()
        })
      }
    } else {
      ElMessage({
        message: `登录失败：${r.data.message}`,
        type: 'warning'
      })
    }
  })
}

const register = () => {}
</script>

<template>
  <main>
    <div class="content">
      <transition name="el-zoom-in-top">
        <div class="center">
          <h1 class="text-left text-4xl">登录</h1>
          <h1 class="text-left text-3xl font-light">Login</h1>
          <el-form :model="loginForm" label-width="80px" class="mt-10">
            <el-form-item label="角色" v-if="!isCustomer">
              <el-radio-group v-model="isAdmin" class="ml-4">
                <el-radio :label="false">影厅经理</el-radio>
                <el-radio :label="true">院线管理员</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="loginForm.username" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input show-password v-model="loginForm.password" />
            </el-form-item>
            <el-form-item style="min-width: 100%">
              <el-button class="w-auto" type="primary" @click="login">登录</el-button>
              <el-button class="w-auto" @click="register">注册</el-button>
              <el-button class="w-auto" v-if="isCustomer" link @click="switchCustomer">
                管理员登录
              </el-button>
              <el-button class="w-auto" v-else link @click="switchCustomer">客户登录</el-button>
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