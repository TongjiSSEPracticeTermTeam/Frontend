<script>
import axios from "axios";
import topBar from "./topBar.vue"
import { ElMessage } from "element-plus";

export default {
  components: {
    topBar
  },
  data: () => {
    return {
      baseURL: 'https://localhost:7299',    //换成自己的url即可

      movies: [],
      //表格展示相关数据
      loading: false,
      pageSize: 0,
      total: 0,
      currentPage: 1,
      //影院添加的弹出框相关数据管理
      rule: {   //表单检验规则
        posterURL: [
          {
            required: true,
            message: "请输入电影海报URL",
            trigger: "blur",
          },
        ],
        movieId: [
          {
            required: true,
            message: "请输入电影id",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入电影名称",
            trigger: "blur",
          },
        ],
        duration: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入电影时长"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          }
        ],
        schedule: [
          {
            required: true,
            message: "请设置电影档期",
            trigger: "blur",
          },
        ],
      },
      drawer: false,
      direction: "rtl",     //表单方向
      formStatus: false,    //判断表单是否被修改
      tagsHint: false,
      newMovie: {           //表单数据存储对象
        movieId: "",
        name: "",
        duration: 0,
        instruction: "",
        posterURL: "",
        tags: "",
        schedule: [],
      },
    }
  },
  mounted() {
    // console.log("准备初始化数据");
    let obj = this;
    // 前后端交互，初始化数据和相关参数
    this.loading = true;        //加载等待动画
    axios.get(this.baseURL + '/api/Movie')
      .then(function (response) {
        // 处理成功情况
        obj.movies = response.data;
        // console.log(obj.movies);
        //处理日期至年月日
        for (let i = 0; i < obj.movies.length; i++) {
          let str1 = obj.movies[i].releaseDate;
          let str2 = obj.movies[i].removalDate;
          obj.movies[i].releaseDate = str1.slice(0, str1.indexOf('T'));
          obj.movies[i].removalDate = str2.slice(0, str2.indexOf('T'));
        }
        console.log(obj.movies);

        //分页相关设置
        obj.total = obj.movies.length;
        obj.pageSize = 12;
        obj.loading = false;
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
        ElMessageBox.alert("数据加载失败！", "错误", {
          // if you want to disable its autofocus
          // autofocus: false,
          confirmButtonText: 'OK',
          callback: () => {
            ElMessage.error("数据加载错误")
          },
        })

      })
  },
  methods: {
    //主面板表格按钮处理相关函数
    MovieDelete(name, id) {     //删除选中电影
      let obj = this;
      ElMessageBox.confirm(
        `确定要删除《${name}》吗`,
        'Warning',
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: 'warning',
        }
      )
        .then(() => {
          obj.loading = true;
          axios.delete(this.baseURL + "/api/Movie/deleteMovieById/" + id)
            .then(() => {
              let targetIndex = obj.movies.findIndex(movie => movie.movieId == id);
              obj.movies.splice(targetIndex, 1);      //同时维护前端电影数组
              // console.log(obj.movies);
              obj.loading = false;
              ElMessage({
                type: 'success',
                message: `《${name}》删除成功`,
              })
            }
            )
            .catch(() => {
              ElMessage({
                type: 'error',
                message: "删除失败！",
              })
            }
            )
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: "取消删除",
          })
        })
    },
    editMovieEnter(movieId) {    //处理电影编辑页面的跳转
      this.$router.push({ path: `${this.$route.path}/${movieId}` });
    },
    //添加面板表单相关处理函数
    formReset() {         //表单内容重置
      this.formStatus = false;
      this.newMovie.name = "";
      this.newMovie.duration = 0;
      this.newMovie.schedule = [];
      this.newMovie.instruction = "";
      this.newMovie.tags = "";
      this.newMovie.posterURL = "";
      this.newMovie.movieId = "";
      this.$refs.formRef.resetFields();
    },
    handleClose() {       //退出表单回调函数
      if (!this.formStatus) {
        this.drawer = false;
        this.formReset();
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
      // .catch(() => {
      //   // catch error
      // })
    },
    async confirmForm() {      //表单确认函数
      let formRef = this.$refs.formRef;
      if (!formRef) {
        console.log("form is NULL");
        return;
      }
      console.log("开始进行表单检查！");
      await formRef.validate((valid, fields) => {
        if (valid) {
          console.log("表单合法！");

          let obj = this;
          //...前后端交互数据
          this.loading = true;
          axios.post(this.baseURL + "/api/Movie/add", {
            movie_id: obj.newMovie.movieId,
            name: obj.newMovie.name,
            duration: String(obj.newMovie.duration),
            instruction: obj.newMovie.instruction,
            poster_url: obj.newMovie.posterURL,
            tags: obj.newMovie.tags,
            release_date: obj.newMovie.schedule[0],
            removal_date: obj.newMovie.schedule[1]
          }).then((res) => {
            if (res.data.status == "10000") {    //添加成功

              obj.movies.push({     //维护前端电影数组
                movieId: obj.newMovie.movieId,
                name: obj.newMovie.name,
                duration: String(obj.newMovie.duration),
                instruction: obj.newMovie.instruction,
                posterUrl: obj.newMovie.posterURL,
                tags: obj.newMovie.tags,
                releaseDate: obj.newMovie.schedule[0],
                removalDate: obj.newMovie.schedule[1]
              });

              ElMessage({
                type: "success",
                message: '添加成功！'
              })

              obj.total += 1;
              obj.drawer = false;
              obj.formReset();
            }
            else {    //添加失败
              console.log(res.data.message);
              ElMessage({
                type: "error",
                message: "添加失败！"
              })
            }
          }).catch((res) => {
            console.log(res)
            ElMessage({
              type: "error",
              message: "添加失败！"
            })

          })
          obj.loading = false;
        }
        else {  //表单提交失败
          console.log('表单不合法！', fields);
        }
      })
    },
    cancelForm() {       //表单取消函数
      if (!this.formStatus) {
        this.drawer = false;
        this.formReset();
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
      // .catch(() => {
      //   // catch error
      // })

    },
  }
}

</script>

<template>
  <topBar />

  <el-table v-loading="loading" :data="movies.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
    style="width: 100%; " :header-cell-style="{ backgroundColor: 'purple', color: 'white' }">
    <el-table-column prop="movieId" label="电影id" align="left" min-width="10%">
    </el-table-column>
    <el-table-column prop="name" label="电影名" align="left" min-width="30%">
    </el-table-column>
    <el-table-column prop="duration" label="时长(分钟)" align="center" min-width="15%">
    </el-table-column>
    <el-table-column prop="releaseDate" label="上映日期" align="center" min-width="15%">
    </el-table-column>
    <el-table-column prop="removalDate" label="下架日期" align="center" min-width="15%">
    </el-table-column>
    <el-table-column align="right" min-width="15%">
      <template #header>
        <el-button size="small" type="success" @click="drawer = true">添加电影</el-button>
      </template>
      <template #default="scope">
        <el-button size="small" @click="editMovieEnter(scope.row.movieId)">编辑</el-button>
        <el-button size="small" type="danger" @click="MovieDelete(scope.row.name, scope.row.movieId)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页栏 -->
  <el-pagination background layout="prev, pager, next" v-model:total="total" v-model:page-size="pageSize"
    v-model:current-page="currentPage" />

  <!-- 添加电影的弹框表单 -->
  <el-drawer v-model="drawer" title="添加电影" :direction="direction" :before-close="handleClose" size="50%">
    <!-- 表单 -->
    <el-form :model="newMovie" label-width="120px" class="newMovieForm" :rules="rule" ref="formRef" status-icon>
      <!-- 电影海报上传 -->
      <el-form-item label="电影海报" prop="posterURL">
        <el-input v-model="newMovie.posterURL" @change="formStatus = true" placeholder="请输入电影海报URL">
          <template #append>URL</template>
        </el-input>
        <img v-if="newMovie.posterURL" :src="newMovie.posterURL" height="350" width="250"
          style="object-fit: contain; margin: 5px 0;">
      </el-form-item>

      <el-form-item label="电影id" prop="movieId">
        <el-input v-model="newMovie.movieId" @change="formStatus = true" placeholder="请输入电影id" />
      </el-form-item>

      <el-form-item label="电影名称" prop="name">
        <el-input v-model="newMovie.name" @change="formStatus = true" placeholder="请输入电影名称" />
      </el-form-item>

      <el-form-item label="电影时长" prop="duration">
        <el-input-number v-model="newMovie.duration" :min="0" @change="formStatus = true" />
      </el-form-item>

      <el-form-item label="电影标签">
        <el-input v-model="newMovie.tags" @change="formStatus = true" placeholder="请输入电影标签" @focus="tagsHint = true"
          @blur="tagsHint = false" type="textarea" :autosize="{ minRows: 1, maxRows: 3 }" />
        <span v-show="tagsHint"
          style="font: 5px 'Fira Sans', serif; margin: 2px 0 0 0; padding: 0;color: red; font-weight: bold;">
          标签之间请用半角逗号`,`隔开
        </span>
      </el-form-item>

      <el-form-item label="电影档期" prop="schedule">
        <el-date-picker unlink-panels value-format="YYYY-MM-DD" v-model="newMovie.schedule" type="daterange"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="formStatus = true">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="电影简介">
        <el-input v-model="newMovie.instruction" type="textarea" @change="formStatus = true"
          :autosize="{ minRows: 4, maxRows: 7 }" placeholder="请输入电影简介" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelForm">取消</el-button>
        <el-button type="success" @click="confirmForm">添加</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped>
.el-pagination {
  margin: 20px 0;
  justify-content: center;
}
</style>