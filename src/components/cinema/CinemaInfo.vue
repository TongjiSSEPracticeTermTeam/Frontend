<script setup lang="ts">
</script>

<template>
    <div class="content">
        <div class="line"></div>
        <el-menu :default-active="activeIndex1" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :ellipsis="false">
            
            <el-menu-item index="0" class="disabled-el-menu-item">{{ cinemaName }}</el-menu-item>


            <div class="flex-grow" />
            <el-menu-item index="1">排片管理</el-menu-item>
            <el-menu-item index="2">影厅管理</el-menu-item>
            <el-menu-item index="3" class="disabled-el-menu-item">登出</el-menu-item>
        </el-menu>
    </div>
    

</template>

<script lang="ts">

import axios from "axios"
import { ElMessage } from 'element-plus'
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
        handleSelect(key, keyPath) {
            this.curIndex = key;
            this.isLeft = !this.isLeft;
        },
    },
    mounted() {

    },
    watch: {
        curSection(newVal) {
        }
    },
    computed: {
        screeClass() {

        },
        hallClass() {

        },
    },

}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.disabled-el-menu-item {
    pointer-events: none; /* 禁用鼠标事件 */
    cursor: default; /* 修改鼠标样式为默认 */
}
.disabled-el-menu-item a {
    color: inherit; /* 保持原本的颜色 */
    text-decoration: none; /* 去掉链接下划线样式 */
}
</style>
