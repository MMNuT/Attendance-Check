import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import user from './modules/user'
import lecturer from './modules/lecturer'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { permission, user, lecturer },
  getters: {
    roles: state => state.user.roles,
    token: state => state.user.token,
    permission_routes: state => state.permission.routes
  }
})
