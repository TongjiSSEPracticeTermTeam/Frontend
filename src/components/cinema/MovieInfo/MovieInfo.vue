<script setup lang="ts">
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
            <el-menu-item v-for="movie in movies" :key="movie.id" :index="movie.id"
              :class="{ 'highlighted': selectedMovie === movie.id }" @click="selectMovie(movie.id)">
              <div class="movie-item">
                <img :src="movie.image" />
                <div class="movie-name">{{ movie.name }}</div>
              </div>
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-main>

        <el-container>
          <el-aside style="width: auto; height: 300px;">
            <el-container>
              <el-main>
                <!-- <br>
                <el-row justify="center">
                  <el-col :span="10" class="statistic_bgcolor">
                    <el-statistic class="pt10 pb10 pl10 pr10" title="电影时长" :value="duration" />
                  </el-col>

                  <el-col :span="10" class="statistic_bgcolor">
                    <el-statistic class="pt10 pb10 pl10 pr10" title="标签" :value="tags" />
                  </el-col>
                </el-row>
                <br>
                <el-row justify="center">
                  <el-col :span="10" class="statistic_bgcolor">
                    <el-statistic class="pt10 pb10 pl10 pr10" title="影院上座率" :value="occupancyRate" />
                  </el-col>

                  <el-col :span="10" class="statistic_bgcolor">
                    <el-statistic class="pt10 pb10 pl10 pr10" title="票房" :value="ticketSales" />
                  </el-col>
                </el-row>
                <br> -->
              </el-main>
              <el-footer>
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
                    <div style="text-align: right;">
                      <el-button type="primary">确定</el-button>&nbsp;&nbsp;
                    </div>
                  </div>
                </div>
              </el-footer>
            </el-container>
          </el-aside>

          <el-main>
            <br>
            <h3 class="text-xl">&nbsp;&nbsp;&nbsp;&nbsp;电影相关数据</h3>
            <br>
            <el-row justify="center">
              <el-col :span="10" class="statistic_bgcolor">
                <el-statistic class="pt10 pb10 pl10 pr10" title="电影时长" :value="duration" />
              </el-col>

              <el-col :span="10" class="statistic_bgcolor">
                <el-statistic class="pt10 pb10 pl10 pr10" title="标签" :value="tags" />
              </el-col>
            </el-row>
            <br>
            <el-row justify="center">
              <el-col :span="10" class="statistic_bgcolor">
                <el-statistic class="pt10 pb10 pl10 pr10" title="影院上座率" :value="occupancyRate" />
              </el-col>

              <el-col :span="10" class="statistic_bgcolor">
                <el-statistic class="pt10 pb10 pl10 pr10" title="票房" :value="ticketSales" />
              </el-col>
            </el-row>
            <br>
          </el-main>

        </el-container>
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
            </div>
          </div>
        </el-scrollbar>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
</script>

<script script lang = "ts" >
// import echarts from 'echarts';
// import VueECharts from 'vue-echarts'; // 引入 VueECharts 组件

export default {
  // components: {
  //   VueECharts, // 注册 VueECharts 组件
  // },
  data: () => {
    return {
      movies: [
        {
          id: "1",
          name: 'Movie 1',
          image: 'https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0'
        },
        {
          id: "2",
          name: 'Movie 2',
          image: 'https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0'
        },
        {
          id: "3",
          name: 'Movie 3',
          image: 'https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0'
        },
        {
          id: "4",
          name: 'Movie 4',
          image: 'https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0'
        }
      ],
      times: [
        {
          imageUrl:
            'https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0',
          name: 'Movie 1'
        },
        {
          imageUrl:
            'https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0',
          name: 'Movie 2'
        },
        {
          imageUrl:
            'https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0',
          name: 'Movie 2'
        },
        {
          imageUrl:
            'https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0',
          name: 'Movie 2'
        },
        {
          imageUrl:
            'https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0',
          name: 'Movie 2'
        },
        {
          imageUrl:
            'https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0',
          name: 'Movie 2'
        },
        {
          imageUrl:
            'https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0',
          name: 'Movie 2'
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
      occupancyRate: "这么da",
      ticketSales: 1,
    }
  },
  methods: {
    selectMovie(movieId: string) {
      this.selectedMovie = movieId;
    }
  },
  mounted() {
    // 设置初始选中第一个电影
    this.selectedMovie = this.movies[0].id;
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
  height: 15vh;
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