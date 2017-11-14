import Vue from 'vue'
import Router from 'vue-router'
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * dropdown : if `dropdown:false` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
const login = r => require.ensure([], () => r(require('@/views/login/index')), 'login')
const dashboard = r => require.ensure([], () => r(require('@/views/dashboard/index')), 'dashboard')
const page_404 = r => require.ensure([], () => r(require('@/views/404')), '404')

const form = r => require.ensure([], () => r(require('@/views/page/form')), 'form')
const table = r => require.ensure([], () => r(require('@/views/table/index')), 'table')
const store = r => require.ensure([], () => r(require('@/views/store/store')), 'store')
const show = r => require.ensure([], () => r(require('@/views/show/show')), 'show')

export const constantRouterMap = [
  {
    path: '/login',
    component: login,
    hidden: true
  },
  {
    path: '/404',
    component: page_404,
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: dashboard
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: 'Example',
    icon: 'zujian',
    dropdown: true,
    children: [
      { path: 'index',
        name: 'Form',
        icon: 'zonghe',
        component: form
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    icon: 'tubiao',
    dropdown: false,
    children: [{
      path: 'index',
      name: 'Table',
      component: table,
      meta: { role: ['admin'] }
    }]
  },
  // 门店地址
  {
    path: '/store',
    component: Layout,
    redirect: '/store/store',
    icon: 'tubiao',
    dropdown: false,
    children: [{
      path: 'store',
      name: '门店地址',
      component: store,
      meta: { role: ['admin'] }
    }]
  },
  // 我秀管理
  {
    path: '/show',
    component: Layout,
    redirect: '/show/show',
    icon: 'tubiao',
    dropdown: false,
    children: [{
      path: 'show',
      name: '我秀管理',
      component: show,
      meta: { role: ['admin'] }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
