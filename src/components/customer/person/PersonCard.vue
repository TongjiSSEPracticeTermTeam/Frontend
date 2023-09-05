<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { ElCard, ElLoading, ElMessage } from 'element-plus'
import ColorThief from 'color-thief-ts'
import tinygradient from 'tinygradient'
import { useStore } from 'vuex'
import User from '@/models/User'

const store = useStore()



const props=defineProps({
  user:{
    type:User,
    required:true
  }
})


onMounted(async () => {
  let domImg = document.querySelector('#avatar') as HTMLImageElement
  domImg.crossOrigin = ''

  // const loading = ElLoading.service({
  //   lock: true,
  //   text: '加载中',
  //   fullscreen: true
  // })

  // let finished = 0
  // const callFinish = () => {
  //   finished += 1
  //   if (finished >= 1) {
  //     loading.close()
  //   }
  // }
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
</script>

<template>
    <el-card shadow="hover" class="avatar-card">
        <div class="avatar-card-background" :style="`background: ${avatarCardBackground};`" />
            <div class="avatar-card-content flex" style="display: flex;align-items: center;">
                  <div class="person-avatar">
                      <img id="avatar" :src="'https://cinemadb-1305284863.cos.accelerate.myqcloud.com/userdata/poster/27d257e3ba7c4d3b81ad144f9b304975.jpg'" alt="" @load="avatarLoaded" />
                  </div>
                  <div class="ml-10" :style="`display: flex; flex-direction:column; color: ${avatarCardFontColor}`">
                    <h1 class="text-4xl font-extrabold">{{ user.displayName }}</h1>
                    <h3 class="text-1xl font-light my-2.5">欢迎来到同济院线</h3>
                  </div>
            </div>
    </el-card>
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

#avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
</style>