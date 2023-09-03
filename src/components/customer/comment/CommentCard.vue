<script setup lang="ts">
import { Comment } from '@/models/QuickType/CommentData'
import moment from "moment";

const props = defineProps<{ comment: Comment }>()
</script>

<template>
  <el-card class="w-full">
    <div class="flex items-center">
      <div class="rounded-full" style="width: 32px; height: 32px">
        <el-image :src="comment.sender.avatarUrl" fit="contain"/>
      </div>
      <h3 class="mx-2 text-gray-400">{{comment.sender.name}}</h3>
      <h3 class="mx-3 text-gray-400">{{moment(comment.publishDate).format("YYYY-MM-DD HH:mm:SS")}}</h3>
      <div class="grow"/>
      <div class="text-sm">
        <font-awesome-icon icon="fa-regular fa-thumbs-up" />
        <span class="ml-1">{{comment.likeCount}}</span>
      </div>
      <div class="text-sm ml-3">
        <font-awesome-icon icon="fa-regular fa-thumbs-down" />
        <span class="ml-1">{{comment.dislikeCount}}</span>
      </div>
    </div>
    <div class="mt-3">
      {{comment.content}}
    </div>
  </el-card>
</template>

<style scoped></style>
