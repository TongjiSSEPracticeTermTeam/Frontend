<script setup lang="ts">
import type { routerKey } from 'vue-router';

</script>

<template>
    <div class="content">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :ellipsis="false" style="height: 7vh;">

            <el-menu-item index="0">{{ cinemaName }}</el-menu-item>
            <div class="flex-grow disabled-el-menu-item"></div>
            <el-menu-item index="1">排片管理</el-menu-item>
            <el-menu-item index="2">影厅管理</el-menu-item>
            <el-menu-item index="3">登出</el-menu-item>
        </el-menu>
    </div>
</template>

<script lang="ts">
export default {
    data: () => {
        return {
            activeIndex: '0',
            cinemaName: '我的影院名',
            curIndex: '0',
            debounceTimeout: null,
            hallClass: ['bg-purple'],
            isLeft: true,
        }
    },
    methods: {
        logout() {
            alert("我退出了");
        },
        handleSelect(key: string) {
            this.curIndex = key;
            this.isLeft = !this.isLeft;
            
            switch (key) {
                case '0':
                    this.$router.push('/');
                    break;
                case '1':
                    this.$router.push('/movieInfo');
                    break;
                case '2':
                    this.$router.push('/CinemaInfo');
                    break;
                case '3':
                    this.logout();
                    return;
            }
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

<style scoped>
.flex-grow {
  flex-grow: 1;
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
