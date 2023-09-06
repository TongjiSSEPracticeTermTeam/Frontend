<script setup lang="ts">
import axios from 'axios';
import { ElMessageBox, ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import MovieInHall from '@/models/MovieInHall'
import Movie from '@/models/Movie';
let movieInHall = ref(new Array<MovieInHall>())
let movieDetail = ref(new Movie)
let selectedMovieId = ref('000010')
let value = ref('')

const price = ref(1)
const handleChange = (value: number) => {
  console.log(value)
}

const updateMoviesInHall = () => {
  axios
    .get(`/api/Movies/noremoval`)
    .then((res) => {
      if (res.data && res.data.status && res.data.status === '10000') {
        movieInHall.value = res.data.data
        console.log(res.data.data)
        console.log(movieInHall.value)
      }
      else {
        console.log(res.data)
        ElMessage({
          type: 'error',
          message: '获取影院内所有电影信息失败'
        })
      }
    })
    .catch((err) => {
      console.log(err)
      ElMessageBox.alert('数据加载失败！', '错误', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
        callback: () => {
          ElMessage.error('数据加载错误')
        }
      })
    })
}
const updateMovieDetail = (id: string) => {
  selectedMovieId.value = id;
  axios
    .get(`/api/Movies/detail/${id}`)
    .then((res) => {
      if (res.data && res.data.status && res.data.status === '10000') {
        movieDetail.value = res.data.data
        console.log(res.data.data)
        console.log(movieInHall.value)
      }
      else {
        console.log(res.data)
        ElMessage({
          type: 'error',
          message: '获取影院内所有电影信息失败'
        })
      }
    })
    .catch((err) => {
      console.log(err)
      ElMessageBox.alert('数据加载失败！', '错误', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
        callback: () => {
          ElMessage.error('数据加载错误')
        }
      })
    })
}

onMounted(() => {
  updateMoviesInHall()
});
</script>

<template>
  <h1 class="text-2xl font-bold">排片管理</h1>
  <el-divider />

  <el-container style="height: 80vh">

    <el-aside width="250px">
      <el-scrollbar>
        <el-menu>
          <el-menu-item-group>
            <template #title>
              <span style="font-size: 18px;">电影列表</span>
            </template>
            <el-menu-item v-for="movie in movieInHall" :key="movie.movieId"
              :class="{ 'highlighted': selectedMovieId === movie.movieId }" @click="updateMovieDetail(movie.movieId)">
              <div class="movie-item">
                <img :src="movie.postUrl" />
                <div class="movie-name">{{ movie.name }}</div>
              </div>
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="height: 240px;">

        <el-container>
          <el-aside style="width: auto; height: 300px;">
            <br>
            <h3 class="text-xl">电影排片</h3>
            <div class="demo-datetime-picker">
              <div class="block">
                电影开始时间&nbsp;&nbsp;
                <el-date-picker v-model="value" type="datetime" placeholder="请选择日期和时间" size="large"
                  style="width: 220px;" />
                <br>
                &nbsp;&nbsp;电影影厅选择
                <el-select v-model="value" class="m-2" placeholder="请选择影厅" size="large" style="width: 220px;">
                  <el-option v-for="item in halls" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <br>
                
                  电影价格&nbsp;&nbsp;
    <el-input-number v-model="price" :precision="2" :step="0.1" :min="1" :max="1000" @change="handleChange" style="width: 146px;" />
    &nbsp;元&nbsp;&nbsp;&nbsp;&nbsp;
    <br>
                <div style="text-align: right;">
                  <el-button type="primary">确定</el-button>&nbsp;&nbsp;
                </div>
              </div>
            </div>
          </el-aside>

          <el-main>
            <h3 class="text-xl">&nbsp;&nbsp;&nbsp;&nbsp;电影相关数据</h3>
            <br>
            <el-row justify="center">
              <el-col :span="10" class="statistic_bgcolor">
                <el-statistic class="pt10 pb10 pl10 pr10" title="电影名" :value="movieDetail.name" />
              </el-col>

              <el-col :span="10" class="statistic_bgcolor">
                <el-statistic class="pt10 pb10 pl10 pr10" title="时长" :value="movieDetail.duration+' 分钟'" />
              </el-col>
            </el-row>
            <br>
            <el-row justify="center">
              <el-col :span="10" class="statistic_bgcolor">
                <el-statistic class="pt10 pb10 pl10 pr10" title="评分" :value="movieDetail.score" />
              </el-col>

              <el-col :span="10" class="statistic_bgcolor">
                <el-statistic class="pt10 pb10 pl10 pr10" title="标签" :value="movieDetail.tags" />
              </el-col>
            </el-row>
            <br>

          </el-main>

        </el-container>
      </el-header>
      <el-main style="width: auto;">
        <h3 class="text-xl">电影简介</h3>
        <div style="margin: 10px;">{{ movieDetail.instruction }}</div>
        
      </el-main>

      <el-footer style=" height: 250px;">
        <el-select v-model="value" class="m-2" placeholder="请选择影厅" size="large">
          <el-option v-for="item in halls" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-scrollbar>
          <div class="scrollbar-flex-content">
            <div v-for="time in times" class="scrollbar-item">
              <img :src="time.imageUrl">
                <div class="movie-name">{{ time.name }}</div>
                <div class="movie-starttime">{{ time.startTime.toLocaleString() }}</div>
            </div>
          </div>
        </el-scrollbar>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script lang = "ts" >

export default {
  data: () => {
    return {
      times: [
        {
          imageUrl:
            'https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0',
          name: 'Movie 1',
          startTime: new Date("2023-08-31T00:00:00"),
        },
        {
          imageUrl:
            'https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0',
          name: 'Movie 2',
          startTime: new Date("2023-08-31T00:00:00"),
        },
      ],
      selectedMovie: "",
      halls: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
      duration: "这么长",
      tags: "tag tag tag",
      introduction: "jieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjiejieanjie",
      score: 10,
      name: "aobenhaim o",
    }
  },
  methods: {
    
  },
  mounted() {

  },
  watch: {

  },
  computed: {

  },

}
</script>

<style>
.scrollbar-flex-content {
  display: flex;
}

.scrollbar-item {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  text-align: center;
  margin: 10px;
}

.scrollbar-item img {
  height: 17vh;
}

/* 侧边栏 */
.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .el-menu-item {
  padding: 0;
  margin-left: 12px;
  margin-right: 18px;
  height: auto;
}

.movie-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.movie-item img {
  width: 100%;
  margin-bottom: 5px;
}

.movie-name {
  line-height: normal;
  text-align: center;
}

.disabled-el-menu-item {
  pointer-events: none;
  /* 禁用鼠标事件 */
  cursor: default;
  /* 修改鼠标样式为默认 */
}

.disabled-el-menu-item a {
  color: inherit;
  /* 保持原本的颜色 */
  text-decoration: none;
  /* 去掉链接下划线样式 */
}

.highlighted {
  background-color: #c7deed;
  /* 自定义被选中项的背景颜色 */
}
</style>

<style scoped>
.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-datetime-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-datetime-picker .block:last-child {
  border-right: none;
}

.demo-datetime-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>