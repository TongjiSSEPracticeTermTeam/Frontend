<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { ElCard, ElLoading, ElMessage } from 'element-plus'
import ColorThief from 'color-thief-ts'
import tinygradient from 'tinygradient'
import { useStore } from 'vuex'
import User from '@/models/User'

import UploadImage from '@/helpers/UploadImage.vue'
import type { FormInstance, FormRules } from 'element-plus'

const store = useStore()



const props = defineProps({
  user: {
    type: User,
    required: true
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



let detailPerson = ref(false)
let editStatus = ref(false)
const savingDetail = ref(false)
let formRef = ref<FormInstance | null>(null)


const handleDrawerClose = () => {
  if (editStatus.value) {
    ElMessageBox.confirm('有未保存的数据，确定要退出编辑吗？', 'Warning', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        formRef.value?.clearValidate()
        detailPerson.value = false
        editStatus.value = false
      })
      .catch(() => {
      })
  } else {
    detailPerson.value = false
    editStatus.value = false
  }
}

const saveDetail = async () => {
}

</script>

<template>
  <el-card shadow="hover" class="avatar-card" @click="()=>{detailPerson = true}">
    <div class="avatar-card-background" :style="`background: ${avatarCardBackground};`" />
    <div class="avatar-card-content flex" style="display: flex;align-items: center;">
      <div class="person-avatar">
        <img id="avatar"
          :src="'https://cinemadb-1305284863.cos.accelerate.myqcloud.com/userdata/poster/27d257e3ba7c4d3b81ad144f9b304975.jpg'"
          alt="" @load="avatarLoaded" />
      </div>
      <div class="ml-10" :style="`display: flex; flex-direction:column; color: ${avatarCardFontColor}`">
        <h1 class="text-4xl font-extrabold">{{ user.displayName }}</h1>
        <h3 class="text-1xl font-light my-2.5">欢迎来到同济院线</h3>
      </div>
    </div>
  </el-card>

  <el-drawer v-model="detailPerson" title="个人主页" direction="rtl" :before-close="handleDrawerClose" style="min-width: 500px">
    <el-form :model="user" label-width="120px" :rules="rules" ref="formRef">
      
      <el-form-item label="头像" class="w-full">
        <el-space direction="vertical" alignment="normal" wrap>
          <el-input
            v-model="user.avatarUrl"
            :rows="3"
            type="textarea"
            style="width: 350px"
            @change="editStatus = true"
          />
          <el-image
            :src="user.avatarUrl"
            :fit="'contain'"
            style="height: 300px; width: 300px"
          >
            <template #error>
              <el-icon>
                <Picture />
              </el-icon>
            </template>
          </el-image>
          <UploadImage
            api-path="/api/Customer/poster"
            @Success="(Url: string) => {
              user.avatarUrl = Url
              editStatus = true
            }"
          />
        </el-space>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input  v-model="user.displayName" @change="()=>{editStatus=true}"/>
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="user.email" @change="()=>{editStatus=true}"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveDetail" v-loading="savingDetail">保存</el-button>
        <el-button @click="handleDrawerClose">取消</el-button>
      </el-form-item>

    </el-form>
  </el-drawer>

  
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