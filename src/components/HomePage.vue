<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    active-text-color="red"
  >
    <el-menu-item index="0">
      <span style="font-weight: 600; font-size: 1.5em; color: red"> 同济院线 </span>
    </el-menu-item>
    <el-menu-item index="2"><span style="font-size: 1.3em">电影</span></el-menu-item>
    <el-menu-item index="3"><span style="font-size: 1.3em">影院</span></el-menu-item>
    <el-menu-item index="4"><span style="font-size: 1.3em">我的</span></el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="5"><span style="font-size: 1.3em">注册/登录</span></el-menu-item>
  </el-menu>

  <div class="content">
    <div class="center">
      <h1>影院管理系统</h1>
      <p>还在开发中</p>

      <p style="margin-top: 40px; font-size: 1.2em; margin-bottom: 20px">快速链接</p>

      <router-link to="/login" style="text-decoration: none">
        <el-button>登录页面</el-button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.center {
  text-align: center;
  padding: 120px 80px;
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

.center h1 {
  font-size: 4em;
  font-weight: 700;
}

.center p {
  font-size: 1.5em;
}
</style>

<script lang="ts"></script>