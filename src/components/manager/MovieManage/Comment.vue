<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-select v-model="sortKey" placeholder="请选择排序方式" @change="sortComments">
          <el-option label="点赞数（最多优先）" value="likeCount"></el-option>
          <el-option label="点踩数（最多优先）" value="dislikeCount"></el-option>
          <el-option label="发表时间（最新发布优先）" value="publishDate"></el-option>
          <el-option label="发表时间（最老发布优先）" value="-publishDate"></el-option>
          <el-option label="用户名（字典序）" value="customerId"></el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-table :data="pagedComments" style="width: 100%">
      <el-table-column prop="avatar" label="用户头像">
        <template v-slot="{ row }">
          <img :src="row.avatar" alt="avatar" style="width: 50px; height: 50px; border-radius: 50%" />
        </template>
      </el-table-column>
      
      <el-table-column prop="customerId" label="用户名字"></el-table-column>
      
      <el-table-column label="用户评级">
        <template v-slot="{ row }">
          <el-rate v-model="row.rating" :show-score="true" :disabled="true"  ></el-rate>
        </template>
      </el-table-column>

      <el-table-column prop="publishDate" label="发表时间"></el-table-column>
      
      <el-table-column label="评论内容" >
        <template v-slot="{ row }">
          <div class="comment-content" :class="{ 'comment-content-expanded': row.isOpen }" @click="toggleContent(row)">
            {{ getContent(row) }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="点赞数">
        <template v-slot="{ row }">
          {{ row.likeCount }}
        </template>
      </el-table-column>
      <el-table-column label="点踩数">
        <template v-slot="{ row }">
          {{ row.dislikeCount }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button type="danger" size="small" @click="deleteComment(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model="currentPage" :page-size="pageSize" :total="comments.length" @current-change="handlePageChange"></el-pagination>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  props: {
  initialSearchInfo: {
    type: String,
    default: ''
  }
},
  data() {
    return {
      comments: [],
      commentsData: [],
      isOpenList: [],
      sortKey: '',
      currentPage: 1,
      pageSize: 10,
      searchIforInput: this.initialSearchInfo,//规定搜索的信息
      searchWay: 'MovieId',//规定搜索的方式，是按照用户id，电影id还是评论id, 默认是电影id
      contentThreshold: 50//评论内容的阈值
    }
  },
  created() {
    this.isOpenList = this.comments.map(comment => ({ ...comment, isOpen: false })),
    this.fetchComments()
  },
  methods: {
    async fetchComments() {
      try {
        const response = await axios.get(`/api/Comment/by${this.searchWay}/${this.searchIforInput}`);//动态构建API
        this.commentsData = response.data;
        this.handleData();
      } catch (error) {
        console.error(error)
      }
    },
    handleData() {//处理数据，其中需要把不可展示的内容筛选掉，或者呢，添加一个按钮，显示全部内容
      this.comments = this.commentsData.data,
      this.comments = this.comments.map(comment => ({ ...comment, isOpen: false, rating: comment.score/2 ,avatar: 'https://randomuser.me/api/portraits/men/1.jpg'}))
    },
    getContent(row) {
      if (row.isOpen) {
        return row.content
      } else if (row.content.length > this.contentThreshold) {
        return row.content.slice(0, this.contentThreshold) + '...'
      } else {
        return row.content
      }
    },
    toggleContent(row) {
      row.isOpen = !row.isOpen
    },
    sortComments() {
      if (this.sortKey === 'likeCount') {
        this.comments.sort((a, b) => b.likeCount - a.likeCount)
      } else if (this.sortKey === 'dislikeCount') {
        this.comments.sort((a, b) => b.dislikeCount - a.dislikeCount)
      } else if (this.sortKey === 'publishDate') {
        this.comments.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      } else if (this.sortKey === '-publishDate') {
        this.comments.sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate))
      }else if (this.sortKey === 'customerId') {
      this.comments.sort((a, b) => a.customerId.localeCompare(b.customerId))
  }
    },
    handlePageChange(currentPage) {
      this.currentPage = currentPage
    },
    deleteComment(row) {
      const index = this.comments.indexOf(row)
      if (window.confirm('确认删除该评论？')) {
        this.comments.splice(index, 1)
      }
    }
  },
  computed: {
    pagedComments() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.comments.slice(startIndex, endIndex)
    }
  },
  watch: {
    searchIforInput() {
      this.fetchComments()
    },
    //如果initialSearchInfo变化了，searchIforInput需要变化
    initialSearchInfo() {
      this.searchIforInput = this.initialSearchInfo
      console.log(this.searchIforInput)
    }
  }
}
</script>

<style>
.comment-content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.comment-content-expanded {
  white-space: normal;
  overflow: visible;
  text-overflow: unset;
}
</style>
