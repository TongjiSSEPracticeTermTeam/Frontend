<template>
  <div class="movie-card">
    <div class="movie-card-image">
      <el-image :src="movie.postUrl" fit="scale-down" style="width: 100%; height: 100%; vertical-align: middle;"></el-image>
      <div class="movie-card-info">
        <h3 class="movie-card-title">{{ movie.name }}</h3>
        <p class="movie-card-duration">{{ movie.duration }}</p>
        <p class="movie-card-score">得分：{{ movie.score }}</p>
        <p class="movie-card-releaseDate">上映日期：{{ movie.releaseDate }}</p>
        <el-tag v-for="(tag,index) in movie.tags?.split(',')" :key="index" class="movie-card-tag">{{ tag }}</el-tag>
        <el-button type="primary" class="movie-card-button" @click="handleMovieClick(movie)">查看详情</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Movie from '@/models/Movie'

export default defineComponent({
  name: 'MovieCard',
  props: {
    movie: {
      type: Object as () => Movie,
      required: true,
    },
  },
  setup(props) {
    const handleMovieClick = (movie: Movie) => {
      // TODO: 处理电影详情页跳转逻辑
    }

    return {
      handleMovieClick,
    }
  },
})
</script>

<style scoped>
.movie-card {
  display: flex;
  align-items: center;
}

.movie-card-image {
  position: relative;
  width: 200px;
  height: 280px;
  margin-right: 24px;
}

.movie-card-info {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 16px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.movie-card-image:hover .movie-card-info {
  opacity: 1;
}

.movie-card-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}

.movie-card-duration {
  font-size: 16px;
  margin-bottom: 8px;
}

.movie-card-score {
  font-size: 16px;
  margin-bottom: 8px;
}
.movie-card-releaseDate {
  font-size: 15px;
  margin-bottom: 16px;
}

.movie-card-tag {
  margin-right: 8px;
}
.movie-card-button {
  margin-top: 32px;
  margin-bottom: 0px;
}
</style>