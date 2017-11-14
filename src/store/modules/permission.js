import { constantRouterMap } from '@/router/index'

const permission = {
  namespaced: true,
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, payload) => {
      state.addRouters = payload.routers
      state.routers = constantRouterMap.concat(payload.routers)
    }
  }
}

export default permission
