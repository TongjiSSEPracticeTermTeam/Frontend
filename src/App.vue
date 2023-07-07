<script setup lang="ts">
import 'font-pingfang-sc' // 苹方字体
import HomePage from './components/HomePage.vue'
</script>

<template>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
main {
  font-family: 'PingFang SC', sans-serif; /*默认苹方字体*/
}
</style>