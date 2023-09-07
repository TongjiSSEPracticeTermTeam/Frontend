<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import tagSelect from '@/components/customer/movie/AttributeSelect.vue'
import axios from 'axios'
import type Cinema from '@/models/Cinema'
import CinemaCard from './CinemaCard.vue'

const tags = ref<string[]>([])
const selectedTags = ref<string[]>([])

const cinemas = ref<Cinema[]>([])
const allCinemas = ref<Cinema[]>([])
const currentPage = ref(1)
const pageSize = ref(10) //一页展示的影院数量

const start = computed(() => (currentPage.value - 1) * pageSize.value)
const paginatedCinemas = computed(() =>
  cinemas.value.slice(start.value, start.value + pageSize.value)
)

const searchText = ref('')

const tagSelected = (t: string[]) => {
  selectedTags.value = t
  updateCinemasByTag()
}

const getAllTags = () => {
  axios.get('/api/Cinema/features').then((r) => {
    if (r.data && r.data.status === '10000') {
      tags.value = r.data.data
    }
  })
}

const initCinemas = () => {
  axios.get('/api/Cinema/all').then((r) => {
    if (r.data && r.data.status && r.data.status === '10000') {
      cinemas.value = r.data.data
      allCinemas.value = r.data.data
      console.log(allCinemas.value[0])
    }
  })
}

const updateCinemasByTag = () => {
  console.log(cinemas.value)
  cinemas.value = allCinemas.value.filter((cinema) => {
    let flag = true
    selectedTags.value.forEach((tag) => {
      if (!cinema.feature.includes(tag)) {
        flag = false
      }
    })
    return flag
  })
}

const updateCinemasBySearch = () => {
  cinemas.value = allCinemas.value.filter((cinema) => {
    return cinema.name.includes(searchText.value)
  })
  cinemas.value = cinemas.value.filter((cinema) => {
    let flag = true
    selectedTags.value.forEach((tag) => {
      if (!cinema.feature.includes(tag)) {
        flag = false
      }
    })
    return flag
  })
}

onMounted(() => {
  initCinemas()
  getAllTags()
})
</script>

<template>
  <div class="content">
    <div class="flex">
      <div class="grow" />
      <div class="m-5" style="width: 1024px">
        <el-card>
          <tagSelect @selected="tagSelected" :label="'类型'" :tags="tags"></tagSelect>
        </el-card>
        <el-card class="translucent-card my-5">
          <el-row>
            <el-col :span="14" />
            <el-col :span="7">
              <!-- 搜索框 -->
              <el-input placeholder="请搜索影院名称" v-model="searchText" class="mx-4">
                <template #prefix>
                  <el-icon class="el-input__icon"><search /></el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" class="ml-10" @click="updateCinemasBySearch"
                >搜索</el-button
              >
            </el-col>
          </el-row>
          <el-space wrap>
            <div v-for="(cinema, index) in paginatedCinemas" :key="index">
              <div class="my-3">
                <CinemaCard :cinema="cinema" />
                <div class="mt-3 text-center">{{ cinema.name }}</div>
              </div>
            </div>
          </el-space>
          <el-col style="display: flex; justify-content: center">
            <el-pagination
              layout="prev,pager,next"
              :total="cinemas.length"
              v-model:page-size="pageSize"
              v-model:current-page="currentPage"
              background
            />
          </el-col>
        </el-card>
      </div>
      <div class="grow" />
    </div>
  </div>
</template>

<style scoped></style>
