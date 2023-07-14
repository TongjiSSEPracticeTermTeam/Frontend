<script lang="ts">
import sideMenus from "./sideMenu.vue"
import topBar from "./topBar.vue"

export default {
  components: {
    sideMenus,
    topBar
  },
  data: () => {
    return {
      movies: [
        {
          name: "荒野之路",
          duration: 105,
          onDate: "2023-10-24",
          offDate: "2023-12-23"
        },
        {
          name: "生化危机",
          duration: 123,
          onDate: "2024-7-3",
          offDate: "2023-10-2"
        },
        {
          name: "求生之路",
          duration: 93,
          onDate: "2012-7-3",
          offDate: "2013-10-2"
        },
        {
          name: "为美好的世界献上祝福红传说",
          duration: 89,
          onDate: "2024-7-3",
          offDate: "2023-10-2"
        }
      ],
    }
  },
  methods: {

  }
}

</script>

<template>
  <!-- <sideMenus /> -->
  <sideMenus />

  <main>
    <!-- <topBar /> -->
    <topBar />

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
