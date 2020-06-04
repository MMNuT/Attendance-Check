import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getInfo } from '@/api/user'
import { rolesFormat } from '@/utils/format'

const state = {
  token: getToken(),
  roles: []
  // 其他用戶信息
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  login ({ commit }, userInfo) {
    return login(userInfo).then(res => {
      commit('SET_TOKEN', res.token)
      setToken(res.token)
    })
  },
  getInfo ({ commit, state }) {
    // return getInfo(state.token).then(({ data: roles }) => {
    return getInfo().then(({ data: roles }) => {
      roles = rolesFormat(roles)
      commit('SET_ROLES', roles)
      return { roles }
    })
  },
  resetToken ({ commit }) {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    removeToken()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
