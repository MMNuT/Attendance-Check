import store from '@/store'

/**
 * Variable:
 * @pRoles 指定角色權限列表, 例如 ['admin']
 * @roles 該 Token 的角色權限列表
 */

const permission = {
  inserted (el, binding) {
    // 獲取指定角色權限
    const { value: pRoles } = binding
    // 獲取 Token 擁有角色
    const roles = store.getters && store.getters.roles
    // 避免傳錯的判斷
    if (pRoles && pRoles instanceof Array && pRoles.length > 0) {
      // 判斷用戶角色是否有包含在指定權限中
      const hasPermission = roles.some(role => pRoles.includes(role))
      // 沒有的話就把該元素幹掉
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('角色權限必須是 Array, 且len > 0, 例如 v-permission=["admin"]')
    }
  }
}

export default permission
