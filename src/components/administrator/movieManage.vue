<script>
import sideMenus from "./sideMenu.vue"
import movieInfo from "./barComponet.vue"

export default {
  components: {
    sideMenus,
    movieInfo
  },
  data: () => {
    return {
      movies: [
        {
          name: "荒野之路",
          duration: 105,
          onDate: "2023-10-24",
          offData: "2023-12-23"
        },
        {
          name: "生化危机",
          duration: 123,
          onDate: "2024-7-3",
          offData: "2023-10-2"
        }
      ],
    }
  }
}
</script>

<template>
  <header>
  </header>

  <sideMenus />

  <main>
    <div class="topbar">topBar</div>

    <section class="content">
      <div class="movieData">
        <movieInfo v-for="movie in movies" :key="movie.name" :movieName="movie.name" :duration="movie.duration"
          :releaseDate="movie.onDate" :endDate="movie.offData" />
      </div>
    </section>

  </main>
</template>

<style scoped>
main {
  position: relative;
  width: 84%;
  left: 16%;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  /* background-color: aqua; */
}

.content {
  margin: 0;
  /* background-color: red; */
  width: 80%;
}
.movieData {
  margin: 5% 5%;
  /* background-color: blueviolet; */
}

.topbar {
  /* background-color: blue; */
  height: 10vh;
  text-align: center;
}
</style>
