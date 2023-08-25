<script>
import axios from 'axios';
import topBar from './topBar.vue';

export default {
    components: {
        topBar
    },
    data: () => {
        return {
            targetIndex: 0,
            staff: {
                staffId: "",
                name: "",
                gender: "0",
                introduction: "",
                imageUrl: "",
            },
            staffs: [],
            baseURL: 'https://localhost:7299/api/Staff',
            //表格/分页相关设置
            loading: true,
            pageSize: 12,
            total: 0,
            currentPage: 1,
            //弹窗表单控制相关
            dialogVisible: false,
            dialogTitle: "修改演员",
            formStatus: false,
            idInputDisabled: true,
        }
    },
    mounted() {
        let obj = this;
        this.loading = true;
        axios.get(this.baseURL)
            .then((res) => {
                obj.staffs = res.data;

                //分页初始化
                obj.total = obj.staffs.length;
                obj.loading = false;
            })
            .catch((err) => {
                // 处理错误情况
                console.log(err);
                ElMessageBox.alert("数据加载失败！", "错误", {
                    // if you want to disable its autofocus
                    // autofocus: false,
                    confirmButtonText: 'OK',
                    callback: () => {
                        ElMessage.error("数据加载错误")
                    },
                })
            })
    },
    methods: {
        staffDelete(name, id) {     //删除对应ID的影院
            let obj = this;
            ElMessageBox.confirm(
                `确定要删除 ${name} 吗`,
                'Warning',
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: 'warning',
                }
            ).then(() => {
                obj.loading = true;
                axios.delete(this.baseURL + "/deleteStaffById/" + id)
                    .then((res) => {
                        obj.loading = false;
                        if (res.data.status == '4001') {
                            console.log(id);
                            ElMessage({
                                type: 'error',
                                message: "该影人不存在",
                            })
                        }
                        else if (res.data.status == '10000') {
                            let targetIndex = obj.staffs.findIndex(staff => staff.staffId == id);
                            obj.staffs.splice(targetIndex, 1);      //同时维护前端电影数组
                            ElMessage({
                                type: 'success',
                                message: "删除成功",
                            })
                        }

                    }
                    ).catch(() => {
                        ElMessage({
                            type: 'error',
                            message: "删除失败！",
                        })
                    }
                    )
            }).catch(() => {
                ElMessage({
                    type: 'info',
                    message: "取消删除",
                })
            })
        },
        formReset() {
            this.$refs.formRef.resetFields();
            this.formStatus = false;
        },
        staffUpdate() {       //影人修改确认的前后端交互
            if (!this.formStatus) {
                //影人数据未被修改
                this.formReset();
                this.dialogVisible = false;
                return;
            }
            let obj = this;
            let newStaff = {};
            Object.assign(newStaff, this.staff);
            // console.log(newStaff);
            axios.put(this.baseURL + '/Update', {
                staff_id: obj.staff.staffId,
                name: obj.staff.name,
                gender: Number(obj.staff.gender),
                introduction: obj.staff.introduction,
                staff_img_url: obj.staff.imageUrl
            }).then((res) => {
                if (res.data.status == '10000') { 
                    obj.formReset();
                    obj.dialogVisible = false;

                    Object.assign(obj.staffs[obj.targetIndex], newStaff);
                    // console.log(obj.staffs[obj.targetIndex]);
                    ElMessage({
                        type: 'success',
                        message: obj.dialogTitle.slice(2) + '成功',
                    })
                }
                else if (res.data.status == '10001') {
                    console.log(res.data);
                    ElMessage({
                        type: 'error',
                        message: obj.dialogTitle.slice(2) + '失败',
                    })
                }
            }).catch((err) => {
                console.log(err);
                ElMessage({
                    type: 'error',
                    message: obj.dialogTitle.slice(2) + '失败',
                })
            })
            // console.log(newStaff);
        },
        staffAdd() {            //影人添加的前后端交互
            let obj = this;
            let newStaff = {};
            Object.assign(newStaff, this.staff);
            // console.log(newStaff);
            axios.post(this.baseURL + '/Add', {
                staff_id: obj.staff.staffId,
                name: obj.staff.name,
                gender: Number(obj.staff.gender),
                introduction: obj.staff.introduction,
                staff_img_url: obj.staff.imageUrl
            }).then((res) => {
                if (res.data.status == '10000') {
                    obj.formReset();
                    obj.dialogVisible = false;
                    obj.staffs.push(newStaff);
                    obj.total += 1;
                    // console.log(obj.staffs[obj.targetIndex]);

                    ElMessage({
                        type: 'success',
                        message: obj.dialogTitle.slice(2) + '成功',
                    })
                }
                else if (res.data.status == '10001') {
                    console.log(res.data);
                    ElMessage({
                        type: 'error',
                        message: obj.dialogTitle.slice(2) + '失败',
                    })
                }
            }).catch((err) => {
                console.log(err);
                ElMessage({
                    type: 'error',
                    message: obj.dialogTitle.slice(2) + '失败',
                })
            })
            console.log(newStaff);
        },
        updataForm(id) {        //影人修改的表单初始化
            // console.log(id);
            this.targetIndex = this.staffs.findIndex(staff => staff.staffId == id);
            Object.assign(this.staff, this.staffs[this.targetIndex]);
            this.staff.gender = this.staff.gender.toString();
            this.idInputDisabled = true;
            this.dialogTitle = "影人修改";
            this.dialogVisible = true;
        },
        addForm() {             //添加影人的表单初始化
            this.staff = {
                staffId: "",
                name: "",
                gender: "",
                introduction: "",
                imageUrl: ""
            }
            this.idInputDisabled = false;
            this.dialogTitle = "影人添加";
            this.dialogVisible = true;
        },
        async dialogConfirm() {
            let formRef = this.$refs.formRef;
            if (!formRef) {
                console.log("form is NULL");
                return;
            }
            console.log("开始进行表单检查！");
            await formRef.validate((valid, fields) => {
                if (valid) {
                    if (this.dialogTitle == '影人修改')
                        this.staffUpdate();
                    else if (this.dialogTitle == '影人添加')
                        this.staffAdd();
                }
                else {
                    console.log('表单不合法', fields);
                }
            })
        },
        dialogClose() {
            if (!this.formStatus) {
                this.dialogVisible = false;
                this.formReset();
                return;
            }
            ElMessageBox.confirm('表单中还有填写的数据，要丢弃吗', "Warning", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.dialogVisible = false;
                this.formReset();
            })
        },
    },
}
</script>

<template>
    <!-- 顶栏 -->
    <el-row align="middle" justify="space-between">
        <el-col :span="20">
            <topBar />
        </el-col>
        <el-col :span="2" :offset="2">
            <el-button size="large" type="success" @click="addForm()">添加</el-button>
        </el-col>
    </el-row>
    <main style="width: 100%; margin: 0;">

        <!-- 加载时的骨架屏 -->
        <el-skeleton :loading="loading" animated>
            <template #template>
                <el-row :gutter="10">
                    <el-col :span="4" v-for="n in pageSize">
                        <div class="skeleton" style="height: 280px;">
                            <el-skeleton-item variant="image" style="width: 100%; height: 160px" />
                            <div style="padding: 2px; height: 90px;">
                                <div class="idAndGen_Ske"
                                    style="margin: 5px; display: flex; justify-content: space-between; width: 80%;">
                                    <el-skeleton-item variant="p" style="width: 65%" />
                                    <el-skeleton-item variant="p" style="width: 25%; margin-left: 10px;" />
                                </div>
                                <el-skeleton-item variant="h1" style="width: 90%; margin: 5px;" />
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </template>
            <template #default>
                <el-row :gutter="10">
                    <el-col :span="4" v-for="staff in staffs.slice((currentPage - 1) * pageSize, currentPage * pageSize)">
                        <el-card shadow="hover" style="padding: 0; margin-bottom: 20px; height: 280px;">
                            <el-image :src="staff.imageUrl" fit="cover"
                                style="height: 160px; width: 100%; margin: 0; padding: 0;" />
                            <div class="staffInfo"
                                style="padding: 2px; height: 90px; display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
                                <div class="idAndGen" style="display: flex; justify-content: space-around; width: 80%;">
                                    <span class="staffId" style="color: rgba(90,90,90,.5);">{{ staff.staffId }}</span>
                                    <span class="gender">{{ (staff.gender == '1' ? '女' : '男') }}</span>
                                </div>
                                <div class="staffName">
                                    <span class="staffName" style="font-size: 1.2em;">{{ staff.name }}</span>
                                </div>
                                <div class="bottoms" style="display: flex; justify-content: center;">
                                    <el-button size="small" type="info" @click="updataForm(staff.staffId)">修改</el-button>
                                    <el-button size="small" type="danger"
                                        @click="staffDelete(staff.name, staff.staffId)">删除</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <!-- 分页栏 -->
                <el-pagination background layout="prev, pager, next" v-model:total="total" v-model:page-size="pageSize"
                    v-model:current-page="currentPage" />
            </template>
        </el-skeleton>
    </main>


    <!-- 弹出框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" :before-close="dialogClose">
        <!-- 表单 -->
        <el-form :model="staff" label-width="80px" class="staffForm" ref="formRef" status-icon style="margin-right: 30px;">
            <el-col>
                <el-row align="middle">
                    <el-col :span="12">
                        <!-- 影人海报预览 -->
                        <el-image :src="staff.imageUrl" fit="cover"
                            style="height: 350px; width: 300px; margin: 5px 0px 20px 65px;" />
                    </el-col>
                    <el-col :span="12">
                        <!-- 影人Id查看 -->
                        <el-form-item label="影人ID">
                            <el-input v-model="staff.staffId" :disabled="idInputDisabled" placeholder="请输入影人ID">
                            </el-input>
                        </el-form-item>
                        <!-- 影人名字 -->
                        <el-form-item label="影人名称" prop="name"
                            :rules="{ required: true, message: '影人名称不能为空', trigger: 'blur' }">
                            <el-input v-model="staff.name" maxlength="20" @change="formStatus = true" show-word-limit
                                placeholder="请输入影人姓名" />
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="staff.gender" placeholder="请选择性别" @change="formStatus = true"
                                :rules="{ required: true, message: '影人性别不能为空', trigger: 'blur' }">
                                <el-option label="男性" value="0" />
                                <el-option label="女性" value="1" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <!-- 影人简介修改 -->
                        <el-form-item label="影人简介" prop="introduction"
                            :rules="{ required: true, message: '影人简介不能为空', trigger: 'blur' }">
                            <el-input v-model="staff.introduction" type="textarea" @change="formStatus = true"
                                maxlength="40" show-word-limit :autosize="{ minRows: 3, maxRows: 5 }"
                                placeholder="请输入影人简介" />
                        </el-form-item>
                        <!-- 影人图片URL -->
                        <el-form-item label="图片URL">
                            <el-input v-model="staff.imageUrl" @change="formStatus = true" placeholder="请输入影人海报URL">
                                <template #append>URL</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-col>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogClose">取消</el-button>
                <el-button type="primary" @click="dialogConfirm">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>



<style scoped>
.el-pagination {
    margin: 20px 0;
    justify-content: center;
}
</style>