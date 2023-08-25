<script lang="ts">

export default {
  data: () => {
    return {
      input: "",
    }
  },
}

</script>

<template>
  <div class="topbar">
    <el-input v-model="input" placeholder="输入关键词进行搜索" clearable size="large"/>
  </div>
</template>

<style scoped>
.topbar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 10vh;
  margin: 20px 0;
  border-bottom: 2px solid;
  /* background-color: red; */
}
</style>