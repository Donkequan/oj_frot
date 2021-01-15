import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/public',
    component: Layout,
    redirect: '/public/list',
    name: 'Public',
    meta: { title: 'question' },
    children: [
      {
        path: 'list',
        name: 'PublicQuestionList',
        component: () => import('@/views/public/all_list'),
        meta: { title: 'Public question' }
      },
      {
        path: 'practice/:id',
        name: 'PublicPractice',
        component: () => import('@/views/question/practice'),
        meta: { title: 'practice question' },
        hidden: true
      }
    ]
  },
  // 题目管理
  {
    path: '/question',
    component: Layout,
    redirect: '/question/list',
    name: 'Question',
    meta: { title: 'My Question' },
    children: [
      {
        path: 'list',
        name: 'QuestionList',
        component: () => import('@/views/question/list'),
        meta: { title: 'my question list' }
      },
      {
        path: 'create',
        name: 'QuestionCreate',
        component: () => import('@/views/question/form_layout'),
        meta: { title: 'add question' }
      },
      {
        path: 'edit/:id',
        name: 'QuestionEdit',
        component: () => import('@/views/question/form_layout'),
        meta: { title: 'edit Question' },
        hidden: true
      },
      {
        path: 'practice/:id',
        name: 'QuestionPractice',
        component: () => import('@/views/question/practice'),
        meta: { title: 'practice question' },
        hidden: true
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    name: 'Statistics',
    redirect: '/statistics/student_chart',
    meta: { title: 'Statistics' },
    children: [{
      path: 'student_chart',
      name: 'student_chart',
      meta: { title: 'student chart' },
      component: () => import('@/views/statistics/student_chart')
    },
    {
      path: 'question_chart',
      name: 'question_chart',
      meta: { title: 'question chart' },
      component: () => import('@/views/statistics/question_chart')
    },
    {
      path: 'answer_chart',
      name: 'answer_chart',
      meta: { title: 'answer chart' },
      component: () => import('@/views/statistics/answer_chart')
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
