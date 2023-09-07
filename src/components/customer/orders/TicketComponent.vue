<script setup lang="ts">
import type { TicketDetail } from '@/models/QuickType/TicketDetail'
import { ElCard, ElLoading, ElMessage } from 'element-plus'
import type { TicketSideInfo } from '@/models/QuickType/TicketSideInfo'
import moment from 'moment'
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import CommentComponent from '@/components/customer/orders/CommentComponent.vue'

interface Props {
  ticket: TicketDetail[]
  sideInfo: TicketSideInfo
  commented: boolean
}

const props = defineProps<Props>()

const isOpen = computed(() => moment().isBefore(props.sideInfo.session.startTime))
const isOver = computed(() =>
  moment().isAfter(moment(props.sideInfo.session.startTime).add(30, 'minutes'))
)
const cantGet = computed(() => selected.value.size === 0 || isOver.value)

const selected = ref<Set<string>>(new Set())

const selectHandler = {
  get: function (target, name) {
    return selected.value.has(props.ticket[name]?.id)
  },
  set: function (target, name, value) {
    if (value && props.ticket[name]) {
      selected.value.add(props.ticket[name].id)
    } else if (!value && props.ticket[name]) {
      selected.value.delete(props.ticket[name].id)
    }
    return true
  }
}

const obj = {}
const selectProxy = new Proxy(obj, selectHandler)

const selectAll = computed({
  get: () => {
    return selected.value.size === props.ticket.filter((t) => t.draw === 0).length
  },
  set: (value: boolean) => {
    if (value) {
      props.ticket.forEach((v) => {
        if (v.draw === 0) {
          selected.value.add(v.id)
        }
      })
    } else {
      selected.value.clear()
    }
    return true
  }
})

const ticketSecretCode = ref('')
const showQrDialog = ref(false)

const getTicket = () => {
  const loading = ElLoading.service({
    lock: true,
    text: '请稍候'
  })

  let form = new FormData()
  selected.value.forEach((v) => form.append('id', v))

  axios
    .post('/api/Ticket/getTicketCode', form)
    .then((res) => {
      loading.close()
      if (res.data.status && res.data.status === '10000') {
        ticketSecretCode.value = res.data.data
        showQrDialog.value = true
      } else {
        ElMessage({
          message: `请求取票码失败：${res.data.message}`,
          type: 'warning'
        })
      }
    })
    .catch(() => {
      loading.close()
      ElMessage({
        message: `请求取票码失败：网络错误`,
        type: 'warning'
      })
    })
}

const showCommentDialog = ref(false)
const scd = () => {
  showCommentDialog.value = true
}
const cs = () => {
  window.location.reload()
}
</script>

<template>
  <el-card class="mx-10 px-5">
    <div class="flex">
      <div class="flex items-center">
        <el-image
          :src="sideInfo.movie.postUrl"
          fit="contain"
          style="max-width: 80px; max-height: 150px"
        />
        <div class="ml-4">
          <div class="flex items-center">
            <h2 class="text-xl font-bold">{{ sideInfo.movie.name }}</h2>
            <h3 class="ml-3 text-sm">{{ sideInfo.session.language }}</h3>
            <h3 class="ml-3 text-sm">{{ sideInfo.session.dimesion }}</h3>
          </div>
          <div class="flex mt-3">
            <h2>{{ moment(sideInfo.session.startTime).format('LL') }}</h2>
            <h2 class="ml-3">{{ sideInfo.session.hallLocatedAt.cinemaBelongTo.name }}</h2>
            <h2 class="ml-3">{{ parseInt(sideInfo.session.hallLocatedAt.id) }}号厅</h2>
          </div>
          <div class="flex items-center mt-3">
            <h2 class="text-2xl">
              {{ moment(sideInfo.session.startTime).format('LT') }}-{{
                moment(sideInfo.session.startTime)
                  .add(parseInt(sideInfo.movie.duration), 'm')
                  .format('LT')
              }}
            </h2>
          </div>
        </div>
      </div>
      <div class="grow" />
      <div>
        <el-tag effect="dark" v-if="isOpen" type="success" round>未开场</el-tag>
        <el-tag effect="dark" v-else-if="isOver" type="info" round>已结束</el-tag>
        <el-tag effect="dark" v-else type="success" round>已开场</el-tag>
      </div>
    </div>
    <div class="mt-5">
      <h2 class="mb-2 font-bold">影票列表</h2>
      <div v-for="(t, i) in ticket" :key="t" class="mb-1">
        <div class="flex items-center">
          <el-checkbox v-model="selectProxy[i]" :disabled="t.draw === 1" />
          <h3 class="ml-3">
            <strong>{{ t.row }}</strong> 排 <strong>{{ t.col }}</strong> 列
          </h3>
          <div class="ml-5">
            <el-tag v-if="t.state === 0">{{ t.draw > 0 ? '已取票' : '未取票' }}</el-tag>
            <el-tag v-else-if="t.state === 1" type="warning">已退票</el-tag>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 flex items-center">
      <el-checkbox v-model="selectAll" label="全选" />
      <div class="grow" />
      <el-button v-if="isOver && !commented" @click="scd">发表评论</el-button>
      <el-button v-else-if="isOver && commented" @click="scd">修改评论</el-button>
      <el-button type="success" :disabled="cantGet" @click="getTicket">查看取票码</el-button>
    </div>

    <el-dialog v-model="showQrDialog" title="取票码" align-center width="400">
      <div class="flex">
        <div class="grow" />
        <div class="text-center">
          <vue-qrcode :value="ticketSecretCode" />
          <h3 class="mb-5">十分钟内使用有效</h3>
        </div>
        <div class="grow" />
      </div>
    </el-dialog>

    <el-dialog v-model="showCommentDialog" title="评论" align-center width="600">
      <CommentComponent :movie-id="ticket[0].movieId" @success="cs" />
    </el-dialog>
  </el-card>
</template>

<style scoped></style>
