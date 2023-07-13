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
            <el-menu-item index="3">登出</el-menu-item>
        </el-menu>



        
        <div v-if="curIndex == 2">
            <div>
                
                <el-table :data="filterTableData" style="width: 100%">
                    
                    <el-table-column label="影厅编号" prop="hallID" />
                    <el-table-column label="行数" prop="row" />
                    <el-table-column label="列数" prop="col" />
                    <el-table-column label="影厅类型" prop="type" />
                    <el-table-column>
                        
                    </el-table-column>
                    
                    <el-table-column align="right">
                        <template #header>
                            <div class="header-container">
                                <el-button size="normal" type="primary" @click="handleAdd()">添加</el-button>
                                <el-input v-model="search" size="normal" placeholder="Type to search" />
                            </div>
                        </template>
                        <template #default="scope">
                            <el-button size="normal" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="normal" type="danger" @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <template v-else>
            ddd
        </template>
    </div>
    

</template>

<script lang="ts">

import axios from "axios"
import { ElMessage } from 'element-plus'

interface Hall {
    hallID: number
    row: number
    col: number
    type: string
}
export default {
    data: () => {
        return {
            activeIndex1: '1',
            cinemaName: '我的影院名',
            curIndex: 1,
            debounceTimeout: null,
            isLeft: true,
            search: '',
            tableData: [
                {
                    hallID: 1234,
                    row: 3245,
                    col: 2151417,
                    type: 'Dolby Atmos',
                },
                {
                    hallID: 2151417,
                    row: 3245,
                    col: 2151417,
                    type: 'Dolby Atmos',
                },
            ],
        }
    },
    methods: {
        logout() {
            alert("我退出了");
        },
        handleSelect(key, keyPath) {
            if (key == 3) {
                this.logout();
                return;
            }
            this.curIndex = key;
            this.isLeft = !this.isLeft;
        },
        handleDelete(index, data) {
            this.tableData.splice(index, 1);
            //这里写相应操作
        },
        handleEdit(index, data) {
            //让组件可修改
            //this.$refs.editDialog.editData = data;
        },
        handleAdd() {

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
        filterTableData() {
            return this.tableData.filter((item) => {
                return item.hallID.toString().includes(this.search) || item.type.includes(this.search);
            });
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
.header-container{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
}
</style>
