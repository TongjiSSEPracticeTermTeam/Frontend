<script setup lang="ts">
import { useStore } from 'vuex'

const store = useStore()
</script>

<template>
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
</template>

<style scoped></style>