<script lang="ts">

export default {

  data: () => {
    return {
      movies: [
        {
          id: 1,
          name: "荒野之路1",
          duration: 105,
          onDate: "2023-10-24",
          offDate: "2023-12-23"
        },
        {
          id: 2,
          name: "生化危机2",
          duration: 123,
          onDate: "2024-7-3",
          offDate: "2023-10-2"
        },
        {
          id: 3,
          name: "求生之路3",
          duration: 93,
          onDate: "2012-7-3",
          offDate: "2013-10-2"
        },
        {
          id: 4,
          name: "为美好的世界献上祝福红传说2",
          duration: 89,
          onDate: "2024-7-3",
          offDate: "2023-10-2"
        }
      ],
      centerDialogVisible: false,
      selectedMovie: {
        id: -1,
        name: "",
        duration: "",
        onDate: "",
        offDate: "",
      },
      //影院添加的弹出框相关数据管理
      rule: {   //表单检验规则
        posterURL: [
          {
            required: true,
            message: "请输入电影海报URL",
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
      direction: "rtl",
      formStatus: false,
      featureHint: false,
      newMovie: {
        posterURL: "",
        name: "",
        duration: 0,
        feature: "",
        schedule: [],
        intro: "",
      },
    }
  },
  methods: {
    //主面板按钮处理相关函数
    MovieSelection(row) {
      this.selectedMovie.id = row.id;
      this.selectedMovie.name = row.name;
      this.selectedMovie.duration = row.duration;
      this.selectedMovie.onDate = row.onDate;
      this.selectedMovie.offDate = row.offDate;
      // console.log(`选中了${row.name}`);
    },
    MovieDelete() {       //删除选中电影

    },
    //添加面板相关处理函数

    formReset() {         //表单内容重置
      this.formStatus = false;
      this.newMovie.name = "";
      this.newMovie.duration = 0;
      this.newMovie.schedule = [];
      this.newMovie.intro = "";
      this.newMovie.feature = "";
      this.newMovie.PosterURL = "";
    },
    handleClose() {       //退出表单回调函数
      if (!this.formStatus) {
        this.drawer = false;
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
        .catch(() => {
          // catch error
        })
    },
    async confirmForm() {      //表单确认函数
      let formRef = this.$refs.formRef;
      if (!formRef) {
        console.log("form is NULL！");
        return;
      }
      console.log("开始进行表单检查！");
      await formRef.validate((valid, fields) => {
        if (valid) {
          console.log("表单合法！");
          this.drawer = false;
          this.formReset();
          //...前后端交互数据


        }
        else {  //表单提交失败
          console.log('表单不合法！', fields);
        }
      })
    },
    cancelForm() {       //表单取消函数
      if (!this.formStatus) {
        this.drawer = false;
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
        .catch(() => {
          // catch error
        })

    },
  }
}

</script>

<template>
  <el-table :data="movies" style="width: 100%; " :header-cell-style="{ backgroundColor: 'purple', color: 'white' }"
    @row-click="MovieSelection">
    <el-table-column label="序号" type="index" align="left" min-width="10%">
    </el-table-column>
    <el-table-column prop="name" label="电影名" align="left" min-width="30%">
    </el-table-column>
    <el-table-column prop="duration" label="时长(分钟)" align="center" min-width="10%">
    </el-table-column>
    <el-table-column prop="onDate" label="上映日期" align="center" min-width="15%">
    </el-table-column>
    <el-table-column prop="offDate" label="下架日期" align="center" min-width="15%">
    </el-table-column>
    <el-table-column align="right" min-width="20%">
      <template #header>
        <el-button size="small" type="success" @click="drawer = true">添加电影</el-button>
      </template>
      <template #default="scope">
        <el-button size="small">编辑</el-button>
        <el-button size="small" type="danger" @click="centerDialogVisible = true">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 删除电影时弹出的提醒 -->
  <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" align-center>
    <span>确定要删除《{{ selectedMovie.name }}》吗</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确定</el-button>
      </span>
    </template>
  </el-dialog>

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

      <el-form-item label="电影名称" prop="name">
        <el-input v-model="newMovie.name" @change="formStatus = true" placeholder="请输入电影名称" />
      </el-form-item>

      <el-form-item label="电影时长" prop="duration">
        <el-input-number v-model="newMovie.duration" :min="0" @change="formStatus = true" />
      </el-form-item>

      <el-form-item label="电影标签">
        <el-input v-model="newMovie.feature" @change="formStatus = true" placeholder="请输入电影标签" @focus="featureHint = true"
          @blur="featureHint = false" type="textarea" :autosize="{ minRows: 1, maxRows: 3 }" />
        <span v-show="featureHint"
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
        <el-input v-model="newMovie.intro" type="textarea" @change="formStatus = true"
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

<style scoped></style>