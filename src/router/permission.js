import router from './index'
import store from '@/store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  // 有 TOKEN
  if (hasToken) {
    if (to.path === '/login') {
      // 就不用再登入了
      next({ path: '/' })
    } else {
      // 確認有沒有設置過角色權限
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // 有 TOKEN 且已經拿到角色權限了
      if (hasRoles) {
        // 重定向根目錄到權限第一套路由
        if (to.path === '/') {
          next({ path: '/' + store.getters.roles[0] })
        }
        // 放行
        next()
      } else {
        // 還沒獲取權限
        try {
          // 發請求獲取角色權限
          const { roles } = await store.dispatch('user/getInfo')
          console.log(roles)
          // 根據權限過濾生成路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 添加路由至路由器
          router.addRoutes(accessRoutes)
          // 繼續切換路由, 確保添加完成
          next({ ...to, replace: true })
        } catch (error) {
          console.log(error)
          // 出錯就重置令牌, 重新登入
          store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    // 如果沒有 TOKEN, 看看前往的路徑是否為白名單
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 否則就回到登入也面
      next(`/login?redirect=${to.path}`)
    }
  }
})
