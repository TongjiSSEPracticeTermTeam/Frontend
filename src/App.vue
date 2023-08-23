<script setup lang="ts">
import 'font-pingfang-sc' // 苹方字体
import {onMounted, ref} from 'vue'
import Store from "@/store";
import {useStore} from "vuex";
import axios from "axios";

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const store = useStore();

onMounted(()=>{
    // 检查登录状态，获取用户信息
    let token = window.localStorage.getItem("token");
    if(token){
        axios.get()
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
      <el-menu-item index="0">
        <router-link to="/">
          <span style="font-weight: 600; font-size: 1.5em; color: red">同济院线</span>
        </router-link>
      </el-menu-item>
      <el-menu-item index="2"><span style="font-size: 1.3em">电影</span></el-menu-item>
      <el-menu-item index="3"><span style="font-size: 1.3em">影院</span></el-menu-item>
      <el-menu-item index="4"><span style="font-size: 1.3em">订单</span></el-menu-item>
      <el-menu-item index="5">
        <span style="font-size: 1.3em" v-if="store.state.isLogged">{{
            store.state.currentUser.displayName
        }}</span>
        <span style="font-size: 1.3em" v-else>注册/登录</span>
      </el-menu-item>
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
