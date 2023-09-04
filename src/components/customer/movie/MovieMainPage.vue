<script setup lang="ts">
import {onMounted, ref, computed, watch} from "vue";
import tagSelect from "@/components/customer/movie/AttributeSelect.vue"
import type Movie from "@/models/Movie";
import axios, {all} from "axios";
import MovieCard from "@/components/customer/movie/MovieCard.vue";

const tags=ref<string[]>([])
const years=ref<string[]>([])
years.value=['2023','2022','2021','2020','2019','2018','2017','2016','2015']
const selectedTags=ref([])
const selectedYears=ref([])

const movies=ref<Movie[]>([])
const currentClass=ref('1') //表示当前处于正在热映还是即将上映,1表示正在热映，2表示即将上映
const onPlayMovies=ref<Movie[]>([])
const commingSoonMovies=ref<Movie[]>([])
const currentPage=ref(1)
const pageSize=ref(6) //一页展示的电影数量

const start = computed(() => (currentPage.value - 1) * pageSize.value);
const paginatedMovies = computed(() => movies.value.slice(start.value, start.value + pageSize.value));
const totalMovies = computed(() => movies.value.length);

const tagSelected=(t)=>{
  selectedTags.value=t
  updateMovies()
}


const yearSelected=(t)=>{
  selectedYears.value=t
  updateMoviesByYear()
}
const getAllTags=()=>{
  axios.get('/api/Movies/tags/getAllTags').then((r)=>{
    if (r.data&&r.data.status==='10000'){
      tags.value=r.data.data
    }
  })
}

const initMovies=()=>{
  let allMovies=new Array<Movie>()
  axios.get('/api/Movies/tags').then((r)=>{
    if(r.data&&r.data.status==='10000'){
      allMovies=r.data.data
      if(allMovies.length){
        allMovies.forEach((movie)=>{
          if(isOnPlay(movie.releaseDate,movie.removalDate)){
            onPlayMovies.value.push(movie)
          }else if(isCommingSoon(movie.releaseDate)){
            commingSoonMovies.value.push(movie)
          }
        })
        if(currentClass.value==='1'){
          movies.value=onPlayMovies.value
        }else if(currentClass.value==='2'){
          movies.value=commingSoonMovies.value
        }
      }
    }
  })


}

const updateMoviesByTag=()=>{
  // let params=new URLSearchParams()
  // selectedTags.value.forEach((v)=>{
  //   params.append('tags',v)
  // })
  // axios.get('/api/Movies/tags',{
  //   params: params
  // }).then((r)=>{
  //   if(r.data&&r.data.status==='10000'){
  //     movies.value=r.data.data
  //   }
  // })
  if(currentClass.value==='1'){
    movies.value=onPlayMovies.value.filter((movie)=>{
      let flag=true
      selectedTags.value.forEach((tag)=>{
        if(!movie.tags?.includes(tag)){
          flag=false
        }
      })
      return flag
    })
  }else if(currentClass.value==='2'){
    movies.value=commingSoonMovies.value.filter((movie)=>{
      let flag=true
      selectedTags.value.forEach((tag)=>{
        if(!movie.tags?.includes(tag)){
          flag=false
        }
      })
      return flag
    })
  }
}

const isOnPlay=(releaseDate:string|null,removalDate:string|null)=>{
  if(releaseDate===null||removalDate===null){
    return false
  }
  let now=new Date()
  let release=new Date(releaseDate)
  let removal=new Date(removalDate)
  return (now.getTime()>release.getTime())&&(now.getTime()<removal.getTime())
}

const isCommingSoon=(releaseDate:string|null)=>{
  if(releaseDate===null){
    return false
  }
  let now=new Date()
  let release=new Date(releaseDate)
  return (now.getTime()<release.getTime())
}

const handleSelect=(index:string)=>{
  if(index==='1'){
    movies.value=onPlayMovies.value
    currentPage.value=1
  }else if(index==='2'){
    movies.value=commingSoonMovies.value
    currentPage.value=1
  }
  currentClass.value=index
  updateMoviesByTag()
}

const updateMoviesByYear=()=>{
  movies.value=movies.value.filter((movie)=>{
    console.log(movie.releaseDate.substring(0,4))
    return selectedYears.value.includes(movie.releaseDate.substring(0,4))
  })
}
const updateMovies=()=>{
  updateMoviesByTag()
  // updateMoviesByYear()
}

onMounted(()=>{
  getAllTags()
  initMovies()
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
              <el-menu mode="horizontal" @select="handleSelect" default-active="1">
                <el-menu-item index="1">正在热映</el-menu-item>
                <el-menu-item index="2">即将上映</el-menu-item>
              </el-menu>
              <tagSelect @selected="tagSelected" :label="'类型'" :tags="tags" ></tagSelect>
              <!-- <tagSelect @selected="yearSelected" :label="'年份'" :tags="years" ></tagSelect> -->
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