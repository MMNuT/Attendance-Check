const state = {
  isScreenLarge: false,
  clientWidth: 0,
  clientHeight: 0,
  low576: false
}

const mutations = {
  TOGGLE_SCREEN_LARGE (state, boo) {
    state.isScreenLarge = boo
  },
  SET_CLIENTWIDTH (state, clientWidth) {
    state.clientWidth = clientWidth
  },
  SET_CLIENTHEIGHT (state, clientHeight) {
    state.clientHeight = clientHeight
  },
  TOGGLE_SCREEN_LOW576 (state, boo) {
    state.low576 = boo
  }
}

const actions = {
  toggleScreenLarge ({ commit }, boo) {
    commit('TOGGLE_SCREEN_LARGE', boo)
  },
  setClientWidth ({ commit }, clientWidth) {
    commit('SET_CLIENTWIDTH', clientWidth)
  },
  setClientHeight ({ commit }, clientHeight) {
    commit('SET_CLIENTHEIGHT', clientHeight)
  },
  toggleScreenLow576 ({ commit }, boo) {
    commit('TOGGLE_SCREEN_LOW576', boo)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
