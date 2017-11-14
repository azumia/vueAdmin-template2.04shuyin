import { getToken } from '@/utils/auth'

const user = {
  namespaced: true,
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, payload) => {
      state.token = payload.token
    },
    SET_NAME: (state, payload) => {
      state.name = payload.name
    },
    SET_AVATAR: (state, payload) => {
      state.avatar = payload.avatar
    },
    SET_ROLES: (state, payload) => {
      state.roles = payload.roles
    }
  }
}

export default user
