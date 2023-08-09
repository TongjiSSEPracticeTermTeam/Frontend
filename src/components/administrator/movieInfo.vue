<script>
import axios from 'axios';
import actorBtn from './chooseActor.vue'

export default {
    props: ["movieId"],
    components: {
        actorBtn,
    },
    data: () => {
        return {
            baseUrl: 'https://localhost:7299/api/Movie',
            movie: {
                schedule: [],
                // movieId: "000001",
                // name: "只因危机",
                // duration: "152",
                // instruction: "只因塌方危机",
                // score: 8.8,
                // postUrl: null,
                // tags: "国产,悬疑,惊悚,恋爱",
                // releaseDate: "2023-06-28T15:05:03",
                // removalDate: "2023-07-28T15:05:15",
                // acts: [],
                // comments: [],
                // sessions: []
            },
            director: [],
            actors: [],
            //表单相关
            formStatus: false,
            tagsHint: false,
            rule: {                 //表单检验规则
                postURL: [
                    {
                        required: true,
                        message: "请输入电影海报URL",
                        trigger: "blur",
                    },
                ],
                movieId: [
                    {
                        required: true,
                        message: "请输入电影id",
                        trigger: "blur",
                    },
                ],
                name: [
                    {
                        required: true,
                        message: "请输入电影名称",
                        trigger: "blur",
                    },
                ],
                duration: [
                    {
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error("请输入电影时长"));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur",
                    }
                ],
                schedule: [
                    {
                        required: true,
                        message: "请设置电影档期",
                        trigger: "blur",
                    },
                ],
            },
        }
    },
    mounted() {
        let obj = this;
        obj.movie.movieId = obj.movieId;

        const loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })

        axios.get(this.baseUrl + '/getMovieById/' + obj.movieId)
            .then((res) => {
                if (res.data.status == '10000') {
                    Object.assign(obj.movie, res.data.movie);
                    obj.movie.schedule.push(obj.movie.releaseDate);
                    obj.movie.schedule.push(obj.movie.removalDate);
                    // console.log(obj.movie);
                }
                else if (res.data.status == '4001') {
                    ElMessage({
                        type: 'error',
                        message: '该电影不存在！'
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                ElMessage({
                    type: 'error',
                    message: '数据获取失败'
                })
            })
        loading.close();
    },
    methods: {
        directorUpdate(newDirector) {
            this.director = newDirector.slice(0);
        },
        actorUpdata(newActors) {
            this.actors = newActors.slice(0);
        },
        cancelForm() {
            if (!this.formStatus)
                this.$router.back();
            else {
                ElMessageBox.confirm('表单中有修改过的数据，要丢弃吗', "Warning", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.$router.back();
                    //退出表单，放弃提交，丢弃数据
                })
            }
        },
        async confirmForm() {
            if (!this.formStatus)       //未存在更改
                this.$router.back();

            let formRef = this.$refs.formRef;
            await formRef.validate((valid, field) => {
                if (valid) {
                    //前后端put


                }
                else {
                    console.log('表单不合法', field);
                }
            })
        },
    },
}
</script>

<template>
    <div class="page">
        <el-form :model="movie" label-width="80px" class="movieForm" ref="formRef" status-icon>
            <el-row :gutter="20" align="bottom">
                <el-col :span="6" :offset="1">
                    <el-image :src="movie.postUrl" fit="contain" style="height: 400px; width: 300px; margin: 10px;" />
                </el-col>
                <el-col :span="16" :offset="1">
                    <el-form-item label="电影ID" prop="movieId">
                        <el-input v-model="movie.movieId" disabled />
                    </el-form-item>

                    <el-form-item label="电影名称" prop="name">
                        <el-input v-model="movie.name" @change="formStatus = true" placeholder="请输入电影名称" />
                    </el-form-item>

                    <el-form-item label="电影时长" prop="duration">
                        <el-input-number v-model="movie.duration" :min="0" @change="formStatus = true" />
                    </el-form-item>

                    <!-- 演员修改 -->
                    <el-row justify="start">
                        <el-col :span="12">
                            <el-form-item label="导演:">
                                <actorBtn :selected="director" :mode="1" :title="'导演修改'" @actor-update="directorUpdate" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="主演:">
                                <actorBtn :selected="actors" :mode="0" :title="'演员修改'" @actor-update="actorUpdata" />
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="电影档期" prop="schedule">
                        <el-date-picker unlink-panels value-format="YYYY-MM-DD" v-model="movie.schedule" type="daterange"
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="formStatus = true">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="电影标签">
                        <el-input v-model="movie.tags" @change="formStatus = true" placeholder="请输入电影标签"
                            @focus="tagsHint = true" @blur="tagsHint = false" type="textarea"
                            :autosize="{ minRows: 1, maxRows: 3 }" />
                        <span v-show="tagsHint"
                            style="font: 5px 'Fira Sans', serif; margin: 2px 0 0 0; padding: 0;color: red; font-weight: bold;">
                            标签之间请用半角逗号`,`隔开
                        </span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>

                    <!-- 电影海报修改 -->
                    <el-form-item label="电影海报" prop="postUrl">
                        <el-input v-model="movie.postUrl" @change="formStatus = true" placeholder="请输入电影海报URL">
                            <template #append>URL</template>
                        </el-input>
                    </el-form-item>
                    <!-- 电影简介修改 -->
                    <el-form-item label="电影简介">
                        <el-input v-model="movie.instruction" type="textarea" @change="formStatus = true"
                            :autosize="{ minRows: 4, maxRows: 7 }" placeholder="请输入电影简介" />
                    </el-form-item>


                </el-col>
            </el-row>
        </el-form>

        <!-- 按钮组 -->
        <div style="display: flex; justify-content: end;">
            <el-button @click="cancelForm">取消</el-button>
            <el-button type="success" @click="confirmForm">确定</el-button>
        </div>

    </div>
</template>

<style scoped>
.el-form-item {
    margin-bottom: 30px;
}
</style>