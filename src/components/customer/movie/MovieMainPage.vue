<script setup lang="ts">
import {ref} from "vue";
import tagSelect from "@/components/customer/movie/AttributeSelect.vue"
const tags=ref<string[]>([])
tags.value=['爱情','剧情','动漫','历史','基情','悬疑']
const years=ref<string[]>([])
years.value=['2023','2022','2021','2020','2019']
const selectedTags=ref([])
const selectedYears=ref([])

const tagSelected=(t)=>{
  selectedTags.value=t
  console.log(selectedTags.value)
}

const yearSelected=(t)=>{
  selectedYears.value=t
}
</script>

<template>
  <div class="content">
    <div class="py-5" style="">
      <div style="flex-grow: 1" />
      <div class="mx-5" style="">
        <el-row >
          <el-col :span="3"/>
          <el-col :span="18" class="translucent-card">
            <el-card>
              <tagSelect @selected="tagSelected" :label="'类型'" :tags="tags" ></tagSelect>
              <tagSelect @selected="yearSelected" :label="'年份'" :tags="years" ></tagSelect>
            </el-card>
          </el-col>
          <el-col :span="3"/>
        </el-row>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>