<template>
  <div class="movie-page">
    <el-row>
        <el-col :span="4"/>
      <el-col :span="16">
        <h1 class="title">首页推荐</h1>
      </el-col>
        <el-col :span="4"/>
    </el-row>

    <el-row>
      <el-col :span="4"/>
        <el-col :span="16">
          <el-carousel :interval="3000"  indicator-position="outside" type="card" autoplay>
            <el-carousel-item v-for="movie in hotMovies" :key="movie.movieId" style="display: flex; justify-content: center;">
              <MovieCard :movie="movie"/>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      <el-col :span="4"/>
    </el-row>
    <el-row style="display: flex;flex-wrap: wrap;">
      <el-col :span="4"/>
        <h1 class="title">热门电影({{ hotMovies.length }})</h1>
        <el-col :span="14"/>
        <el-link href="">全部</el-link>
      <el-col :span="4"/>
    </el-row>

    <el-row style="display: flex; flex-wrap: wrap;">
      <el-col :span="4"/>
      <div v-for="(movie,index) in hotMovies.slice(0,6)" :key="index">
        <MovieCard :movie="movie"/>
      </div>
      <el-col :span="4"/>
    </el-row>
    <el-row style="display: flex;flex-wrap: wrap;">
      <el-col :span="4"/>
        <h1 class="title">即将上映({{ hotMovies.length }})</h1>
        <el-col :span="14"/>
        <el-link href="">全部</el-link>
      <el-col :span="4"/>
    </el-row>
    <el-row style="display: flex; flex-wrap: wrap;">
      <el-col :span="4"/>
      <div v-for="(movie,index) in hotMovies.slice(0,6)" :key="index">
        <MovieCard :movie="movie"/>
      </div>
      <el-col :span="4"/>
    </el-row>

    <el-row style="display: flex;flex-wrap: wrap;">
      <el-col :span="4"/>
        <h1 class="title">电影院详情</h1>
        <el-col :span="14"/>
        <el-link href="">全部</el-link>
      <el-col :span="4"/>
    </el-row>

  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import Movie from '@/models/Movie'
import MovieCard from '@/components/movie/MovieCard.vue'
import axios from 'axios'

export default {
  name: 'MoviePage',
  components: {
    MovieCard,
},
  setup() {
    const hotMovies = ref<Movie[]>([])
    const comingSoonMovies = ref<Movie[]>([])

    const handleMovieClick = (movie: Movie) => {
      // TODO: 处理电影详情页跳转逻辑
    }

    const loadHotMovies =() => {
      // axios
      //   .get(`/api/Movies?page_size=6&page_number=1`)
      //   .then((res) => {
      //     if (res.data && res.data.status && res.data.status === '10000') {
      //       hotMovies.value = res.data.data
      //     }
      //   })
      hotMovies.value=[
                      new Movie({
            movieId: '1',
            name: '学爸',
            duration: '120分钟',
            instruction: '这是一部电影',
            score: 9.3,
            postUrl: 'https://p0.pipi.cn/mmdb/fb738633537f2a9235c7ed11e14a265302a9b.jpg?imageView2/1/w/464/h/644',
            tags: '剧情,爱情',
            releaseDate: '2021-01-01',
            removalDate: null,
          }), 
          new Movie({
            movieId: '1',
            name: '学爸',
            duration: '120分钟',
            instruction: '这是一部电影',
            score: 9.3,
            postUrl: 'https://p0.pipi.cn/mmdb/fb738633537f2a9235c7ed11e14a265302a9b.jpg?imageView2/1/w/464/h/644',
            tags: '剧情,爱情',
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
            tags: '剧情,爱情',
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
            tags: '剧情,爱情',
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
            tags: '剧情,爱情',
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
            tags: '剧情,爱情',
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
            tags: '剧情,爱情',
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
            tags: '剧情,爱情',
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
            tags: '剧情,爱情',
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
            tags: '剧情,爱情',
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
            tags: '剧情,爱情',
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
            tags: '剧情,爱情',
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
            tags: '剧情,爱情',
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
            tags: '剧情,爱情',
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
            tags: '剧情,爱情',
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
            tags: '剧情,爱情',
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
  margin-bottom: 12px;
  color: red;
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