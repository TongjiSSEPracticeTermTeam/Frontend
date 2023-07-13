<script setup lang="ts">
</script>

<template>
    <div class="content">
        <el-menu :default-active="activeIndex1" class="el-menu-demo" mode="horizontal" @select="handleSelect"
            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :ellipsis="false" style="height: 8vh;">
            <el-menu-item index="0" class="disabled-el-menu-item">{{ cinemaName }}</el-menu-item>
            <div class="flex-grow disabled-el-menu-item"></div>
            <el-menu-item index="1">排片管理</el-menu-item>
            <el-menu-item index="2">影厅管理</el-menu-item>
            <el-menu-item index="3" class="disabled-el-menu-item">登出</el-menu-item>
        </el-menu>
        <div class="common-layout">
            <el-container>
                <el-aside width="20vw">
                    <el-menu default-active="1" style="height: 92vh; background-color: rgba(105, 213, 211, 0.4)">
                        <el-scrollbar>
                            <el-menu-item index="1">
                                <div class="movie-item">
                                    <img
                                        src="https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0">
                                    <div class="movie-name">Movie 1</div>
                                </div>
                            </el-menu-item>
                            <el-menu-item index="2">
                                <div class="movie-item">
                                    <img
                                        src="https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0">
                                    <div class="movie-name">Movie 2</div>
                                </div>
                            </el-menu-item>
                            <el-menu-item index="3">
                                <div class="movie-item">
                                    <img
                                        src="https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0">
                                    <div class="movie-name">Movie 3</div>
                                </div>
                            </el-menu-item>
                            <el-menu-item index="4">
                                <div class="movie-item">
                                    <img
                                        src="https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0">
                                    <div class="movie-name">Movie 4</div>
                                </div>
                            </el-menu-item>
                        </el-scrollbar>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>Main</el-main>
                    <el-footer style=" height: 25vh;">
                        <el-scrollbar>
                            <div class="scrollbar-flex-content">
                                <div class="scrollbar-item">
                                    <img
                                        src="https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0">
                                    <div class="movie-name">Movie 4</div>
                                </div>
                                <div class="scrollbar-item">
                                    <img
                                        src="https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0">
                                    <div class="movie-name">Movie 4</div>
                                </div>
                                <div class="scrollbar-item">
                                    <img
                                        src="https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0">
                                    <div class="movie-name">Movie 4</div>
                                </div>
                                <div class="scrollbar-item">
                                    <img
                                        src="https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0">
                                    <div class="movie-name">Movie 4</div>
                                </div>
                                <div class="scrollbar-item">
                                    <img
                                        src="https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0">
                                    <div class="movie-name">Movie 4</div>
                                </div>
                                <div class="scrollbar-item">
                                    <img
                                        src="https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0">
                                    <div class="movie-name">Movie 4</div>
                                </div>
                            </div>
                        </el-scrollbar>
                    </el-footer>
                </el-container>
            </el-container>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data: () => {
        return {
            activeIndex1: '1',
            cinemaName: '我的影院名',
            curIndex: 1,
            debounceTimeout: null,
            hallClass: ['bg-purple'],
            isLeft: true,
        }
    },
    methods: {
        logout() {

        },
        handleSelect(key: number) {
            this.curIndex = key;
            this.isLeft = !this.isLeft;
        },
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
    height: 20vh;
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
</style>
