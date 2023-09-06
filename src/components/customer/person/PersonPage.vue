<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref, computed} from 'vue'
import UploadImage from '@/helpers/UploadImage.vue'
import type { FormInstance, FormRules } from 'element-plus'
import User from '@/models/User'

const props = defineProps({
    user: {
        type: User,
        required: true
    },
    detailPerson: {
        type: Boolean,
        required: true
    },
})
const emit = defineEmits(['update:detailPerson'])
const detailPerson = computed({
    get: () => props.detailPerson,
    set: val => emit('update:detailPerson', val)
})

let editStatus = ref(false)
const savingDetail = ref(false)
let formRef = ref<FormInstance | null>(null)
let saving = ref(false)

const rules = ref<FormRules<any>>({
  //表单检验规则
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  email:[
    {
        required: true,
        message: '请输入邮箱',
        trigger: 'blur'
    }
  ],
  avatarUrl: [
    {
      required: true,
      message: '请输入头像URL',
      trigger: 'blur'
    }
  ],
})

const handleDrawerClose = () => {
    if (editStatus.value) {
        console.log("have change")
        console.log(detailPerson.value)
        ElMessageBox.confirm('有未保存的数据，确定要退出编辑吗？', 'Warning', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(() => {
                formRef.value?.clearValidate()
                detailPerson.value = false
                editStatus.value = false
            })
            .catch(() => {
            })
    } else {
        console.log("no change")
        console.log(detailPerson.value)

        detailPerson.value = false
        editStatus.value = false
    }
}

const saveDetail = async () => {
  if (!formRef.value || !editStatus.value) {
    console.log('表单无改动内容')
    return
  }
  //内容有改动
  await formRef.value.validate((valid, fields) => {
    // 表单检验

    if (valid) {
      saving.value = true

      axios
        .post('/api/Movies', currentMovie.value)
        .then((res) => {
          savingDetail.value = false
          if (res.data && res.data.status && res.data.status === '10000') {
            ElMessage({
              message: '修改成功',
              type: 'success'
            })
            detailView.value = false
            updateTable()
          } else {
            ElMessage({
              message: `修改失败：${res.data.message}`,
              type: 'warning'
            })
          }
        })
        .catch(() => {
          savingDetail.value = false
        })
      formRef.value?.clearValidate()
      editStatus.value = false
    } else {
      console.log('表单不合法', fields)
    }
  })
}

</script>



<template>
    <el-drawer v-model="detailPerson" title="个人主页" direction="rtl" :before-close="handleDrawerClose"
        style="min-width: 500px">
        <el-form :model="user" label-width="120px" :rules="rules" ref="formRef">

            <el-form-item label="头像" class="w-full">
                <el-space direction="vertical" alignment="normal" wrap>
                    <el-input v-model="user.avatarUrl" :rows="3" type="textarea" style="width: 350px"
                        @change="editStatus = true" />
                    <el-image :src="user.avatarUrl" :fit="'contain'" style="height: 300px; width: 300px">
                        <template #error>
                            <el-icon>
                                <Picture />
                            </el-icon>
                        </template>
                    </el-image>
                    <UploadImage api-path="/api/Customer/poster" @Success="(Url: string) => {
                        user.avatarUrl = Url
                        editStatus = true
                    }" />
                </el-space>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="user.displayName" @change="() => { editStatus = true }" />
            </el-form-item>

            <el-form-item label="邮箱">
                <el-input v-model="user.email" @change="() => { editStatus = true }" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="saveDetail" v-loading="savingDetail">保存</el-button>
                <el-button @click="handleDrawerClose">取消</el-button>
            </el-form-item>

        </el-form>
    </el-drawer>
</template>