import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

/**
 * 配置項:
 * @hidden 是否隱藏顯示餘側邊欄, Boolean
 * @redirect 設置 'noRedirect' 時, 該路由於麵包屑中不可被點擊
 * @alwaysShow 保證顯示該根路由
 * @meta 路由的信息 Object
 *
 * meta 配置項:
 * @roles 進入路由的權限表, ['auth1', 'auth2']
 * @title 側邊欄和麵包屑中所顯示的名字, String
 * @icon 設置路由的圖標, String
 * @breadcrumb 設置 false 的話, 就不會顯示在麵包屑中
 */

export const constRoutes = [
  {
    path: '/login',
    component: _ => import('@/views/Login'),
    // 導航菜單忽略
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/lecturer',
    component: Layout,
    redirect: '/lecturer/index',
    meta: { roles: ['admin', 'lecturer'] },
    children: [
      {
        path: 'index',
        component: _ => import(/* webpackChunkame: "home" */ '@/views/Lecturer'),
        name: 'Lecturer',
        meta: {
          title: '任課老師',
          icon: 'google'
        }
      },
      {
        path: ':id',
        component: _ => import('@/views/Lecturer/RollCall.vue'),
        name: 'RollCall',
        hidden: true
      }
    ]
  },
  {
    path: '/totur',
    component: Layout,
    redirect: '/totur/index',
    meta: { title: '導師', icon: 'google', roles: ['admin', 'totur'] },
    children: [
      {
        path: 'index',
        name: 'TOTUR',
        component: _ => import(/* webpackChunkame: "home" */ '@/views/Totur/Today'),
        meta: {
          title: '今日'
        }
      },
      {
        path: 'statistics',
        name: 'Statistics',
        redirect: '/totur/index/query',
        component: _ => import(/* webpackChunkame: "home" */ '@/views/Totur'),
        meta: {
          title: '缺曠統計'
        },
        children: [
          {
            path: 'query',
            component: _ => import(/* webpackChunkame: "home" */ '@/views/Totur/Statistics/Query'),
            name: 'Query',
            meta: {
              title: '查詢資料'
            }
          },
          {
            path: 'rank',
            component: _ => import(/* webpackChunkame: "home" */ '@/views/Totur/Statistics/Rank'),
            name: 'Rank',
            meta: {
              title: '缺曠排名'
            }
          },
          {
            path: 'conduct',
            component: _ => import(/* webpackChunkame: "home" */ '@/views/Totur/Statistics/Conduct'),
            name: 'Conduct',
            meta: {
              title: '操行試算'
            }
          }
        ]
      },
      {
        path: 'complaint',
        name: 'Complaint',
        component: _ => import(/* webpackChunkame: "home" */ '@/views/Totur'),
        meta: {
          title: '家長連繫'
        },
        children: [
          {
            path: 'fill-record',
            component: _ => import(/* webpackChunkame: "home" */ '@/views/Totur/Complaint/Fill'),
            name: 'FillRecord',
            meta: {
              title: '填寫紀錄'
            }
          },
          {
            path: 'query-record',
            component: _ => import(/* webpackChunkame: "home" */ '@/views/Totur/Complaint/Query'),
            name: 'QueryRecord',
            meta: {
              title: '查詢記錄'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/admin-staff',
    component: Layout,
    redirect: '/admin-staff/index',
    // meta: { roles: ['admin', 'admin-staff'] },
    meta: { title: '行政人員', icon: 'google' },
    children: [
      {
        path: 'edit',
        component: _ => import(/* webpackChunkame: "home" */ '@/views/Totur'),
        name: 'EDIT',
        meta: {
          title: '查詢修改'
        }
      },
      {
        path: 'copy',
        component: _ => import(/* webpackChunkame: "home" */ '@/views/Totur'),
        name: 'COPY',
        meta: {
          title: '列印通知'
        }
      }
    ]
  },
  {
    path: '/student',
    component: Layout,
    redirect: '/student/index',
    meta: { roles: ['admin', 'student'] },
    children: [
      {
        path: 'index',
        component: _ => import(/* webpackChunkame: "home" */ '@/views/Totur'),
        name: 'Student',
        meta: {
          title: '學生',
          icon: 'google'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes: constRoutes
})

export default router
