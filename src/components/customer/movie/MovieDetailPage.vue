<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { type MovieDetail } from '@/models/QuickType/MovieDetail'
import { useRoute } from 'vue-router'
import { ElCard, ElMessage } from 'element-plus'
import ColorThief from 'color-thief-ts'
import tinygradient from 'tinygradient'
import moment from 'moment'
import type { SessionDetail } from '@/models/QuickType/SessionDetail'
import CommentCard from '@/components/customer/comment/CommentCard.vue'
import type { CommentData } from '@/models/QuickType/CommentData'

const route = useRoute()
const movie = ref<MovieDetail>({
  movieId: '',
  name: '',
  duration: '',
  instruction: '',
  score: 0,
  postUrl: '',
  tags: '',
  releaseDate: new Date(),
  removalDate: new Date(),
  acts: [],
  comments: [],
  sessions: []
})
const sessions = ref<{ [key: string]: SessionDetail[] }>({})
const comments = ref<CommentData>({ hotComments: [], newComments: [] })

onMounted(async () => {
  let domImg = document.querySelector('#poster') as HTMLImageElement
  domImg.crossOrigin = ''

  axios
    .get(`/api/Movies/detail/${route.params.movieId}`)
    .then((res) => {
      if (res.data.status && res.data.status === '10000') {
        movie.value = res.data.data

        // 预处理数据，把导演移到最前
        let directorIndex = movie.value.acts.findIndex((a) => a.role == '导演')
        if (directorIndex >= 0) {
          let director = movie.value.acts.splice(directorIndex, 1)
          movie.value.acts.unshift(director[0])
        }
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

  axios
    .get(`/api/Session/movie/${route.params.movieId}`)
    .then((res) => {
      if (res.data.status && res.data.status === '10000') {
        sessions.value = res.data.data
        activeSessionDate.value = Object.keys(sessions.value)[0]
      } else {
        ElMessage({
          message: `请求排片信息失败：${res.data.message}`,
          type: 'warning'
        })
      }
    })
    .catch(() => {
      ElMessage({
        message: `请求排片信息失败：网络错误`,
        type: 'warning'
      })
    })

  axios
    .get(`/api/Comment/inMovieDetail/${route.params.movieId}`)
    .then((res) => {
      if (res.data.status && res.data.status === '10000') {
        comments.value = res.data.data
      } else {
        ElMessage({
          message: `请求评论信息失败：${res.data.message}`,
          type: 'warning'
        })
      }
    })
    .catch(() => {
      ElMessage({
        message: `请求评论信息失败：网络错误`,
        type: 'warning'
      })
    })
})

function getImageBrightness(imgElement: HTMLImageElement, callback: (brightness: number) => void) {
  const canvas = document.createElement('canvas')
  canvas.width = imgElement.width
  canvas.height = imgElement.height

  const ctx = canvas.getContext('2d')!
  ctx.drawImage(imgElement, 0, 0)

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data
  let r, g, b, avg

  let colorSum = 0
  for (let x = 0, len = data.length; x < len; x += 4) {
    r = data[x]
    g = data[x + 1]
    b = data[x + 2]

    avg = Math.floor((r + g + b) / 3)
    colorSum += avg
  }

  const brightness = Math.floor(colorSum / (imgElement.width * imgElement.height))
  callback(brightness)
}

const posterCardBackground = ref('white')
const posterCardFontColor = ref('white')

const posterLoaded = () => {
  let domImg = document.querySelector('#poster') as HTMLImageElement
  let colorThief = new ColorThief()
  let colors = colorThief.getPalette(domImg, 2)
  colors = [colors[0], colors[1]]
  let gradients = tinygradient(colors.map((v) => v.toString()))
  posterCardBackground.value = gradients.css()
  getImageBrightness(domImg, (brightness) => {
    if (brightness > 155) {
      posterCardFontColor.value = 'black'
    }
  })
}

const activeSessionDate = ref('0')
</script>

<template>
  <div class="content py-10">
    <div class="flex w-full">
      <div class="grow" />
      <div>
        <el-space direction="vertical" alignment="normal" size="large" fill>
          <el-card class="mx-10 poster-card">
            <div class="poster-card-background" :style="`background: ${posterCardBackground};`" />
            <div class="poster-card-content flex">
              <div class="movie-poster">
                <img id="poster" :src="movie.postUrl ?? ''" alt="" @load="posterLoaded" />
              </div>
              <div class="ml-10 py-5" :style="`color: ${posterCardFontColor}`">
                <h1 class="text-4xl font-extrabold">{{ movie.name }}</h1>
                <h2 class="mt-5">时长：{{ movie.duration }}分钟</h2>
                <h2 class="mt-1 mb-5" v-if="movie.acts.length > 0 && movie.acts[0].role === '导演'">
                  导演：{{ movie.acts[0].staff.name }}
                </h2>
                <h2
                  class="my-3"
                  v-html="`简介：<br> ${movie.instruction?.replace('\n', '<br/>')} `"
                />
                <h2 class="my-3">观众评分：{{ movie.score ?? '暂无评分' }}</h2>
                <div class="my-10">
                  <el-button color="#FFA500"><span class="m-5">选座购票</span></el-button>
                </div>
              </div>
            </div>
          </el-card>
          <div>
            <el-card class="mx-10 px-5">
              <div class="flex items-center">
                <h2 class="text-red-500 text-2xl font-bold">演职员</h2>
              </div>
              <div class="my-5 pt-1">
                <el-space size="large" wrap>
                  <div v-for="act in movie.acts" :key="act.staffId">
                    <el-image
                      :src="act.staff.imageUrl"
                      fit="contain"
                      style="height: 200px; width: 140px"
                    />
                    <div class="text-center">
                      <h3>{{ act.staff.name }}</h3>
                      <h3 class="text-gray-400">{{ act.role }}</h3>
                    </div>
                  </div>
                </el-space>
              </div>
            </el-card>
          </div>
          <el-card class="mx-10 px-5">
            <div class="flex items-center">
              <h2 class="text-red-500 text-2xl font-bold">近期排片</h2>
              <div class="grow" />
              <!-- <el-button link>全部</el-button> -->
              <!--这个是假按钮-->
            </div>
            <div class="my-5">
              <el-tabs v-model="activeSessionDate">
                <el-tab-pane
                  v-for="(dt, i) in sessions"
                  :key="i"
                  :label="moment(i).format('MM-DD')"
                  :name="i"
                >
                  <div v-for="(s, j) in dt" :key="j" class="pt-2">
                    <div class="flex items-center">
                      <h3 class="text-xl">{{ moment(s.startTime).format('HH:mm') }}</h3>
                      <h3 class="ml-5">{{ s.hallLocatedAt.cinemaBelongTo.name }}</h3>
                      <h3 class="ml-5">{{ parseInt(s.hallLocatedAt.id) }}号厅</h3>
                      <h3 class="ml-5">{{ s.language }}</h3>
                      <h3 class="ml-5">{{ s.dimesion }}</h3>
                      <div class="grow" />
                      <h3 class="text-xl">￥{{ s.price }}</h3>
                      <el-button class="ml-5" type="primary">购票</el-button>
                    </div>
                    <el-divider />
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-card>
          <el-card class="mx-10 px-5">
            <div class="flex items-center">
              <h2 class="text-red-500 text-2xl font-bold">评论</h2>
              <div class="grow" />
              <el-button link>全部</el-button>
            </div>
            <div class="my-5">
              <div>
                <h3 class="text-xl font-bold">最热评论</h3>
                <div class="w-full my-5">
                  <CommentCard
                    class="mb-5"
                    v-for="c in comments.hotComments"
                    :key="c"
                    :comment="c"
                  />
                </div>
              </div>
            </div>
            <div class="my-5">
              <div>
                <h3 class="text-xl font-bold">最新评论</h3>
                <div class="w-full my-5">
                  <CommentCard
                    class="mb-5"
                    v-for="c in comments.newComments"
                    :key="c"
                    :comment="c"
                  />
                </div>
              </div>
            </div>
          </el-card>
        </el-space>
      </div>
      <div class="grow" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.movie-poster {
  max-width: 280px;
}

.poster-card {
  position: relative;
  border: 0;
}

.poster-card-background {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
}

.poster-card-content {
  position: relative;
  z-index: 1;
}
</style>