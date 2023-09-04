<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type BoxOfficeData } from '@/models/QuickType/BoxOfficeData'
import Movie from '@/models/Movie'
import axios from 'axios'
import MovieCard from '@/components/customer/movie/MovieCard.vue'
import { ElMessage } from 'element-plus'

const movies = ref<Movie[]>([])
const hotMovies = ref<Movie[]>([])
const comingSoonMovies = ref<Movie[]>([])

const isOnPlay = (releaseDate: string|null, removalDate: string|null) => {
  if(!releaseDate || !removalDate) return false
  const now = new Date()
  const release = new Date(releaseDate)
  const removal = new Date(removalDate)
  return release <= now && now <= removal
}

const isCommingSoon=(releaseDate: string|null)=>{
  if(!releaseDate) return false
  const now = new Date()
  const release = new Date(releaseDate)
  return release > now
}

const loadMovies=()=>{
  axios.get('/api/Movies/tags').then((r)=>{
    if(r.data&&r.data.status==='10000'){
      movies.value=r.data.data
      loadHotMovies()
      loadComingSoonMovies()
    }
  })
}

const loadHotMovies = async () => {
  hotMovies.value=movies.value.filter((movie) => isOnPlay(movie.releaseDate, movie.removalDate));
  hotMovies.value=hotMovies.value.sort((a,b)=>{
    if(a.score===null){
      return 1
    }else if(b.score===null){
      return -1
    }else{
      return b.score-a.score
    }
  })
}


const loadComingSoonMovies = async () => {
  comingSoonMovies.value = movies.value.filter((movie) => isCommingSoon(movie.releaseDate));
}

onMounted(() => {
  loadMovies()
  loadBoxOffice()
})

/**
 * 票房相关
 */
const boxOfficeData = ref<BoxOfficeData>({
  generalData: {
    updateTime: '（正在获取数据）',
    sumBoxOffice: 0,
    sumAudienceCount: 0,
    sumShowCount: 0
  },
  movieData: []
})

const loadBoxOffice = () => {
  axios
    .get('/api/BoxOffice')
    .then((res) => {
      if (res.data.status && res.data.status === '10000') {
        boxOfficeData.value = res.data.data
      } else {
        ElMessage({
          message: `请求票房数据失败：${res.data.message}`,
          type: 'warning'
        })
      }
    })
    .catch(() => {
      ElMessage({
        message: '请求票房数据失败：网络错误',
        type: 'warning'
      })
    })
}
</script>

<template>
  <div class="content">
    <div class="py-5" style="display: flex">
      <div style="flex-grow: 1" />
      <div class="mx-5">
        <el-row>
          <el-col :span="18" class="pr-3">
            <el-space direction="vertical" alignment="normal" size="large" style="min-width: 600px">
              <el-card class="translucent-card">
                <h1 class="title ml-5">首页推荐</h1>

                <el-carousel
                  class="mx-3"
                  :interval="3000"
                  indicator-position="outside"
                  type="card"
                  autoplay
                >
                  <el-carousel-item
                    v-for="movie in hotMovies.slice(0,5)"
                    :key="movie.movieId"
                    style="display: flex; justify-content: center"
                  >
                    <MovieCard :movie="movie" />
                  </el-carousel-item>
                </el-carousel>
              </el-card>

              <el-card class="translucent-card">
                <div style="display: flex" class="mx-5">
                  <h1 class="title">正在热映({{ hotMovies.length }})</h1>
                  <div style="flex-grow: 1" />
                  <el-link href="/movie">全部</el-link>
                </div>

                <div class="mx-auto px-5">
                  <el-space wrap>
                    <div v-for="(movie, index) in hotMovies.slice(0,8)" :key="index">
                      <div class="my-3">
                        <MovieCard :movie="movie" />
                        <div class="mt-3 text-center">{{ movie.name }}</div>
                      </div>
                    </div>
                  </el-space>
                </div>
              </el-card>

              <el-card class="translucent-card">
                <div style="display: flex" class="mx-5">
                  <h1 class="title">即将上映({{ comingSoonMovies.length }})</h1>
                  <div style="flex-grow: 1" />
                  <el-link href="/movie">全部</el-link>
                </div>

                <div class="mx-auto px-5">
                  <el-space wrap>
                    <div v-for="(movie, index) in comingSoonMovies.slice(0, 8)" :key="index">
                      <div class="my-3">
                        <MovieCard :movie="movie" />
                        <div class="mt-3 text-center">{{ movie.name }}</div>
                      </div>
                    </div>
                  </el-space>
                </div>
              </el-card>

              <el-card class="translucent-card">
                <div style="display: flex" class="mx-5">
                  <h1 class="title">热门电影院</h1>
                  <div style="flex-grow: 1" />
                  <el-link href="">全部</el-link>
                </div>
              </el-card>
            </el-space>
          </el-col>
          <el-col :span="6">
            <el-space size="large" direction="vertical" alignment="normal" fill class="w-full">
              <el-card>欢迎您访问同济院线</el-card>
              <el-card>
                <h2 class="text-xl font-bold">今日全国票房</h2>
                <p class="text-gray-400">全国票房数据由艺恩提供</p>
                <div class="my-5 flex items-end">
                  <h3 class="text-red-500 font-bold text-3xl">
                    {{ (boxOfficeData.generalData.sumBoxOffice / 10000).toFixed(3) }}
                  </h3>
                  <h3 class="ml-2">万元</h3>
                </div>
                <div class="my-5">
                  <div class="flex items-end">
                    <h3>今日排片：</h3>
                    <h3 class="mx-1 text-red-500 font-bold text-xl">
                      {{ (boxOfficeData.generalData.sumShowCount / 10000).toFixed(2) }}
                    </h3>
                    <h3>万场</h3>
                  </div>
                  <div class="flex items-end">
                    <h3>今日观众：</h3>
                    <h3 class="mx-1 text-red-500 font-bold text-xl">
                      {{ (boxOfficeData.generalData.sumAudienceCount / 10000).toFixed(2) }}
                    </h3>
                    <h3>万人</h3>
                  </div>
                </div>
                <div class="flex">
                  <div class="grow" />
                  <span class="text-sm text-gray-400">
                    数据更新于{{ boxOfficeData.generalData.updateTime }}
                  </span>
                </div>
              </el-card>
              <el-card>
                <h2 class="text-xl font-bold">影片票房榜</h2>
                <p class="text-gray-400">全国票房数据由艺恩提供</p>
                <div class="my-5">
                  <el-divider />
                  <div v-for="movie in boxOfficeData.movieData" :key="movie">
                    <div class="flex items-end">
                      <span class="text-red-500 font-bold italic">{{ movie.irank }}</span>
                      <span class="ml-5">{{ movie.movieName }}</span>
                      <div class="grow" />
                      <span class="text-red-500 font-bold">{{
                        (movie.boxOffice / 10000).toFixed(2)
                      }}</span>
                      <span class="mx-1">万元</span>
                    </div>
                    <el-divider />
                  </div>
                </div>
                <div class="flex">
                  <div class="grow" />
                  <span class="text-sm text-gray-400">
                    数据更新于{{ boxOfficeData.generalData.updateTime }}
                  </span>
                </div>
              </el-card>
            </el-space>
          </el-col>
        </el-row>
      </div>
      <div style="flex-grow: 1" />
    </div>
  </div>
</template>

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

.translucent-card {
  background: rgba(255, 255, 255, 0.9);
}
</style>