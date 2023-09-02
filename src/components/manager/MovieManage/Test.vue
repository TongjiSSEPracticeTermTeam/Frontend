<template>
    <div>
        <el-input v-model="searchInfo" placeholder="请输入搜索关键字" />
        <el-button @click="handleSearch">搜索</el-button>
        <el-dialog v-model="dialogVisible" title="评论管理">
        <CommentManage :initialSearchInfo="searchInfo" />
        </el-dialog>
    </div>
</template>
  
<script>
import { ref } from 'vue'
import CommentManage from '@/components/manager/MovieManage/CommentManage.vue'

export default {
    components: {
    CommentManage
        },
        setup() {
        const searchInfo = ref('')
        const dialogVisible = ref(false)

        const handleSearch = () => {
            dialogVisible.value = true
        }

        return {
            searchInfo,
            dialogVisible,
            handleSearch
        }
    }
}
</script>