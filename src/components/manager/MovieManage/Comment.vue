<template>
  <div style="display: flex; justify-content: space-between;">
    <el-row>
      <el-col >
        <el-select v-model="sortKey" placeholder="请选择排序方式" @change="sortComments">
          <el-option label="点赞数（最多优先）" value="likeCount"></el-option>
          <el-option label="点踩数（最多优先）" value="dislikeCount"></el-option>
          <el-option label="发表时间（最新发布优先）" value="publishDate"></el-option>
          <el-option label="发表时间（最老发布优先）" value="-publishDate"></el-option>
          <el-option label="用户名（字典序）" value="customerId"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-tooltip content="查看所有评价" placement="top" style="float: right;">
        <template #default>
          <el-switch v-model="isShowAll" />
        </template>
    </el-tooltip>
  </div>

  <div>
    <el-table :data="pagedComments" style="width: 100%">
      <el-table-column prop="commentId" label="评论Id"></el-table-column>
      <el-table-column prop="customerId" label="用户Id"></el-table-column>

      <el-table-column prop="avatarUrl" label="用户头像">
        <template v-slot="{ row }">
          <img :src="row.avatarUrl" alt="avatar" style="width: 50px; height: 50px; border-radius: 50%" />
        </template>
      </el-table-column>
    
      
      <el-table-column label="用户评级" min-width="100px">
        <template v-slot="{ row }">
          <el-rate v-model="row.rating" :show-score="true" :disabled="true"  ></el-rate>
        </template>
      </el-table-column>

      <el-table-column prop="publishDate" label="发表时间"></el-table-column>
      
      <el-table-column label="评论内容">
        <template v-slot="{ row }">
          <div class="comment-content" :class="{ 'comment-content-expanded': row.isOpen }" @click="toggleContent(row)">
            {{ getContent(row) }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="点赞数" >
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
          <el-button type="danger" size="small" @click="banComment(row)" :disabled="row.display === '0'" >屏蔽</el-button>
          <el-button type="primary" size="small" @click="unbanComment(row)" :disabled="row.display === '1'">恢复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background v-model="currentPage" :page-size="pageSize" :total="pageLength" @current-change="handlePageChange"></el-pagination>
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
      showedComments: [],//用来展示的评论
      allCommentData: [],//用来存储所有的评论
      sortKey: '',
      currentPage: 1,
      pageSize: 10,
      pageLength: 0,
      searchIforInput: this.initialSearchInfo,//规定搜索的信息
      searchWay: 'MovieId',//规定搜索的方式，是按照用户id，电影id还是评论id, 默认是电影id
      contentThreshold: 50,//评论内容的阈值
      isShowAll: false//是否显示所有评论
    }
  },
  created() {
    this.fetchComments()
  },
  methods: {
    async fetchComments() {
      try {
        const response = await axios.get(`/api/Comment/by${this.searchWay}/${this.searchIforInput}`);//动态构建API
        this.allCommentData = response.data;
        this.handleData();
      } catch (error) {
        console.error(error)
      }
    },
    handleData() {
      this.showedComments = this.allCommentData.data
      .map(comment => ({
        ...comment,
        isOpen: false,
        rating: comment.score / 2,
        //avatarUrl: comment.avatarUrl ? comment.avatarUrl : 'https://randomuser.me/api/portraits/men/1.jpg'
      }))
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
        this.showedComments.sort((a, b) => b.likeCount - a.likeCount)
      } else if (this.sortKey === 'dislikeCount') {
        this.showedComments.sort((a, b) => b.dislikeCount - a.dislikeCount)
      } else if (this.sortKey === 'publishDate') {
        this.showedComments.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      } else if (this.sortKey === '-publishDate') {
        this.showedComments.sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate))
      }else if (this.sortKey === 'customerId') {
      this.showedComments.sort((a, b) => a.customerId.localeCompare(b.customerId))
    }
    },

    handlePageChange(currentPage) {
      this.currentPage = currentPage
    },

    banComment(row) {

      if (window.confirm('确认屏蔽该评论？')) {
        try {
          axios.post(`/api/Comment/ban/${row.commentId}`) 
        } catch (error) {
          console.error(error)
        }
        // 将该评论的 display 属性设置为 0
        const index = this.showedComments.indexOf(row) // 获取该评论在 showedComments 中的索引
        this.showedComments[index].display = "0"

      }
    },
    unbanComment(row) {
      if (window.confirm('确认恢复该评论？')) {
        try {
          axios.post(`/api/Comment/unban/${row.commentId}`)
        } catch (error) {
          console.error(error)
        }
        // 将该评论的 display 属性设置为 1
        const index = this.showedComments.indexOf(row) // 获取该评论在 showedComments 中的索引
        this.showedComments[index].display = "1"
      }
    },
  
  },
  computed: {
    pagedComments() {
      const startIndex = (this.currentPage - 1) * this.pageSize//计算起始索引
      const endIndex = startIndex + this.pageSize//计算结束索引
      return this.showedComments.filter(comment => comment.display === '1' || this.isShowAll).slice(startIndex, endIndex)
    }
  },
  //如果searchInfoInput变化了，就重新获取评论
  watch: {
    searchIforInput() {
      this.fetchComments()
    },
    //如果initialSearchInfo变化了，searchIforInput需要变化
    initialSearchInfo() {
      this.searchIforInput = this.initialSearchInfo
    },
    pagedComments() {
      this.pageLength = this.showedComments.filter(comment => comment.display === '1' || this.isShowAll).length//计算总的评论数
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