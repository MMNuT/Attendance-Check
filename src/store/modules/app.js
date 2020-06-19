const state = {
  isScreenLarge: false
}

const mutations = {
  TOGGLE_SCREEN_LARGE (state, boo) {
    state.isScreenLarge = boo
  }
}

const actions = {
  toggleScreenLarge ({ commit }, boo) {
    commit('TOGGLE_SCREEN_LARGE', boo)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
