import Vue from 'vue'
import Router from 'vue-router'
import Public from '@/components/Public'    //@ => ..
import NotFoundComponent from '@/components/NotFoundComponent'    //@ => ..
import Test from '@/components/Test'    //@ => ..
import Login from '@/views/Login'    //@ => ..
import Zhuce from '@/views/Zhuce'    //@ => ..
import Forget from '@/views/Forget'
import Quit from '@/views/Quit'
import Tests from '@/views/Tests'
import Member from '@/views/Member'
import Memberindex from '@/views/Memberindex'
import Memberorder from '@/views/Memberorder'
import Ordertest from '@/views/ordertest'
import Memberassess from '@/views/Memberassess'
import Memberinstall from '@/views/Memberinstall'
import Header from '@/components/Header'
import production from '@/views/production'
import register from '@/views/register'
import Outter from '@/views/Outter'
import Datang from '@/views/datang'
import Chanpinx from '@/views/chanpinx'
import Shop from '@/views/shop'
import Shopmobile from '@/views/shopmobile'
import dianpumobile from '@/views/dianpumobile'
import Join from '@/views/Join'
import Dianpu from '@/components/dianpu'
import Page from '@/components/Page'
import p_all from '@/views/p_all'
// import Shopin from '@/views/shopin'

import shoppingcart from '@/views/shoppingcart'
import pay from '@/views/pay'
import goodsdetail from '@/views/goodsdetail'
import Index1 from '@/views/Index1'

import List from '@/views/List'
Vue.use(Router)


export default new Router({       //module.expotrs={}
  mode: 'history',        //新路由返回顶部，前进后退像浏览器的原生表现那样
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/datang',
      name: 'Datang',
      component: Datang
    },
  
    {
      path: '/page',
      name: 'Page',
      component: Page
    },
    {
      path: '/chanpinx',
      name: 'Chanpinx',
      component: Chanpinx
    },
    {
      path: '/outter',
      name: 'Outter',
      component: Outter,
      children:[
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'zhuce',
          name: 'Zhuce',
          component: Zhuce
        },
        {
          path: 'forget',
          name: 'Forget',
          component: Forget
        }
      ]
    },

    {
      path: '/header',
      name: 'Header',
      alias: '/',         //起一个别名
      component: Header,
      children: [
        {
          path: '/p_all',
          name: 'p_all',
          component: p_all
        },
        {
          path: 'join',
          name: 'Join',
          component: Join
        },
        {
          path: '/shop',
          name: 'Shop',
          component: Shop,
        },
        {
          path: '/shopmobile',
          name: 'Shopmobile',
          component: Shopmobile,
        },
        {
          path: '/dianpumobile',
          name: 'dianpumobile',
          component: dianpumobile,
        },
        {
          path: 'dianpu',
          name: 'Dianpu',
          component: Dianpu
        },
        {
          path: 'list',
          name: 'List',
          component: List
        },
        {
          path: 'production',
          name: 'production',
          component: production
        },
        {
          path: 'register',
          name: 'register',
          component: register
        },
        {
          path: 'index1',
          name: 'Index1',
          component: Index1,
          alias: '',           //别名
        },
        {
          path: 'shoppingcart',
          name: 'shoppingcart',
          component: shoppingcart
        },
        {
          path: 'pay',
          name: 'pay',
          component: pay
        },
        {
          path: 'goodsdetail',
          name: 'goodsdetail',
          component: goodsdetail 
        },
        {
          path: '/member',
          name: 'Member',
          component: Member,
          children:[
            {
              path: 'memberorder',
              name: 'Memberorder',
              component: Memberorder
            },
            {
              path: 'ordertest',
              name: 'ordertest',
              component: Ordertest
            },
            {
              path: 'memberassess',
              name: 'Memberassess',
              component: Memberassess
            },
            {
              path: 'memberinstall',
              name: 'Memberinstall',
              component: Memberinstall
            },
          ]
        },
        {
          path: '/memberindex',
          name: 'Memberindex',
          component: Memberindex,
        },
        {
          path: '/quit',
          name: 'Quit',
          component: Quit
        },
      ]
    },
    {
      path: '/tests',
      name: 'Tests',
      component: Tests
    },
    // {
    //   path:'/dianpu/:id',
    //   name:Dianpu,
    //   // component:requre('../componnents/B')
    // }
  
    // {
    //   path: '*',
    //   name: NotFoundComponent,
    //   component: NotFoundComponent
    // }
  ]
})
