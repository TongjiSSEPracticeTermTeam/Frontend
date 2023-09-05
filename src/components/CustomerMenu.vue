<script setup lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const handle_select = (path: string) => {
  switch (path) {
    case '0':
      router.push('/')
      break
    case '2':
      router.push('/movie')
      break
    case '3'://进入影院界面
      console.log('3')
      router.push('/cinema')
      break
    case '4':
      router.push('/staff')
      break
    case '5':
      router.push('/login')
      break
    case '5-1':
      router.push('/')
      break
    case '5-2':
      router.push('/tickets')
      break
    case '5-3':
      window.localStorage.removeItem('token')
      store.commit('logout')
      router.push('/')
      window.location.reload()
      break

  }
}
defineExpose({ handle_select })
</script>

<template>
  <el-menu-item index="0">
    <router-link to="/">
      <span style="font-weight: 600; font-size: 1.5em; color: red">同济院线</span>
    </router-link>
  </el-menu-item>
  <el-menu-item index="2"><span style="font-size: 1.3em">电影</span></el-menu-item>
  <el-menu-item index="3"><span style="font-size: 1.3em">影院</span></el-menu-item>
  <el-menu-item index="4"><span style="font-size: 1.3em">影人</span></el-menu-item>
  <el-sub-menu v-if="store.state.isLogged" index="5">
    <template #title>
      <span style="font-size: 1.3em">{{ store.state.currentUser.displayName }}</span>
    </template>
    <el-menu-item index="5-1">个人中心</el-menu-item>
    <el-menu-item index="5-2">订单</el-menu-item>
    <el-menu-item index="5-3">登出</el-menu-item>
  </el-sub-menu>
  <el-menu-item v-else index="5">
    <span style="font-size: 1.3em">注册/登录</span>
  </el-menu-item>
</template>

<style scoped></style>