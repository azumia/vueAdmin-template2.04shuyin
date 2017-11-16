<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.nickname" @keyup.enter.native="handleFilter" placeholder="昵称" style="width: 200px;"></el-input>
      <el-select v-model="listQuery.type" placeholder="审核状态" clearable>
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" size="mini" border fit highlight-current-row>
       <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table :data="[scope.row]" size="mini" border fit>
              <el-table-column label="身高" align="center">
                <template slot-scope="props" v-popover:popover1>
                  <el-tooltip class="item" effect="dark" content="参考标准：145cm~185cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_height/10 < 145 || props.row.signs.s_height/10 > 185}">{{props.row.signs.s_height/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="颈围" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：32cm~42cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_neck/10 < 32 || props.row.signs.s_neck/10 > 42}">{{props.row.signs.s_neck/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="胸围" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：72cm~109cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_bust/10 < 72 || props.row.signs.s_bust/10 > 109}">{{props.row.signs.s_bust/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="胸下围" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：58cm~97cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_milkaround/10 < 58 || props.row.signs.s_milkaround/10 > 97}">{{props.row.signs.s_milkaround/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="腰围" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：56cm~90cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_waist/10 < 56 || props.row.signs.s_waist/10 > 90}">{{props.row.signs.s_waist/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="腹围" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：70cm~100cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_belly/10 < 70 || props.row.signs.s_belly/10 > 100}">{{props.row.signs.s_belly/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="臀围" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：74cm~106cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_hip/10 < 74 || props.row.signs.s_hip/10 > 106}">{{props.row.signs.s_hip/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="大腿围" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：45cm~70cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_thigh/10 < 45 || props.row.signs.s_thigh/10 > 70}">{{props.row.signs.s_thigh/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="膝围" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：28cm~40cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_knee/10 < 28 || props.row.signs.s_knee/10 > 40}">{{props.row.signs.s_knee/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="小腿围" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：25cm~45cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_calf/10 < 25 || props.row.signs.s_calf/10 > 45}">{{props.row.signs.s_calf/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="踝围" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：16cm~28cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_ankle/10 < 16 || props.row.signs.s_ankle/10 > 28}">{{props.row.signs.s_ankle/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="臂根围" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：30cm~50cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_armroot/10 < 30 || props.row.signs.s_armroot/10 > 50}">{{props.row.signs.s_armroot/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="上臂围" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：20cm~40cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_armwai/10 < 20 || props.row.signs.s_armwai/10 > 40}">{{props.row.signs.s_armwai/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="肘围" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：20cm~30cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_elbow/10 < 20 || props.row.signs.s_elbow/10 > 30}">{{props.row.signs.s_elbow/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="腕围" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：12cm~22cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_wrist/10 < 12 || props.row.signs.s_wrist/10 > 22}">{{props.row.signs.s_wrist/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="臂长" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：48cm~70cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_arm/10 < 48 || props.row.signs.s_arm/10 > 70}">{{props.row.signs.s_arm/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="后背长" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：32cm~46cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_backl/10 < 32 || props.row.signs.s_backl/10 > 46}">{{props.row.signs.s_backl/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="肩宽" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：34cm~46cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_shoulder/10 < 34 || props.row.signs.s_shoulder/10 > 46}">{{props.row.signs.s_shoulder/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="背宽" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：26cm~44cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_backw/10 < 26 || props.row.signs.s_backw/10 > 44}">{{props.row.signs.s_backw/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="胸宽" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：26cm~44cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_chestw/10 < 26 || props.row.signs.s_chestw/10 > 44}">{{props.row.signs.s_chestw/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="胸高" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：20cm~35cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_chesth/10 < 20 || props.row.signs.s_chesth/10 > 35}">{{props.row.signs.s_chesth/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="前身长" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：34cm~50cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_pred/10 < 34 || props.row.signs.s_pred/10 > 50}">{{props.row.signs.s_pred/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="腰高" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：56cm~90cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_waisth/10 < 56 || props.row.signs.s_waisth/10 > 90}">{{props.row.signs.s_waisth/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="腿长" align="center">
                <template slot-scope="props">
                  <el-tooltip class="item" effect="dark" content="参考标准：60cm~100cm" placement="top">
                    <span :class="{'font-danger': props.row.signs.s_legs/10 < 60 || props.row.signs.s_legs/10 > 100}">{{props.row.signs.s_legs/10}}cm</span>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
      <!-- <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column> -->
      <el-table-column label="id" align="center" width="50">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="uid" align="center" width="50">
        <template slot-scope="scope">
          {{scope.row.uid}}
        </template>
      </el-table-column>
      <el-table-column label="平台昵称" align="center" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信昵称" align="center" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.oldname}}</span>
        </template>
      </el-table-column>
      <el-table-column label="扫码来源" align="center" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.f_source}}</span>
        </template>
      </el-table-column>
      <el-table-column label="我秀内容" align="center" width="400">
        <template slot-scope="scope">
          <span>{{scope.row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column label="条形码" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.sku}}</span>
        </template>
      </el-table-column>
      <el-table-column label="发表时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.addtime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" prop="state" align="center" :filters="[{ text: '已审核', value: '1' }, { text: '未审核', value: '0' }, { text: '未通过', value: '2' }]" :filter-method="filterState">
        <template slot-scope="scope">
          <!-- <span>{{scope.row.state}}</span> -->
          <el-tag
          :type="scope.row.state === '0' ? 'danger' : (scope.row.state === '1' ? 'success' : 'warning')"
          close-transition>{{scope.row.state === '0' ? '未审核' : (scope.row.state === '1' ? '已审核' : '未通过')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="结算状态" prop="settled" align="center" :filters="[{ text: '已结算', value: '1' }, { text: '未结算', value: '0' }]" :filter-method="filterSettled">
        <template slot-scope="scope">
          <!-- <span>{{scope.row.state}}</span> -->
          <el-tag
          :type="scope.row.settled === '0' ? 'danger' : 'success'"
          close-transition>{{scope.row.settled == 0 ? '未结算' : '已结算'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" :disabled="scope.row.settled !== '1' ? false : true" type="success" @click="handleEdit(scope.$index, scope.row)">通过</el-button>
          <el-button size="mini" :disabled="scope.row.settled !== '1' ? false : true" type="danger" @click="handleDelete(scope.$index, scope.row)">不通过</el-button>
          <el-button size="mini" :disabled="(scope.row.state === '1' && scope.row.settled === '0') ? false : true" type="primary" @click="handleEdit(scope.$index, scope.row)">结算</el-button>
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
    <el-row>
      <el-col :span="24" class="center">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            :page-sizes="[15, 20, 30, 40]"
            :page-size="listQuery.page_size"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="我秀详情" :visible.sync="detailVisible" width="50%" top="2vh">
      <!-- <el-form label-position="right" :model.sync="detail" class="demo-table-expand">
        <el-form-item label="我秀标题：">
          <span>{{detail.content}}</span>
        </el-form-item>
        <el-form-item label="场景标签：">
          <span>{{detail.label}}</span>
        </el-form-item>
        <el-form-item label="条形码：">
          <span>{{detail.sku}}</span>
        </el-form-item>
        <el-form-item label="发表人：">
          <span>{{detail.nickname}}</span>
        </el-form-item>
        <el-form-item label="发表时间：">
          <span>{{detail.addtime}}</span>
        </el-form-item>
        <el-form-item label="审核状态：">
          <span>{{detail.state === '0' ? '未审核' : (detail.state === '1' ? '已审核' : '未通过')}}</span>
        </el-form-item>
      </el-form> -->
      <p>我秀标题：{{detail.content}}</p>
      <p>场景标签：{{detail.label}}</p>
      <p>条形码：{{detail.sku}}</p>
      <p>发表人：{{detail.nickname}}</p>
      <p>发表时间：{{detail.addtime}}</p>
      <p>审核状态：{{detail.state === '0' ? '未审核' : (detail.state === '1' ? '已审核' : '未通过')}}</p>
      <el-carousel height="600px">
        <el-carousel-item v-for="item in detail.img_list" :key="item" style="text-align: center">
          <img :src="'http://orttx7k7a.bkt.clouddn.com/' + item" alt="" height="100%" >
        </el-carousel-item>
      </el-carousel>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="detailVisible = false" :disabled="detail.settled === 1">通 过</el-button>
        <el-button type="danger" @click="detailVisible = false" :disabled="detail.settled === 1">不通过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getList, getImgList } from '@/api/show'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page_index: 1,
        page_size: 15,
        type: '', // 0未审核，1已审核，2未通过
        nickname: undefined
      },
      options: [{
        value: '0',
        label: '未审核'
      }, {
        value: '1',
        label: '已审核'
      }, {
        value: '2',
        label: '未通过'
      }],
      detailVisible: false,
      detail: {
        content: '',
        label: '',
        sku: '',
        nickname: '',
        addtime: '',
        state: 0,
        settled: 0,
        img_list: []
      }
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
      getList({ nickname: this.listQuery.nickname, type: this.listQuery.type, page_size: this.listQuery.page_size, page_index: this.listQuery.page_index }).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
        this.listLoading = false
      })
    },
    // 编辑行
    handleEdit(index, row) {

    },
    // 删除行
    handleDelete(index, row) {

    },
    // 每页显示条数
    handleSizeChange(val) {
      // 更新当前页码
      this.listQuery.page_size = val
      // 重新获取数据
      this.fetchData()
    },
    // 翻页事件
    handleCurrentChange(val) {
      // 更新当前页码
      this.listQuery.page_index = val
      // 重新获取数据
      this.fetchData()
    },
    // 审核状态过滤（单页）
    filterState(value, row) {
      return row.state === value
    },
    // 结算状态过滤（单页）
    filterSettled(value, row) {
      return row.settled === value
    },
    handleFilter() {
      this.listQuery.page_index = 1
      this.fetchData()
    },
    handleDetail(index, row) {
      var _this = this
      this.detail.content = row.content
      this.detail.label = row.label
      this.detail.sku = row.sku
      this.detail.nickname = row.nickname
      this.detail.addtime = row.addtime
      this.detail.state = row.state
      this.detail.settled = row.settled
      // 获取秀图片列表
      getImgList({ sid: row.id }).then(res => {
        _this.detail.img_list = res.data
        _this.detailVisible = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .center div{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .filter-container {
    margin-bottom: 10px;
  }
  .font-danger {
    color: #FA5555;
  }
  .el-dialog__body {
    overflow-y: scroll
  }
</style>
