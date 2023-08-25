<script lang="ts">
import sideMenus from "./sideMenu.vue"

export default {
  components: {
    sideMenus,
  },
}

</script>

<template>
  <!-- <sideMenus /> -->
  <sideMenus />

  <main>
    <section class="content">
      <router-view />
    </section>
  </main>
</template>

<style scoped>
main {
  box-sizing: border-box;
  position: relative;
  width: 84%;
  left: 16%;

  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: red; */
}

.content {
  margin: 0;
  width: 80%;
  /* background-color: palegreen; */
}
</style>
