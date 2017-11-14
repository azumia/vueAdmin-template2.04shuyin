
// ---------我秀模块-----------
// 保存秀显示类型
const SAVE_SHOWTYPE = 'SAVE_SHOWTYPE'
// 保存秀每页数量
const SAVE_SHOWPAGESIZE = 'SAVE_SHOWPAGESIZE'
// 保存秀每页数量
const SAVE_SHOWPAGEINDEX = 'SAVE_SHOWPAGEINDEX'

export default {
  [SAVE_SHOWTYPE](state, payload) {
    state.show_type = payload.show_type
  },
  [SAVE_SHOWPAGESIZE](state, payload) {
    state.show_page_size = payload.show_page_size
  },
  [SAVE_SHOWPAGEINDEX](state, payload) {
    state.show_page_index = payload.show_page_index
  }
}
