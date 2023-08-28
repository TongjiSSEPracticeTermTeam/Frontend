<template>
  <div class="movie-page">
    <el-row>
        <el-col :span="4"/>
      <el-col :span="12">
        <h1 class="title">热门电影</h1>
      </el-col>
        <el-col :span="8"/>
    </el-row>
    <el-row>
        <el-col :span="4"/>
      <el-col :span="16">
        <el-carousel :interval="5000" arrow="always" indicator-position="outside" autoplay>
        <el-carousel-item v-for="movie in hotMovies" :key="movie.movieId" style="display: flex; justify-content: center;">
            <div class="movie-card">
            <div class="movie-card-image">
                <el-image :src="movie.postUrl" fit="scale-down" style="width: 100%; height: 100%; vertical-align: middle;"></el-image>
            </div>
            <div class="movie-card-content" style="margin-left: 20px;">
                <h3 class="movie-card-title">{{ movie.name }}</h3>
                <p class="movie-card-duration">时长：{{ movie.duration }}</p>
                <p class="movie-card-score">得分：{{ movie.score }}</p>
                <el-button type="primary" class="movie-card-button" @click="handleMovieClick(movie)">查看详情</el-button>
            </div>
            </div>
        </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <el-row>
        <el-col :span="4"/>
      <el-col :span="12">
        <h1 class="title">即将上映</h1>
      </el-col>
        <el-col :span="8"/>
    </el-row>
    <el-row>
        <el-col :span="4"/>
      <el-col :span="16">
        <el-carousel :interval="5000" arrow="always" indicator-position="outside" autoplay>
        <el-carousel-item v-for="movie in comingSoonMovies" :key="movie.movieId" style="display: flex; justify-content: center;">
            <div class="movie-card">
            <div class="movie-card-image">
                <el-image :src="movie.postUrl" fit="scale-down" style="width: 100%; height: 100%; vertical-align: middle;"></el-image>
            </div>
            <div class="movie-card-content" style="margin-left: 20px;">
                <h3 class="movie-card-title">{{ movie.name }}</h3>
                <p class="movie-card-duration">时长：{{ movie.duration }}</p>
                <p class="movie-card-score">得分：{{ movie.score }}</p>
                <el-button type="primary" class="movie-card-button" @click="handleMovieClick(movie)">查看详情</el-button>
            </div>
            </div>
        </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <h1 class="title">评分最高</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-row :gutter="20">
          <el-col :span="6" v-for="movie in hotMovies" :key="movie.movieId">
            <div class="movie-card">
              <div class="movie-card-image">
                <el-image :src="movie.postUrl" fit="scale-down" style="width: 100%; height: 100%; vertical-align: middle;"></el-image>
              </div>
              <div class="movie-card-content" style="margin-left: 20px;">
                <h3 class="movie-card-title">{{ movie.name }}</h3>
                <p class="movie-card-duration">{{ movie.duration }}</p>
                <p class="movie-card-score">{{ movie.score }}</p>
                <el-button type="primary" class="movie-card-button" @click="handleMovieClick(movie)">查看详情</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import Movie from '@/models/Movie'

export default {
  name: 'MoviePage',
  components: {},
  setup() {
    const hotMovies = ref<Movie[]>([])
    const comingSoonMovies = ref<Movie[]>([])

    const handleMovieClick = (movie: Movie) => {
      // TODO: 处理电影详情页跳转逻辑
    }

    const loadHotMovies = async () => {
        hotMovies.value=[
          new Movie({
            movieId: '1',
            name: '学爸',
            duration: '120分钟',
            instruction: '这是一部电影',
            score: null,
            postUrl: 'https://p0.pipi.cn/mmdb/fb738633537f2a9235c7ed11e14a265302a9b.jpg?imageView2/1/w/464/h/644',
            tags: '剧情, 爱情',
            releaseDate: '2021-01-01',
            removalDate: null,
          }), 
          new Movie({
            movieId: '1',
            name: '学爸',
            duration: '120分钟',
            instruction: '这是一部电影',
            score: null,
            postUrl: 'https://p0.pipi.cn/mmdb/fb738633537f2a9235c7ed11e14a265302a9b.jpg?imageView2/1/w/464/h/644',
            tags: '剧情, 爱情',
            releaseDate: '2021-01-01',
            removalDate: null,
          }),
          new Movie({
            movieId: '1',
            name: '学爸',
            duration: '120分钟',
            instruction: '这是一部电影',
            score: null,
            postUrl: 'https://p0.pipi.cn/mmdb/fb738633537f2a9235c7ed11e14a265302a9b.jpg?imageView2/1/w/464/h/644',
            tags: '剧情, 爱情',
            releaseDate: '2021-01-01',
            removalDate: null,
          }),
          new Movie({
            movieId: '1',
            name: '学爸',
            duration: '120分钟',
            instruction: '这是一部电影',
            score: null,
            postUrl: 'https://p0.pipi.cn/mmdb/fb738633537f2a9235c7ed11e14a265302a9b.jpg?imageView2/1/w/464/h/644',
            tags: '剧情, 爱情',
            releaseDate: '2021-01-01',
            removalDate: null,
          }),
          new Movie({
            movieId: '1',
            name: '学爸',
            duration: '120分钟',
            instruction: '这是一部电影',
            score: null,
            postUrl: 'https://p0.pipi.cn/mmdb/fb738633537f2a9235c7ed11e14a265302a9b.jpg?imageView2/1/w/464/h/644',
            tags: '剧情, 爱情',
            releaseDate: '2021-01-01',
            removalDate: null,
          }),
        ]
    }

    const loadComingSoonMovies = async () => {
        comingSoonMovies.value=[
                      new Movie({
            movieId: '1',
            name: '学爸',
            duration: '120分钟',
            instruction: '这是一部电影',
            score: null,
            postUrl: 'https://p0.pipi.cn/mmdb/fb738633537f2a9235c7ed11e14a265302a9b.jpg?imageView2/1/w/464/h/644',
            tags: '剧情, 爱情',
            releaseDate: '2021-01-01',
            removalDate: null,
          }), 
          new Movie({
            movieId: '1',
            name: '学爸',
            duration: '120分钟',
            instruction: '这是一部电影',
            score: null,
            postUrl: 'https://p0.pipi.cn/mmdb/fb738633537f2a9235c7ed11e14a265302a9b.jpg?imageView2/1/w/464/h/644',
            tags: '剧情, 爱情',
            releaseDate: '2021-01-01',
            removalDate: null,
          }),
          new Movie({
            movieId: '1',
            name: '学爸',
            duration: '120分钟',
            instruction: '这是一部电影',
            score: null,
            postUrl: 'https://p0.pipi.cn/mmdb/fb738633537f2a9235c7ed11e14a265302a9b.jpg?imageView2/1/w/464/h/644',
            tags: '剧情, 爱情',
            releaseDate: '2021-01-01',
            removalDate: null,
          }),
          new Movie({
            movieId: '1',
            name: '学爸',
            duration: '120分钟',
            instruction: '这是一部电影',
            score: null,
            postUrl: 'https://p0.pipi.cn/mmdb/fb738633537f2a9235c7ed11e14a265302a9b.jpg?imageView2/1/w/464/h/644',
            tags: '剧情, 爱情',
            releaseDate: '2021-01-01',
            removalDate: null,
          }),
          new Movie({
            movieId: '1',
            name: '学爸',
            duration: '120分钟',
            instruction: '这是一部电影',
            score: null,
            postUrl: 'https://p0.pipi.cn/mmdb/fb738633537f2a9235c7ed11e14a265302a9b.jpg?imageView2/1/w/464/h/644',
            tags: '剧情, 爱情',
            releaseDate: '2021-01-01',
            removalDate: null,
          }),
        ]
    }

    onMounted(() => {
      loadHotMovies()
      loadComingSoonMovies()
    })

    return {
      hotMovies,
      comingSoonMovies,
      handleMovieClick,
    }
  },
}
</script>

<style scoped>
.movie-page {
  padding: 24px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}

.movie-card {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
}

.movie-card-image {
  width: 200px;
  height: 280px;
  margin-right: 24px;
}

.movie-card-content {
  flex: 1;
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
  margin-bottom: 16px;
}

.movie-card-button {
  margin-top: 16px;
}
</style>