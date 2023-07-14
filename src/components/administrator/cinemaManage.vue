<script lang="ts">
export default {
    data: () => {
        return {
            cinemas: [
                {
                    id: 1,
                    name: "0090激光影城",
                    location: "金山区乐购超市一楼",
                    feature: "IMAX厅,改签,折扣卡"
                },
                {
                    id: 2,
                    name: "1929电影公园（XWORLD 4DX ）维璟印象城店",
                    location: "闵行区七莘路1507号4层电影院",
                    feature: "IMAX厅,杜比全景声厅,折扣卡,退"
                },
                {
                    id: 3,
                    name: "AMG海上明珠影城（上海大宁音乐广场IMAX店）",
                    location: "静安区万荣路777号大宁音乐广场A座1层",
                    feature: "4D厅,IMAX厅,退"
                },
                {
                    id: 4,
                    name: "AMG海上明珠影城（上海环球港RealDCinema店）",
                    location: "普陀区中山北路3300号环球港4楼4038室",
                    feature: "LUXE巨幕厅,4K厅,RealD 6FL厅,折扣"
                }
            ],
            centerDialogVisible: false,
            selectedCinema: {
                id: -1,
                name: "",
                location: "",
            },

            //影院添加的弹出框
            rules: {

            },
            emailRules: [
                {
                    required: true,
                    message: "请输入邮箱",
                    trigger: "blur"
                },
                {
                    validator: function (rule: any, value: any, callback: any) {         //邮箱校验
                        // console.log("邮箱通过！");
                        // return callback()
                        const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                        if (regEmail.test(value)) {
                            // 合法的邮箱
                            return callback()
                        }
                        callback(new Error('请输入合法的邮箱'))
                    },
                    trigger: 'blur'
                }
            ],
            drawer: false,
                direction: "rtl",
                    formStatus: false,
                        featureHint: false,
                            newCinema: {
            cinemaURL: "",
                name: "",
                    location: "",
                        feature: "",
                            managerName: "",
                                managerEmail: "",
                                    managerPassWD: "",
            }
    }
},
mounted() {
    for (let i = 0; i < this.cinemas.length; i++) {
        (this.cinemas[i].feature as unknown) = this.cinemas[i].feature.split(',');
    }
},
methods: {
    cinemaSelection(row: { id: number; name: string; location: string; }) {
        this.selectedCinema.id = row.id;
        this.selectedCinema.name = row.name;
        this.selectedCinema.location = row.location;
    },
    cinemaDelete() {

    },
    //添加影院相关
    formReset() {         //表单内容重置
        this.formStatus = false;
        this.newCinema.name = "";
        this.newCinema.location = "";
        this.newCinema.feature = "";
        this.newCinema.managerEmail = "";
        this.newCinema.managerName = "";
        this.newCinema.managerPassWD = "";
        this.newCinema.cinemaURL = "";
    },
    handleClose() {       //退出表单回调函数
        if (!this.formStatus) {
            this.drawer = false;
            return;
        }
        ElMessageBox.confirm('表单中还有填写的数据，要丢弃吗', "Warning", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(() => {
                this.drawer = false;
                this.formReset();
            })
            .catch(() => {
                // catch error
            })
    },
        async confirmForm() {      //表单确认函数
        let formRef = this.$refs.formRef;
        if (!formRef) {
            console.log("form is NULL！");
            return;
        }
        console.log("开始进行表单检查！");
        await formRef.validate((valid: any, fields: any) => {
            if (valid) {
                console.log("表单合法！");
                this.drawer = false;
                this.formReset();
                //...前后端交互数据


            }
            else {  //表单提交失败
                console.log('表单不合法！', fields);
            }
        })
    },
    cancelForm() {       //表单取消函数
        if (!this.formStatus) {
            this.drawer = false;
            return;
        }
        ElMessageBox.confirm('表单中还有填写的数据，要丢弃吗', "Warning", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(() => {
                this.drawer = false;
                this.formReset();
                //退出表单，放弃提交，丢弃数据
            })
            .catch(() => {
                //点击取消，返回表单继续填写
            })
    },
},

}

</script>

<template>
    <el-table :data="cinemas" style="width: 100%; " :header-cell-style="{ backgroundColor: 'purple', color: 'white' }"
        @row-click="cinemaSelection">
        <el-table-column label="序号" type="index" align="left" min-width="5%">
        </el-table-column>
        <el-table-column prop="name" label="影院名" align="left" min-width="25%">
        </el-table-column>
        <el-table-column prop="location" label="地址" align="center" min-width="25%">
        </el-table-column>
        <el-table-column label="标签" align="center" min-width="30%">
            <template #default="scope">
                <el-space wrap size="small" direction="horizontal">
                    <el-tag v-for="tag in cinemas[scope.$index].feature" :key="tag" size="small" color="rgba(90,0,90,.4)"
                        effect="dark" disable-transitions>{{ tag }}</el-tag>
                </el-space>
            </template>
        </el-table-column>
        <el-table-column align="right" min-width="15%">
            <template #header>
                <el-button size="small" type="success" @click="drawer = true">添加影院</el-button>
            </template>
            <template #default="scope">
                <el-button size="small">编辑</el-button>
                <el-button size="small" type="danger" @click="centerDialogVisible = true">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" align-center>
        <span>确定要删除 {{ selectedCinema.name }} 吗</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确定</el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 添加电影的弹框表单 -->
    <el-drawer v-model="drawer" title="添加影院" :direction="direction" :before-close="handleClose" size="50%">
        <!-- 表单 -->
        <el-form :model="newCinema" label-width="120px" class="newMovieForm" ref="formRef" status-icon>
            <!-- 电影海报上传 -->
            <el-form-item label="影院图片">
                <el-input v-model="newCinema.cinemaURL" @change="formStatus = true" placeholder="请输入电影海报URL">
                    <template #append>URL</template>
                </el-input>
                <img v-if="newCinema.cinemaURL" :src="newCinema.cinemaURL" height="300" width="300"
                    style="object-fit: contain; margin: 5px 0;">
            </el-form-item>

            <el-form-item label="影院名称" prop="name" :rules="{ required: true, message: '影院名称不能为空', trigger: 'blur' }">
                <el-input v-model="newCinema.name" @change="formStatus = true" placeholder="请输入影院名称" message="test"
                    trigger="blur" />
            </el-form-item>

            <el-form-item label="影院地址" prop="location" :rules="{ required: true, message: '影院地址不能为空', trigger: 'blur' }">
                <el-input v-model="newCinema.location" type="textarea" @change="formStatus = true"
                    :autosize="{ minRows: 2, maxRows: 3 }" placeholder="请输入影院地址" />
            </el-form-item>

            <el-form-item label="影院标签">
                <el-input v-model="newCinema.feature" @change="formStatus = true" placeholder="请输入影院标签"
                    @focus="featureHint = true" @blur="featureHint = false" type="textarea"
                    :autosize="{ minRows: 1, maxRows: 3 }" />
                <span v-show="featureHint"
                    style="font: 5px 'Fira Sans', serif; margin: 2px 0 0 0; padding: 0;color: red; font-weight: bold;">
                    标签之间请用半角逗号`,`隔开
                </span>
            </el-form-item>

            <el-form-item label="管理员姓名" prop="managerName"
                :rules="{ required: true, message: '管理员名称不能为空', trigger: 'blur' }">
                <el-input v-model="newCinema.managerName" @change="formStatus = true" placeholder="请输入管理员姓名" />
            </el-form-item>

            <el-form-item label="管理员邮箱" prop="managerEmail" :rules="emailRules">
                <el-input v-model="newCinema.managerEmail" @change="formStatus = true" placeholder="请输入管理员邮箱" clearable />
            </el-form-item>
            <el-form-item label="管理密码" prop="managerPassWD" :rules="{ required: true, message: '管理密码不能为空', trigger: 'blur' }">
                <el-input v-model="newCinema.managerPassWD" @change="formStatus = true" placeholder="请输入管理密码" />
            </el-form-item>

        </el-form>

        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancelForm">取消</el-button>
                <el-button type="success" @click="confirmForm()">添加</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<style scoped></style>