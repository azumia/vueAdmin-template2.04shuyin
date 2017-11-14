<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row stripe>
      <el-table-column align="center" label='ID' width="95">
        <template scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="id" align="center">
        <template scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="uid" align="center">
        <template scope="scope">
          {{scope.row.uid}}
        </template>
      </el-table-column>
      <el-table-column label="平台昵称" align="center">
        <template scope="scope">
          <span>{{scope.row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信昵称" align="center">
        <template scope="scope">
          <span>{{scope.row.oldname}}</span>
        </template>
      </el-table-column>
      <el-table-column label="扫码来源" align="center">
        <template scope="scope">
          <span>{{scope.row.f_source}}</span>
        </template>
      </el-table-column>
      <el-table-column label="我秀内容" align="center">
        <template scope="scope">
          <span>{{scope.row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column label="条形码" align="center">
        <template scope="scope">
          <span>{{scope.row.sku}}</span>
        </template>
      </el-table-column>
      <el-table-column label="发表时间" align="center">
        <template scope="scope">
          <span>{{scope.row.addtime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getList } from '@/api/show'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapState([
      'show_type', 'show_page_size', 'show_page_index'
    ])
  },
  methods: {
    ...mapMutations([
      'SAVE_SHOWTYPE', 'SAVE_SHOWPAGESIZE', 'SAVE_SHOWPAGEINDEX'
    ]),
    fetchData() {
      this.listLoading = true
      getList({ type: this.show_type, page_size: this.show_page_size, page_index: this.show_page_index }).then(res => {
        this.list = res.data.rows
        this.listLoading = false
      })
    },
    // 编辑行
    handleEdit(index, row) {

    },
    // 删除行
    handleDelete(index, row) {

    }
  }
}
</script>
