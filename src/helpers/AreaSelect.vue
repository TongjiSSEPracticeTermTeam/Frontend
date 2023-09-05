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
    this.$emit('selected', this.selectedOptions)
    }
}
}
</script>