<script setup lang="ts">
import type { routerKey } from 'vue-router';

</script>

<template>
    <div class="content">
        <el-row justify="center">
            <el-col :span="6">
                <el-statistic title="今日影院总票房" :value="TotalCinemaBoxOffice" />
            </el-col>
            
            <el-col :span="6">
                <el-statistic title="今日影院总观影人次" :value="TotalCinemaAudiNumber" />
            </el-col>
        </el-row>

        <!-- <el-divider border-style="double" /> -->
        <el-table :data="CinemaData" style="width:100%;">
            <el-table-column label="电影名" prop="MovieName" sortable>
                <template #default="scope">
                    <el-button style="border: none;">{{ scope.row.MovieName }}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="总票房（当前影院）" prop="BoxOffice" sortable/>
                
            <el-table-column label="影院上座率" prop="Attendence" sortable/>
                
            <el-table-column label="观影人次" prop="AudiNumber" sortable/>
                
            <el-table-column label="首映日期" prop="PremiereDate" sortable>
                <template #default="scope">
                    <span>{{ formattedPremiereDate(scope.row.PremiereDate) }}</span>
                </template>
            </el-table-column>
        </el-table>
        <!-- <el-divider border-style="double" /> -->
    </div>
</template>

<script lang="ts">
export default {
    data: () => {
        return {
            activeIndex: '0',
            curIndex: '0',
            debounceTimeout: null,
            hallClass: ['bg-purple'],
            isLeft: true,

            TotalCinemaBoxOffice: 3562536253263562,
            TotalCinemaAudiNumber: 2378273823,
            CinemaData: [
                {
                    MovieName: "奥本海默",
                    BoxOffice: 1000000,
                    Attendence: 0.85,
                    AudiNumber: 1000000,
                    PremiereDate: new Date("2023-08-31T00:00:00"),
                },
                {
                    MovieName: "孤注一掷",
                    BoxOffice: 3623783,
                    Attendence: 0.75,
                    AudiNumber: 2637263,
                    PremiereDate: new Date("2023-08-14T00:00:00"),
                },
            ]
        }
    },
    methods: {
        logout() {
            alert("我退出了");
        },
        // handleSelect(key: string) {
        //     this.curIndex = key;
        //     this.isLeft = !this.isLeft;

        //     // switch (key) {
        //     //     case '0':
        //     //         this.$router.push('/');
        //     //         break;
        //     //     case '1':
        //     //         this.$router.push('/movieInfo');
        //     //         break;
        //     //     case '2':
        //     //         this.$router.push('/CinemaInfo');
        //     //         break;
        //     //     case '3':
        //     //         this.logout();
        //     //         return;
        //     // }
        // },
        formattedPremiereDate(value: string) {
            if (!value)
                return "";
            return new Date(value).toLocaleString();
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

.el-col {
  text-align: center;
}
</style>
