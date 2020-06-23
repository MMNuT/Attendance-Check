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
    path: '/'
  },
  {
    path: '/login',
    component: _ => import('@/views/Login'),
    // 導航菜單忽略
    hidden: true
  },
  {
    path: '/404',
    component: _ => import('@/views/Error/404.vue'),
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/lecturer',
    component: Layout,
    redirect: '/lecturer/index',
    meta: { roles: ['lecturer'] },
    children: [
      {
        path: 'index',
        component: _ => import(/* webpackChunkName: "lecturer" */ '@/views/Lecturer'),
        name: 'Lecturer',
        meta: {
          title: '任課老師',
          icon: 'teacher'
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
    meta: { title: '導師', icon: 'totur', roles: ['totur'] },
    children: [
      {
        path: 'index',
        name: 'TOTUR',
        component: _ => import(/* webpackChunkName: "totur" */ '@/views/Totur/Today'),
        meta: {
          title: '今日出缺'
        }
      },
      {
        path: 'statistics',
        name: 'Statistics',
        redirect: '/totur/index/query',
        component: _ => import(/* webpackChunkName: "totur" */ '@/views/Totur'),
        meta: {
          title: '缺曠統計'
        },
        children: [
          {
            path: 'query',
            component: _ => import(/* webpackChunkName: "totur" */ '@/views/Totur/Statistics/Query'),
            name: 'Query',
            meta: {
              title: '查詢資料'
            }
          },
          {
            path: 'rank',
            component: _ => import(/* webpackChunkName: "totur" */ '@/views/Totur/Statistics/Rank'),
            name: 'Rank',
            meta: {
              title: '缺曠排名'
            }
          },
          {
            path: 'conduct',
            component: _ => import(/* webpackChunkName: "totur" */ '@/views/Totur/Statistics/Conduct'),
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
        component: _ => import(/* webpackChunkName: "totur" */ '@/views/Totur'),
        meta: {
          title: '家長連繫'
        },
        children: [
          {
            path: 'fill-record',
            component: _ => import(/* webpackChunkName: "totur" */ '@/views/Totur/Complaint/Fill'),
            name: 'FillRecord',
            meta: {
              title: '填寫紀錄'
            }
          },
          {
            path: 'query-record',
            component: _ => import(/* webpackChunkName: "totur" */ '@/views/Totur/Complaint/Query'),
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
    redirect: '/admin-staff/edit',
    meta: { title: '行政人員', icon: 'admin', roles: ['staff'] },
    children: [
      {
        path: 'edit',
        component: _ => import(/* webpackChunkName: "staff" */ '@/views/Staff/Edit'),
        name: 'EDIT',
        meta: {
          title: '查詢修改'
        }
      },
      {
        path: 'copy',
        component: _ => import(/* webpackChunkName: "staff" */ '@/views/Staff/Copy'),
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
    meta: { title: '學生', icon: 'student', roles: ['student'] },
    children: [
      {
        path: 'index',
        component: _ => import(/* webpackChunkName: "student" */ '@/views/Student/Query'),
        name: 'StudentQuery',
        meta: {
          title: '出勤資料'
        }
      },
      {
        path: 'computed',
        component: _ => import(/* webpackChunkName: "student" */ '@/views/Student/Computed'),
        name: 'ComputedScore',
        meta: {
          title: '操行計算'
        }
      }
    ]
  },
  {
    path: '/copy',
    component: _ => import('@/components/Copy'),
    hidden: true,
    children: [
      {
        path: 'download',
        component: _ => import(/* webpackChunkName: "copy" */ '@/views/Staff/Copy/download.vue'),
        name: 'CopyDownload'
      },
      {
        path: 'complaint',
        component: _ => import(/* webpackChunkName: "copy" */ '@/views/Totur/Complaint/Query/Copy.vue'),
        name: 'ComplaintCopy'
      }
    ]
  }
  // { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  routes: constRoutes
})

export default router
