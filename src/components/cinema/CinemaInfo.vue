<script setup lang="ts"></script>
<template>
    <div class="content">
        <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple">{{ cinemaName }}</div>
            </el-col>
            <el-col :span="9">
                <div ref="headBarscreen" class="grid-content bg-purple-light" @click="screeningManage()">排片管理
                </div>
            </el-col>
            <el-col :span="9">
                <div ref="headBarhall" class="grid-content bg-purple" @click="hallManage()">影厅管理</div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple-light">登出</div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">

import axios from "axios"
import { ElMessage } from 'element-plus'
export default {
    data: () => {
        return {
            loginForm: {
                username: '',
                password: '',
            },
            cinemaName: '我的影院名',
            curSection: '排片管理',
        }
    },
    methods: {
        logout() {

        },
        screeningManage() {
            // 先来一个抖动函数，防止快速多次点击
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }
            this.debounceTimeout = setTimeout(() => {
                // 在这里写入你的点击事件的处理逻辑
                if (this.curSection === '排片管理') {
                    return;
                }
                alert('点击了排片管理');

                // 清除抖动计时器
                clearTimeout(this.debounceTimeout);
                this.debounceTimeout = null;
            }, 500); // 500毫秒为抖动延迟时间，可以根据需求进行调整
        },
        hallManage() {
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }
            this.debounceTimeout = setTimeout(() => {
                if (this.curSection === '影厅管理') {
                    return;
                }
                alert('点击了影厅管理');
                this.curSection = '影厅管理';
                clearTimeout(this.debounceTimeout);
                this.debounceTimeout = null;
            }, 500);
        },
    },
    mounted() {

    },
    watch: {
        curSection(newVal) {
            this.$nextTick(() => {
                if (newVal === '排片管理') {
                    this.$refs.headBarscreen.classList.add('bg-purple-light');
                    this.$refs.headBarhall.classList.remove('bg-purple-light');
                }
                else {
                    this.$refs.headBarscreen.classList.remove('bg-purple-light');
                    this.$refs.headBarhall.classList.add('bg-purple-light');
                }
            });


        }
    },
    computed: {

    },

}
</script>

<style scoped>
.el-row {
    margin-bottom: 64px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 48px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
