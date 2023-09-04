<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElCard, ElMessage, } from 'element-plus'
import { StaffDetail } from '@/models/Staff'

const route = useRoute()
const staff = ref(new StaffDetail())

onMounted(() => {
    axios.get(`/api/Staff/detail/${route.params.staffId}`)
        .then((res) => {
            console.log(res)
            staff.value = res.data.data
        })
        .catch((err) => {
            console.log(err)
            ElMessage.error('数据加载错误')
        })
})

</script>

<template>
    <div class="layout">
        <el-row>
            <el-card style="margin: 10px auto" shadow="hover">
                <el-row align="middle">
                    <el-col :span="10">
                        <el-image style="width: 300px; height: 400px" :src="staff.imageUrl" fit="cover" />
                    </el-col>
                    <el-col :span="14">
                        <h1>影人名称：{{ staff.name }}</h1>
                        <h1>影人性别：{{ staff.gender == '1' ? '男' : '女' }}</h1>
                        <h1>影人介绍：</h1>
                        <el-text size="large">
                            {{ staff.introduction }}
                        </el-text>
                    </el-col>
                </el-row>
            </el-card>
        </el-row>
        <el-row>
            <h1 style="font-size: 25px; color: red; font-weight: bold;">导演电影</h1>
            <div class="direcMovie" v-if="staff.directMovies?.length > 0">
                <el-card v-for="movie, index in staff.directMovies" :key="index">
                    <el-image style="width: 100px; height: 150px" :src="movie.postUrl" fit="cover" />
                    <el-text>{{ movie.name }}</el-text>
                </el-card>
            </div>
            <div v-else>
                <span>无</span>
            </div>
        </el-row>
        <el-row>
            <h1 style="font-size: 25px; color: red; font-weight: bold;">参演电影</h1>
            <div class="direcMovie" v-if="staff.starMovies?.length > 0">
                <el-card v-for="movie, index in staff.starMovies" :key="index" style="width: 300px;">
                    <el-image style="width: 80%; height: 300px" :src="movie.postUrl" fit="cover" />
                    <div>{{ movie.name }}</div>
                </el-card>
            </div>
            <div v-else>
                <span>无</span>
            </div>
        </el-row>
    </div>
</template>
    

<style scoped></style>