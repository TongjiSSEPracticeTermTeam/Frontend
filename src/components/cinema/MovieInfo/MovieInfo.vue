<script setup lang="ts">
</script>

<template>
  <h1 class="text-2xl font-bold">排片管理</h1>
  <el-divider />

  <el-container class="layout-container-demo" style="height: 80vh">

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
      <el-main>Main</el-main>
      <el-footer style=" height: 170px;">
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

<script lang="ts">
export default {
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
        // 其他电影信息...
      ],
      selectedMovie: ""
    }
  },
  methods: {
    selectMovie(movieId: string) {
      this.selectedMovie = movieId;
    }
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

.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.highlighted {
  background-color: #c7deed;
  /* 自定义被选中项的背景颜色 */
}</style>
