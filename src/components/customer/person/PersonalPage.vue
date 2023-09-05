<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { ElCard, ElLoading, ElMessage } from 'element-plus'
import ColorThief from 'color-thief-ts'
import tinygradient from 'tinygradient'
import { useStore } from 'vuex'
import User from '@/models/User'

const route = useRoute()
const store = useStore()


const user=ref<User>()

const getCurrentUser=()=>{
    axios.get('/api/Customer').then((r)=>{
        if(r.data&&r.status===200){
            user.value.id=r.data.id
            user.value.displayName=r.data.name
            user.value.avatarUrl=r.data.avatarUrl
            user.email=r.data.email
            user.vip=r.data.vip.endDate
        }
    })
}


const sessions = ref<{ [key: string]: SessionDetail[] }>({})
const comments = ref<{ [key: string]: Comment }>({})
const commentIndex = ref<{ hotComments: string[]; newComments: string[] }>({
  hotComments: [],
  newComments: []
})
const interactions = ref<{ [key: string]: Interaction }>({})

onMounted(async () => {
  let domImg = document.querySelector('#avatar') as HTMLImageElement
  domImg.crossOrigin = ''

  const loading = ElLoading.service({
    lock: true,
    text: '加载中',
    fullscreen: true
  })

  let finished = 0
  const callFinish = () => {
    finished += 1
    if (finished >= 3) {
      loading.close()
    }
  }

  axios
    .get(`/api/Movies/detail/${route.params.movieId}`)
    .then((res) => {
      if (res.data.status && res.data.status === '10000') {
        movie.value = res.data.data

        // 预处理数据，把导演移到最前
        let directorIndex = movie.value.acts.findIndex((a) => a.role == '1')
        if (directorIndex >= 0) {
          let director = movie.value.acts.splice(directorIndex, 1)
          movie.value.acts.unshift(director[0])
        }
        callFinish()
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
        callFinish()
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
        let rawComments: CommentData = res.data.data
        rawComments.hotComments.forEach((v) => {
          if (!comments.value[v.commentId]) {
            comments.value[v.commentId] = v
          }
          commentIndex.value.hotComments.push(v.commentId)
        })
        rawComments.newComments.forEach((v) => {
          if (!comments.value[v.commentId]) {
            comments.value[v.commentId] = v
          }
          commentIndex.value.newComments.push(v.commentId)
        })

        if (store.state.currentUser.type === 'Customer') {
          let commentIdSet = Object.keys(comments.value)
          axios
            .post(`/api/Interaction/get`, Array.from(commentIdSet))
            .then((res) => {
              if (res.data.status && res.data.status === '10000') {
                let result: Interaction[] = res.data.data
                result.forEach((v) => {
                  if (!interactions.value[v.commentId]) {
                    interactions.value[v.commentId] = v
                  }
                })
              } else {
                ElMessage({
                  message: `请求评论交互信息失败：${res.data.message}`,
                  type: 'warning'
                })
              }
            })
            .catch(() => {
              ElMessage({
                message: `请求评论交互信息失败：网络错误`,
                type: 'warning'
              })
            })
        }
        callFinish()
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

const avatarCardBackground = ref('white')
const avatarCardFontColor = ref('white')

const avatarLoaded = () => {
  let domImg = document.querySelector('#avatar') as HTMLImageElement
  let colorThief = new ColorThief()
  let colors = colorThief.getPalette(domImg, 2)
  colors = [colors[0], colors[1]]
  let gradients = tinygradient(colors.map((v) => v.toString()))
  avatarCardBackground.value = gradients.css()
  getImageBrightness(domImg, (brightness) => {
    if (brightness > 155) {
      avatarCardFontColor.value = 'black'
    }
  })
}

const activeSessionDate = ref('0')

const router = useRouter()
const handleStaffDetail = (staffId: string) => {
  console.log("test")
  router.push(`/staff/${staffId}`)
}
const commentInteraction = (commentId: string, type: number) => {
  let backup: [Comment, Interaction | undefined] = [
    comments.value[commentId],
    interactions.value[commentId]
  ]
  if (!interactions.value[commentId]) {
    interactions.value[commentId] = new Interaction(commentId)
  }
  if (backup[1] && backup[1]?.type >= 0) {
    if (backup[1] && backup[1]?.type === 0) {
      comments.value[commentId].dislikeCount -= 1
    } else {
      comments.value[commentId].likeCount -= 1
    }
  }
  if (type === 1) {
    comments.value[commentId].likeCount += 1
  } else if (type === 0) {
    comments.value[commentId].dislikeCount += 1
  }
  interactions.value[commentId].type = type
  axios
    .post('/api/Interaction', interactions.value[commentId])
    .then((res) => {
      if (res.data.status && res.data.status === '10000') {
        /* empty */
      } else {
        ElMessage({
          message: `评论交互操作失败：${res.data.message}`,
          type: 'warning'
        })
        comments.value[commentId] = backup[0]
        if (backup[1]) {
          interactions.value[commentId] = backup[1]!
        } else {
          delete interactions.value[commentId]
        }
      }
    })
    .catch(() => {
      ElMessage({
        message: `评论交互操作失败：网络错误`,
        type: 'warning'
      })
      comments.value[commentId] = backup[0]
      if (backup[1]) {
        interactions.value[commentId] = backup[1]!
      } else {
        delete interactions.value[commentId]
      }
    })
}

const pickSessionsDialogOpen = ref(false)
</script>

<template>
  <div class="content py-10">
    <div class="flex w-full">
      <div class="grow" />
      <div style="width: 1200px;">
          <el-card class="mx-10 my-5 avatar-card">
            <div class="avatar-card-background" :style="`background: ${avatarCardBackground};`" />
            <div class="avatar-card-content flex">
              <div class="person-avatar">
                <img id="avatar" :src="user.avatarUrl ?? ''" alt="" @load="avatarLoaded" />
              </div>
              <div class="ml-10 py-5" :style="`color: ${avatarCardFontColor}`">
                <h1 class="text-4xl font-extrabold">{{ user.displayName }}</h1>
                <h2 class="my-3">观众评分：{{ movie.score ?? '暂无评分' }}</h2>
                <div class="my-10">
                  <el-button color="#FFA500" @click="pickSessionsDialogOpen = true">
                    <span class="m-5">选座购票</span>
                  </el-button>
                </div>
              </div>
            </div>
          </el-card>
          
      </div>
      <div class="grow" />
    </div>
  </div>
  <el-dialog v-model="pickSessionsDialogOpen" title="选择场次" width="800px" align-center>
    <MovieSessionsCard :sessions="sessions" v-model:active-session-date="activeSessionDate" />
  </el-dialog>
</template>

<style scoped lang="scss">
.person-avatar {
  max-width: 280px;
}

.avatar-card {
  position: relative;
  border: 0;
}

.avatar-card-background {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
}

.avatar-card-content {
  position: relative;
  z-index: 1;
}
</style>