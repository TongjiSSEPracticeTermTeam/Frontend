<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Movie from '@/models/Movie'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import ColorThief from 'color-thief-ts'

const route = useRoute()
const movie = ref(new Movie())

onMounted(async () => {
  let domImg = document.querySelector('#poster') as HTMLImageElement
  domImg.crossOrigin = ''

  await axios
    .get(`/api/Movies/detail/${route.params.movieId}`)
    .then((res) => {
      if (res.data.status && res.data.status === '10000') {
        movie.value = res.data.data
      } else {
        ElMessage({
          message: `请求电影信息失败：${res.data.message}`,
          type: 'warning'
        })
      }
    })
    .catch(() => {
      ElMessage({
        message: `请求电影信息失败：网络错误`,
        type: 'warning'
      })
    })
})

const posterLoaded = () => {
  let domImg = document.querySelector('#poster') as HTMLImageElement
  if (domImg.complete) {
    let colorThief = new ColorThief()
    console.log(colorThief.getPalette(domImg, 2))
  } else {
    console.log('Not fully loaded')
  }
}
</script>

<template>
  <div class="content py-10">
    <el-card class="mx-10">
      <div class="bg-white pd-4 movie-poster">
        <img
          id="poster"
          src="https://cinemadb-1305284863.cos.accelerate.myqcloud.com/userdata/poster/72ff9a98a2fc4a6086d3b6d8a3005866.jpg"
          alt=""
          @load="posterLoaded"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.movie-poster {
  max-width: 280px;
}
</style>