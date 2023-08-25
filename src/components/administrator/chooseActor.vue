<script>
import axios from 'axios';

export default {
    props: {
        selected: {
            type: Array,
            required: true,
        },
        mode: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            baseUrl: "https://localhost:7299/api/Staff",

            actors: [],
            selectedActors: [],
            avalActors: [],
            dialogVisible: false,
            dialogTitle: "",
            dialogStatus: false,    //记录数据是否有修改
            pageSize: 1,
            currentPage: 1,
            total: 1,
        };
    },
    mounted() {
        this.selectedActors = this.selected.slice(0);
        this.dialogTitle = this.title;
        // this.avalActors = this.names.slice(11).sort();
        console.log(this.dialogTitle);
        console.log(typeof (this.mode));
        // console.log(this.mode);
    },
    methods: {
        // 影人选取操作相关
        actorCancel(index) {
            this.dialogStatus = true;
            const actor = this.selectedActors[index];
            this.selectedActors.splice(index, 1);
            this.avalActors.push(actor);
            this.avalActors = this.avalActors.slice().sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        },
        actorSelect(index) {
            //导演模式下只能选择一个影人
            if (this.mode == 1 && this.selectedActors.length >= 1) {
                console.log("导演模式选人只能一个！");
                return;
            }

            this.dialogStatus = true;
            const actor = this.avalActors[index];
            this.avalActors.splice(index, 1);
            this.selectedActors.push(actor);
            this.selectedActors = this.selectedActors.slice().sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        },
        // 打开弹窗才从远端获取所有演员数据
        showDialog() {
            this.dialogVisible = true;
            this.selectedActors = this.selected.slice(0);

            if (this.actors.length == 0) {
                // const loading = ElLoading.service({
                //     lock: true,
                //     text: 'Loading',
                //     background: 'rgba(0, 0, 0, 0.7)',
                // })

                axios.get(this.baseUrl)
                    .then((res) => {
                        this.actors = res.data;
                        this.avalActors = this.actors.slice(0);
                    })
                    .catch((err) => {
                        console.log(err);
                        ElMessage({
                            type: 'error',
                            message: '数据获取失败'
                        })
                    })

                // loading.close();
            }

            // 去掉已经选取的影人
            this.avalActors = this.actors.slice(0);
            this.selectedActors.map((actor) => {
                let index = this.avalActors.findIndex(item => item.staffId == actor.staffId);
                this.avalActors.splice(index, 1);
            })
        },
        // 弹窗关闭相关
        reset() {
            this.dialogVisible = false;
            this.dialogStatus = false;
        },
        actorUpdate() {
            if (!this.dialogStatus) {
                this.reset();
                return;
            }
            console.log(this.selectedActors);
            this.reset();
            this.$emit('actorUpdate', this.selectedActors);
        },
        dialogClose() {
            if (!this.dialogStatus) {
                this.reset();
                return;
            }
            ElMessageBox.confirm('存在修改的数据，要丢弃吗', "Warning", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.reset();
            })
        },
    }
};
</script>

<template>
    <el-button @click="showDialog" text>
        <span v-if="selected.length > 0" v-for="i in (selected.length <= 3 ? selected.length : 3)">
            {{ selected[i - 1].name }}
            <span v-if="i != selected.length">，</span>
        </span>
        <span v-else>无</span>
        <span v-if="selected.length > 3">...</span>
    </el-button>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" :before-close="dialogClose">
        <text>已选择演员</text>
        <div class="selectedActor">
            <el-tag class="actor" v-if="selectedActors.length > 0" disable-transitions @click="actorCancel(index)"
                v-for="(actor, index) in selectedActors" :key="actor.name">
                {{ actor.name }}
            </el-tag>
            <span v-else>暂无</span>
        </div>

        <text>可选择演员</text>
        <div class="avalActor">
            <el-tag class="actor" disable-transitions type="info" @click="actorSelect(index)"
                v-for="(actor, index) in avalActors" :key="actor.name">
                {{ actor.name }}
            </el-tag>
        </div>

        <!-- <el-pagination background layout="prev, pager, next" v-model:total="total" v-model:page-size="pageSize" small
            hide-on-single-page v-model:current-page="currentPage" /> -->

        <!-- 按钮组 -->
        <template #footer>
            <span class="dialog-footer">
                <el-button type="info" @click="dialogClose" class="no-button">取消</el-button>
                <el-button type="primary" @click="actorUpdate" class="yes-button">确定</el-button>
            </span>
        </template>

    </el-dialog>
</template>
  
  
<style scoped>
.selectedActor {
    display: flex;
    padding: 10px;
    width: 100%;
    overflow-x: auto;

}

.selectedActor .actor {
    padding: 5px;
    margin: 5px;
    white-space: nowrap;
    flex-basis: 8%;
}

/* .avalActor {
    overflow: auto;
    padding: 10px;
    max-height: 150px;
    overflow-y: auto;
} */

.avalActor {
    overflow: auto;
    padding: 10px;
    max-height: 150px;
    overflow-y: auto;

    display: flex;
    flex-wrap: wrap;
    padding: 5px;
}

.avalActor .actor {
    margin-right: 10px;
    margin-bottom: 10px;
    width: 100px;
    /* 固定元素长度 */
}

/* .el-pagination {
    margin: 20px 0;
    justify-content: center;
} */
</style>
  