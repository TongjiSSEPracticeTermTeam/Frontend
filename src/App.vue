<script setup lang="ts">
import 'font-pingfang-sc' // 苹方字体
import { onMounted, ref } from 'vue'
import Store from '@/store'
import { useStore } from 'vuex'
import axios from 'axios'
import User from '@/models/User'
import { useRoute, useRouter } from 'vue-router'
import CustomerMenu from '@/components/CustomerMenu.vue'
import ManagerMenu from '@/components/ManagerMenu.vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const store = useStore()
const router = useRouter()

onMounted(() => {
  // 检查登录状态，获取用户信息
  let token = window.localStorage.getItem('token')
  let currentUser = new User()
  if (token) {
    axios
      .get('/api/user')
      .then((r) => {
        let data: {
          status: string
          type: 'Customer' | 'Manager' | 'Administrator'
          username: string
          display_name: string | null
          avatar: string | null
        } = r.data

        if (data.status == '10000') {
          currentUser.avatarUrl = data.avatar ?? ''
          currentUser.id = data.username
          currentUser.displayName = data.display_name ?? ''
          currentUser.type = data.type
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  store.commit('setUser', currentUser)
  store.commit('setLogged', currentUser.type !== 'Anonymous')

  if (currentUser.type === 'Manager') {
    router.replace('manager')
  } else if (currentUser.type === 'Administrator') {
    router.replace('admin')
  }
})
</script>

<template>
  <header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      active-text-color="red"
    >
      <CustomerMenu
        v-if="
          store.state.currentUser.type === 'Anonymous' ||
          store.state.currentUser.type === 'Customer'
        "
      />
      <ManagerMenu v-else />
    </el-menu>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
main {
  font-family: 'PingFang SC', sans-serif; /*默认苹方字体*/
}
</style>