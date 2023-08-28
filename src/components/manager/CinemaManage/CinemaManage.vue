<script setup lang="ts">
import Cinema from '@/models/Cinema'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import TopBar from '@/components/manager/TopBar.vue'
import CinemaInfo from '@/components/manager/CinemaManage/CinemaInfo.vue'
import CinemaManage from '@/components/manager/CinemaManage/CinemaManage.vue'

const cinemas = ref<Cinema[]>([])
const loading = ref(true)
const pageSize = ref(0)
const total = ref(0)
const currentPage = ref(1)
const emailRules = ref([
  {
    required: true,
    message: '请输入邮箱',
    trigger: 'blur'
  },
  {
    validator: function (rule, value, callback) {
      //邮箱校验
      // console.log("邮箱通过！");
      // return callback()
      const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (regEmail.test(value)) {
        // 合法的邮箱
        return callback()
      }
      callback(new Error('请输入合法的邮箱'))
    },
    trigger: 'blur'
  }
])
const drawer = ref(false)
const formStatus = ref(false)
const featureHint = ref(false)
const newCinema = ref(new Cinema())

onMounted(() => {
  // console.log("准备初始化数据");
  // 前后端交互，初始化数据和相关参数
  loading.value = true //加载等待动画
  axios
    .get('/api/Cinema')
    .then(function (response) {
      // 处理成功情况
      // console.log("连接成功！");
      cinemas.value = response.data.data
      console.log(cinemas.value)

      //分页相关设置
      total.value = cinemas.value.length
      pageSize.value = 10
      loading.value = false
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error)
      ElMessageBox.alert('数据加载失败！', '错误', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
        callback: () => {
          ElMessage.error('数据加载错误')
        }
      })
    })
})

const cinemaDelete = (name, id) => {
  //删除对应ID的影院
  ElMessageBox.confirm(`确定要删除${name}吗`, 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      loading.value = true
      axios
        .delete('/api/Cinema/' + id)
        .then(() => {
          let targetIndex = cinemas.value.findIndex((cinema) => cinema.cinemaId == id)
          cinemas.value.splice(targetIndex, 1) //同时维护前端电影数组
          // console.log(movies.value)
          loading.value = false
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'error',
            message: '删除失败！'
          })
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })
}

const editCinemaEnter = (cinemaId: string) => {
  editingCinemaId.value = cinemaId
  editShow.value = true
}

const formRef = ref<FormInstance>(null)
const formReset = () => {
  formStatus.value = false
  newCinema.value = new Cinema()
  formRef.value.resetFields()
}

const handleClose = () => {
  if (!formStatus.value) {
    drawer.value = false
    formReset()
    return
  }
  ElMessageBox.confirm('表单中还有填写的数据，要丢弃吗', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    drawer.value = false
    formReset()
  })
}

const confirmForm = async function () {
  //表单确认函数
  if (!formRef.value) {
    console.log('form is NULL！')
    return
  }
  console.log('开始进行表单检查！')
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      console.log('表单合法！')
      //...前后端交互数据
      loading.value = true
      axios
        .put('/api/Cinema', newCinema.value)
        .then((res) => {
          if (res.data.status == '10000') {
            let newC = new Cinema()
            Object.assign(newC, newCinema.value)
            cinemas.value.push(newC)

            ElMessage({
              type: 'success',
              message: '添加成功！'
            })

            total.value += 1
            drawer.value = false
            formReset()
          } else if (res.data.status == '10001') {
            console.log(res.data.message)
            ElMessage({
              type: 'error',
              message: '添加失败！'
            })
          }
        })
        .catch((err) => {
          console.log(err)
          ElMessage({
            type: 'error',
            message: '添加失败！'
          })
        })

      loading.value = false
    } else {
      //表单提交失败
      console.log('表单不合法！', fields)
    }
  })
}

const cancelForm = () => {
  if (!formStatus.value) {
    drawer.value = false
    formReset()
    return
  }
  ElMessageBox.confirm('表单中还有填写的数据，要丢弃吗', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    drawer.value = false
    formReset()
    //退出表单，放弃提交，丢弃数据
  })
  // .catch(() => {
  //     //点击取消，返回表单继续填写
  // })
}

const editingCinemaId = ref('')
const editShow = ref(false)
const editRef = ref<CinemaManage>(null)
const handleEditClose = () => {
  editRef.value.cancelForm()
}
</script>

<template>
  <h1 class="text-2xl font-bold">影院管理</h1>
  <el-divider />
  <topBar />
  <el-table
    v-loading="loading"
    :data="cinemas.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
    style="width: 100%"
    :header-cell-style="{ backgroundColor: 'purple', color: 'white' }"
  >
    <el-table-column prop="cinemaId" label="影院id" align="left" min-width="10%"></el-table-column>
    <el-table-column prop="name" label="影院名" align="left" min-width="20%"></el-table-column>
    <el-table-column prop="location" label="地址" align="center" min-width="25%"></el-table-column>
    <el-table-column label="标签" align="center" min-width="30%">
      <template #default="scope">
        <el-space wrap size="small" direction="horizontal">
          <el-tag
            v-for="tag in cinemas[scope.$index]._feature.split(',')"
            :key="tag"
            size="small"
            color="rgba(90,0,90,.4)"
            effect="dark"
            disable-transitions
            >{{ tag }}
          </el-tag>
        </el-space>
      </template>
    </el-table-column>
    <el-table-column align="right" min-width="15%">
      <template #header>
        <el-button size="small" type="success" @click="drawer = true">添加影院</el-button>
      </template>
      <template #default="scope">
        <el-button size="small" @click="editCinemaEnter(scope.row.cinemaId)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="cinemaDelete(scope.row.name, scope.row.cinemaId)"
          >删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页栏 -->
  <el-pagination
    background
    layout="prev, pager, next"
    v-model:total="total"
    v-model:page-size="pageSize"
    v-model:current-page="currentPage"
  />

  <!-- 添加电影的弹框表单 -->
  <el-drawer
    v-model="drawer"
    title="添加影院"
    direction="rtl"
    :before-close="handleClose"
    size="50%"
  >
    <!-- 表单 -->
    <el-form :model="newCinema" label-width="120px" class="newCinemaForm" ref="formRef" status-icon>
      <!-- 电影海报上传 -->
      <el-form-item label="影院图片">
        <el-input
          v-model="newCinema.cinemaImageUrl"
          @change="formStatus = true"
          placeholder="请输入电影海报URL"
        >
          <template #append>URL</template>
        </el-input>
        <img
          v-if="newCinema.cinemaImageUrl"
          :src="newCinema.cinemaImageUrl"
          alt=""
          height="300"
          width="300"
          style="object-fit: contain; margin: 5px 0"
        />
      </el-form-item>

      <el-form-item
        label="影院Id"
        prop="cinemaId"
        :rules="{ required: true, message: '影院Id不能为空', trigger: 'blur' }"
      >
        <el-input
          v-model="newCinema.cinemaId"
          @change="formStatus = true"
          placeholder="请输入影院Id"
          trigger="blur"
        />
      </el-form-item>

      <el-form-item
        label="影院名称"
        prop="name"
        :rules="{ required: true, message: '影院名称不能为空', trigger: 'blur' }"
      >
        <el-input
          v-model="newCinema.name"
          @change="formStatus = true"
          placeholder="请输入影院名称"
          trigger="blur"
        />
      </el-form-item>

      <el-form-item
        label="影院地址"
        prop="location"
        :rules="{ required: true, message: '影院地址不能为空', trigger: 'blur' }"
      >
        <el-input
          v-model="newCinema.location"
          type="textarea"
          @change="formStatus = true"
          :autosize="{ minRows: 2, maxRows: 3 }"
          placeholder="请输入影院地址"
        />
      </el-form-item>

      <el-form-item label="影院标签">
        <el-input
          v-model="newCinema.feature"
          @change="formStatus = true"
          placeholder="请输入影院标签"
          @focus="featureHint = true"
          @blur="featureHint = false"
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 3 }"
        />
        <span
          v-show="featureHint"
          style="
            font: 5px 'Fira Sans', serif;
            margin: 2px 0 0 0;
            padding: 0;
            color: red;
            font-weight: bold;
          "
        >
          标签之间请用半角逗号`,`隔开
        </span>
      </el-form-item>
      <el-form-item
        label="管理员ID"
        prop="managerId"
        :rules="{ required: true, message: '管理员Id不能为空', trigger: 'blur' }"
      >
        <el-input
          v-model="newCinema.managerId"
          @change="formStatus = true"
          placeholder="请输入管理员Id"
        />
      </el-form-item>

      <!--      <el-form-item label="管理员邮箱" prop="managerEmail" :rules="emailRules">-->
      <!--        <el-input v-model="newCinema.managerEmail" @change="formStatus = true" placeholder="请输入管理员邮箱" clearable />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="管理密码" prop="managerPassWD"-->
      <!--                    :rules="{ required: true, message: '管理密码不能为空', trigger: 'blur' }">-->
      <!--        <el-input v-model="newCinema.managerPassWD" @change="formStatus = true" placeholder="请输入管理密码" show-password/>-->
      <!--      </el-form-item>-->
    </el-form>

    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelForm">取消</el-button>
        <el-button type="success" @click="confirmForm()">添加</el-button>
      </div>
    </template>
  </el-drawer>

  <el-drawer
    v-model="editShow"
    title="编辑影院"
    direction="rtl"
    :before-close="handleEditClose"
    destroy-on-close
    style="min-width: 800px"
  >
    <CinemaInfo :cinemaId="editingCinemaId" v-model="editShow" ref="editRef" />
  </el-drawer>
</template>

<style scoped>
.el-pagination {
  margin: 20px 0;
  justify-content: center;
}
</style>
