<script setup lang="ts">
import {onMounted, ref, computed, watch} from "vue";
import tagSelect from "@/components/customer/movie/AttributeSelect.vue"
import type Movie from "@/models/Movie";
import axios from "axios";
import MovieCard from "@/components/customer/movie/MovieCard.vue";

const tags=ref<string[]>([])
const years=ref<string[]>([])
years.value=['2023','2022','2021','2020','2019']
const selectedTags=ref([])
const selectedYears=ref([])

const movies=ref<Movie[]>([])
const currentPage=ref(1)
const pageSize=ref(6) //一页展示的电影数量

const start = computed(() => (currentPage.value - 1) * pageSize.value);
const paginatedMovies = computed(() => movies.value.slice(start.value, start.value + pageSize.value));
const totalMovies = computed(() => movies.value.length);

const tagSelected=(t)=>{
  selectedTags.value=t
  console.log(selectedTags.value)
  updateMovies()
}

watch(paginatedMovies,(newMovies)=>{
  console.log(`new page movies:${newMovies}`)
})

const yearSelected=(t)=>{
  selectedYears.value=t
}
const getAllTags=()=>{
  axios.get('/api/Movies/tags/getAllTags').then((r)=>{
    if (r.data&&r.data.status==='10000'){
      tags.value=r.data.data
    }
  })
}

const updateMovies=()=>{
  let params=new URLSearchParams()
  selectedTags.value.forEach((v)=>{
    params.append('tags',v)
  })
  axios.get('/api/Movies/tags',{
    params: params
  }).then((r)=>{
    if(r.data&&r.data.status==='10000'){
      movies.value=r.data.data
    }
  })
}

onMounted(()=>{
  getAllTags()
  updateMovies()
})
</script>

<template>
  <div class="content">
    <div class="py-5" style="">
      <div style="flex-grow: 1" />
      <div class="mx-5" style="">
        <el-row >
          <el-col :span="3"/>
          <el-col :span="18" class="translucent-card">
            <el-card>
              <tagSelect @selected="tagSelected" :label="'类型'" :tags="tags" ></tagSelect>
              <tagSelect @selected="yearSelected" :label="'年份'" :tags="years" ></tagSelect>
            </el-card>
          </el-col>
          <el-col :span="3"/>
        </el-row>
      </div>
      <div class="m-5">
        <el-row>
          <el-col :span="3"/>
          <el-col :span="18">
            <el-card class="translucent-card">
              <el-space wrap>
                <div v-for="(movie, index) in paginatedMovies" :key="index">
                  <div class="my-3">
                    <MovieCard :movie="movie" />
                    <div class="mt-3 text-center">{{ movie.name }}</div>
                  </div>
                </div>
              </el-space>
              <el-col style="display:flex;justify-content:center;">
                <el-pagination
                    layout="prev,pager,next"
                    :total="movies.length"
                    v-model:page-size="pageSize"
                    v-model:current-page="currentPage"
                    background
                />
              </el-col>
            </el-card>
          </el-col>

          <el-col :span="3"/>
        </el-row>


      </div>
    </div>
  </div>

</template>

<style scoped>

</style>