import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权
import { getInfo } from '@/api/login'
import { asyncRouterMap } from '@/router/index'

const whiteList = ['/login']
// router全局钩子
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 判断cookie中是否已经保存了登录态（token）
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.state.user.roles.length === 0) {
        new Promise((resolve, reject) => {
          // 根据token获取用户信息
          getInfo(store.state.user.token).then(res => {
            const data = res.data
            // 保存用户相关信息
            store.commit('user/SET_ROLES', { roles: data.role })
            store.commit('user/SET_NAME', { name: data.name })
            store.commit('user/SET_AVATAR', { avatar: data.avatar })
            resolve(res)
          }).catch(error => {
            reject(error)
          })
        }).then((res) => {
          const roles = res.data.role
          // 根据角色过滤相关路由，形成新的路由表
          return new Promise((resolve, reject) => {
            let accessedRouters
            if (roles.indexOf('admin') >= 0) {
              accessedRouters = asyncRouterMap
            } else {
              accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
            }
            store.commit('permission/SET_ROUTERS', { routers: accessedRouters })
            resolve()
          })
        }).then(() => {
          router.addRoutes(store.state.permission.addRouters)
          next({ ...to })
        }).catch((err) => {
          console.log(err)
        })
      } else {
        next()
      }
    }
  } else {
    // 白名单过滤，实现页面重定向
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

// router全局钩子
router.afterEach(() => {
  NProgress.done() // 结束Progress
})

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    // 有路由元信息（meta）标签的，根据meta信息来过滤
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    // 如果没有元信息，则不做过滤，默认返回
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}
