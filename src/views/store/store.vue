<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row stripe>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="s_id" align="center">
        <template slot-scope="scope">
          {{scope.row.s_id}}
        </template>
      </el-table-column>
      <el-table-column label="公司ID" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.c_id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="品牌ID" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.b_id}}
        </template>
      </el-table-column>
      <el-table-column label="门店名称" align="center">
        <template slot-scope="scope">
          {{scope.row.s_name}}
        </template>
      </el-table-column>
      <el-table-column label="所属商圈" align="center">
        <template slot-scope="scope">
          {{scope.row.s_business}}
        </template>
      </el-table-column>
      <el-table-column label="具体地址" align="center">
        <template slot-scope="scope">
          {{scope.row.s_address}}
        </template>
      </el-table-column>
      <el-table-column label="门店电话" align="center">
        <template slot-scope="scope">
          {{scope.row.s_tel}}
        </template>
      </el-table-column>
      <el-table-column label="负责人" align="center">
        <template slot-scope="scope">
          {{scope.row.s_person}}
        </template>
      </el-table-column>
      <el-table-column label="负责人电话" align="center">
        <template slot-scope="scope">
          {{scope.row.s_phone}}
        </template>
      </el-table-column>
      <el-table-column label="入驻时间" align="center">
        <template slot-scope="scope">
          {{scope.row.s_addtime}}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{scope.row.s_state}}
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/store'

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
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(res => {
        this.list = res.data
        this.listLoading = false
        console.log(res.data)
      })
    }
  }
}
</script>
