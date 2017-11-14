import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 秀类型0所有，1已审核，2未审核
    show_type: 0,
    show_page_size: 15,
    show_page_index: 1
  },
  modules: {
    app,
    user,
    permission
  },
  mutations
})

export default store
