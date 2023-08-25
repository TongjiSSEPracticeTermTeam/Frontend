<script>
import axios from "axios";
import { ElMessage } from "element-plus";
import { ElLoading } from 'element-plus'

export default {
    props: ["cinemaId"],
    data: () => {
        return {
            baseGetUrl: "https://localhost:7299/api/Cinema/getCinemaById",
            basePutUrl: "https://localhost:7299/api/Cinema/update",
            cinema: {
                // cinemaId: "",
                // cinemaImageUrl: "https://pic.52112.com/180303/180303_21/KIb5ic651N.jpg",
                // feature: "IMAX,巨幕,杜比音效",
                // halls: [],
                // location: "上海市嘉定区黄渡理工学校旁",
                // manager: {},
                // managerId: "000002",
                // name: "型穷铁道联动影院",
            },
            formStatus: false,
            featureHint: false,
        }
    },
    mounted() {
        let obj = this;
        obj.cinema.cinemaId = obj.cinemaId;

        const loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })

        axios.get(this.baseGetUrl + '/' + this.cinemaId)
            .then((res) => {
                if (res.data.status == "10000") {
                    // console.log(res.data.cinema);
                    obj.cinema = res.data.cinema;
                    // console.log(obj.cinema);
                }
                else if (res.data.status == "4001") {
                    ElMessage({
                        type: 'error',
                        message: '该影院不存在！'
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
                    //前后端PUT
                    let obj = this;

                    axios.put(this.basePutUrl, {
                        cinema_id: this.cinema.cinemaId,
                        location: this.cinema.location,
                        name: this.cinema.name,
                        manager_id: this.cinema.managerId,
                        cinema_image_url: this.cinema.cinemaImageUrl,
                        feature: this.cinema.feature
                    }).then((res) => {
                        if (res.data.status == "10000") {
                            ElMessage({
                                type: 'success',
                                message: '修改上传成功'
                            })
                            console.log("修改成功！")
                            console.log(res.data.cinema);
                            obj.$router.back();        //返回上一页
                        }
                        else if (res.data.status == "10001") {
                            console.log(res.data.message);
                            // console.log("here is cinema: \n")
                            // console.log(obj.cinema)
                            ElMessage({
                                type: 'error',
                                message: '修改上传失败'
                            })
                        }
                    }).catch((error) => {
                        console.log(error);
                        // console.log(obj.cinema)
                        ElMessage({
                            type: 'error',
                            message: '修改上传失败'
                        })
                    })
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
        <!-- 表单 -->
        <el-form :model="cinema" label-width="120px" class="cinemaForm" ref="formRef" status-icon>
            <el-col>
                <el-row align="middle">

                    <el-col :span="10" :offset="2">
                        <!-- 电影院预览 -->
                        <el-image :src="cinema.cinemaImageUrl" fit="contain"
                            style="height: 400px; width: 400px; margin: 10px;" />
                    </el-col>
                    <el-col :span="12">
                        <!-- 电影院Id查看 -->
                        <el-form-item>
                            <el-input v-model="cinema.cinemaId" disabled>
                                <template #append>电影ID</template>
                            </el-input>
                        </el-form-item>
                        <!-- 管理员Id -->
                        <el-form-item>
                            <el-input v-model="cinema.managerId" disabled>
                                <template #append>管理员ID</template>
                            </el-input>
                        </el-form-item>

                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <!-- 电影院名字修改 -->
                        <el-form-item label="影院名" prop="name"
                            :rules="{ required: true, message: '影院名称不能为空', trigger: 'blur' }">
                            <el-input v-model="cinema.name" maxlength="20" @change="formStatus = true" show-word-limit
                                placeholder="请输入影院名" />
                        </el-form-item>
                        <!-- 电影院地址修改 -->
                        <el-form-item label="影院地址" prop="location"
                            :rules="{ required: true, message: '影院地址不能为空', trigger: 'blur' }">
                            <el-input v-model="cinema.location" type="textarea" @change="formStatus = true" maxlength="25"
                                show-word-limit :autosize="{ minRows: 2, maxRows: 3 }" placeholder="请输入影院地址" />
                        </el-form-item>
                        <!-- 电影院特点 -->
                        <el-form-item label="影院标签">
                            <el-input v-model="cinema.feature" maxlength="20" show-word-limit @change="formStatus = true"
                                placeholder="请输入影院标签" @focus="featureHint = true" @blur="featureHint = false"
                                type="textarea" :autosize="{ minRows: 1, maxRows: 2 }" />
                            <span v-show="featureHint"
                                style="font: 5px 'Fira Sans', serif; margin: 2px 0 0 0; padding: 0;color: red; font-weight: bold;">
                                标签之间请用半角逗号`,`隔开
                            </span>
                        </el-form-item>
                        <!-- 电影院图片URL -->
                        <el-form-item label="图片URL">
                            <el-input v-model="cinema.cinemaImageUrl" @change="formStatus = true" placeholder="请输入电影海报URL">
                                <template #append>URL</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-col>
        </el-form>

        <div style="display: flex; justify-content: end;">
            <el-button @click="cancelForm">取消</el-button>
            <el-button type="success" @click="confirmForm()">修改</el-button>
        </div>

    </div>
</template>

<style scoped>
.page {
    width: 100%;
    /* background-color: pink; */
}

.el-form-item {
    margin-bottom: 30px;
}
</style>