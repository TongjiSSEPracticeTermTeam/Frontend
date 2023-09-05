<template>
<div>
    <el-cascader
    size="default"
    :options="pcaTextArr"
    v-model="selectedOptions"
    @change="handleChange">
    </el-cascader>
</div>
</template>

<script>
import { pcaTextArr } from 'element-china-area-data'
export default {
data () {
    return {
    pcaTextArr,
    selectedOptions: []
    }
},
methods: {
    handleChange() {
        //返回选中的省市区，将selectedOptions数组转化为一个string存储在selectedArea中
        let selectedArea = this.selectedOptions.join('')
        this.$emit('selected', selectedArea)
    }
}
}
</script>