import { constRoutes, asyncRoutes } from '@/router'

function hasPermission (roles, route) {
  // @roles-用戶擁有的角色, @route-路由
  // 當前路由有設置角色權限的話
  if (route.meta && route.meta.roles) {
    // 看看用戶角色是否包含在路由角色權限中, 有就返回 true
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 沒有設置角色權限, 那就是大家都能看見的路由
    return true
  }
}

// 過濾一下路由
function filterAsyncRoutes (routes, roles) {
  const res = []

  // 循環路由
  routes.forEach(route => {
    // 複製一份
    const tmp = { ...route }
    // 如果角色存在於該路由的角色列表中
    if (hasPermission(roles, tmp)) {
      // 如果他有子路由, 遞歸過濾
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      // 把該路由存起來
      res.push(tmp)
    }
  })
  return res
}

const state = {
  // 用戶的完整可訪問路由表
  routes: [],
  // 用戶可訪問的動態添加路由
  addRoutes: []
}

const mutations = {
  SET_ROUTES (state, routes) {
    state.addRoutes = routes
    state.routes = constRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes ({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // 如果角色有 admin 就全部路由都給
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        // 否則的話, 根據角色過濾
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
