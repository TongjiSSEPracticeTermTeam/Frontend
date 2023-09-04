<script setup lang="ts">
import type { routerKey } from 'vue-router';

</script>

<template>
    <!-- <div class="content"> -->
    <h1 class="text-2xl font-bold">影厅总览</h1>
    <div class="el-divider el-divider--horizontal" role="separator" style="--el-border-style: solid;" />

    <el-row justify="center">
        <el-col :span="6" class="statistic_bgcolor">
            <el-statistic class="pt10 pb10 pl10 pr10" title="今日影院总票房" :value="TotalCinemaBoxOffice" />
        </el-col>
        
        <el-col :span="6" class="statistic_bgcolor">
            <el-statistic class="pt10 pb10 pl10 pr10" title="今日影院总观影人次" :value="TotalCinemaAudiNumber" />
        </el-col>
    </el-row>

    <div class="el-divider el-divider--horizontal" role="separator" style="--el-border-style: solid;" />
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
    <!-- </div> -->
</template>

<script lang="ts">
export default {
    data: () => {
        return {
            // activeIndex: '0',
            // curIndex: '0',
            // debounceTimeout: null,
            // hallClass: ['bg-purple'],
            // isLeft: true,

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
.el-col {
  text-align: center;
}

.statistic_bgcolor{
    background-color: rgb(138, 231, 235);
}

.pt10{
    padding-top: 10px;
}

.pb10{
    padding-bottom: 10px;
}

.pl10{
    padding-left: 10px;
}

.pr10{
    padding-right: 10px;
}
</style>
