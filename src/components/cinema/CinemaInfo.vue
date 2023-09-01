<script setup lang="ts">
</script>

<template>
    <div class="content">
        <div class="line"></div>
        <el-menu ref="menu" :default-active="activeIndex1" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :ellipsis="false">
            
            <el-menu-item index="0">{{ cinemaName }}</el-menu-item>
            <div class="flex-grow" />
            <el-menu-item index="1">排片管理</el-menu-item>
            <el-menu-item index="2">影厅管理</el-menu-item>
            <el-menu-item index="3">登出</el-menu-item>
        </el-menu>
        <div >
            <div>
                <el-table :data="filterTableData"  :height="tableHeight" style="width: 100%">
                    <el-table-column label="影厅编号" prop="hallID" sortable :sort-method="mySort">
                        <template #default="scope" >
                            <template v-if="editIndex === scope.$index">
                                <el-input v-model="scope.row.hallID" size="default"/>
                            </template>
                            <template v-else>
                                <span>{{ scope.row.hallID }}</span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="行数" prop="row" >
                        <template #default="scope">
                            <template v-if="editIndex === scope.$index">
                                <el-input v-model="scope.row.row" size="default" />
                            </template>
                            <template v-else>
                                <span>{{ scope.row.row }}</span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="列数" prop="col">
                        <template #default="scope">
                            <template v-if="editIndex === scope.$index">
                                <el-input v-model="scope.row.col" size="default" />
                            </template>
                            <template v-else>
                                <span>{{ scope.row.col }}</span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="影厅类型" prop="type" >
                        <template #default="scope">
                            <template v-if="editIndex === scope.$index">
                                <el-input v-model="scope.row.type" size="default" />
                            </template>
                            <template v-else>
                                <span>{{ scope.row.type }}</span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column align="right" >
                        <template #header>
                            <div class="header-container">
                                <el-button size="default" type="primary" @click="handleAdd()" :disabled="newHallID !== -1">添加</el-button>
                                <el-input v-model="search" size="default" placeholder="Type to search" />
                            </div>
                        </template>
                        <template #default="scope" >
                            <template v-if="editIndex !== scope.$index">
                                <el-button size="default" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button size="default" type="danger" @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
                            </template>
                            <template v-else>
                                <el-button size="default" type="primary" @click="handleSave(scope.$index, scope.row)">保存</el-button>
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
    

</template>

<script lang="ts">

import axios from "axios"
import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus';

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
            editIndex: -1,
            newHallID: -1,
            tableHeight: window.innerHeight - 500,
            WindowHeight: window.innerHeight,
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
        handleDelete(index: any, data: any) {
            console.log(data);
            const result = ElMessageBox.confirm('确定要删除这一行吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
            ).then(
                () => {
                    ElMessage({
                        type: 'success',
                        message: '删除成功!',
                    });
                    this.tableData.splice(index, 1);//这里写相应操作
                }
            ).catch(
                () => {
                    ElMessage({
                        type: 'info',
                        message: '取消操作',
                    })
                }
            )

        },
        handleEdit(index: number, data: any) {
            //让组件可修改
            //this.$refs.editDialog.editData = data;
            this.editIndex = index;
            console.log(data);
        },
        handleAdd() {
            this.newHallID = this.tableData.length;
            this.tableData.push({
                hallID: 0,
                row: 0,
                col: 0,
                type: '',
            });
            this.editIndex = this.newHallID;
        },
        handleSave(index: any, data: any) {
            if (this.newHallID === index) {
                this.newHallID = -1;
            }
            //这里写相应操作
            
            this.tableData = this.tableData.sort((obj1, obj2) => {//根据hallID进行排序
                return obj1.hallID - obj2.hallID;
            });

            this.editIndex = -1;
            console.log(data);
        },
        updateHeight() {
            const windowHeight = window.innerHeight;
            const componentHeight = this.$refs.menu.$el.offsetHeight;
            this.tableHeight = windowHeight - componentHeight;
        },
        mySort(obj1, obj2) {
            if (this.newHallID !== -1 || this.editIndex !== -1) {
                return;
            }
            let obj1Value = obj1.hallID;
            let obj2Value = obj2.hallID;
            return obj1Value - obj2Value;
        },
    },
    mounted() {
        window.addEventListener('resize', this.updateHeight);// 添加窗口大小改变的事件监听器
        // 组件渲染完成后先调用一次更新高度的方法
        this.updateHeight();
    },
    watch: {
        updatedWindowHeight(Height) {
            this.WindowHeight = Height;  // 更新 data 中的值为窗口当前宽度
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
    beforeUnmount() {
        window.removeEventListener('resize', this.updateHeight);
    }

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


.el-message-box__wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
