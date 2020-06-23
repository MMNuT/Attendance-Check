import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import user from './modules/user'
import lecturer from './modules/lecturer'
import app from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { permission, user, lecturer, app },
  getters: {
    roles: state => state.user.roles,
    token: state => state.user.token,
    permission_routes: state => state.permission.routes,
    clientWidth: state => state.app.clientWidth,
    clientHeight: state => state.app.clientHeight,
    isLow576: state => state.app.low576
  }
})
