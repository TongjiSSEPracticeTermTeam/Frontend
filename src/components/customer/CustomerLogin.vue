<script setup lang="ts"></script>

<template>
  <main>
    <div class="content">
      <div class="center">
        <h1>登录</h1>
      </div>
    </div>
  </main>
</template>

<style scoped>
.center {
  text-align: center;
  padding: 120px 80px;
  min-width: 360px;
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
  font-size: 2.5em;
  font-weight: 300;
}

.center p {
  font-size: 1.5em;
}
</style>
