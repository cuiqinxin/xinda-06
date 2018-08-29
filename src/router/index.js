// import Vue from 'vue'
// import Router from 'vue-router'
// import NotFoundComponent from '@/components/NotFoundComponent'    //@ => ..
// import Login from '@/views/Login'    //@ => ..
// import Zhuce from '@/views/Zhuce'    //@ => ..
// import Forget from '@/views/Forget'
// import Quit from '@/views/Quit'
// import Tests from '@/views/Tests'
// import Member from '@/views/Member'
// import Memberindex from '@/views/Memberindex'
// import Memberorder from '@/views/Memberorder'
import Orderphone from '@/views/orderphone'
// import Memberassess from '@/views/Memberassess'
// import Memberinstall from '@/views/Memberinstall'
// import Header from '@/components/Header'
// import aap from '@/views/aap'
// import production from '@/views/production'
// import register from '@/views/register'
// import Outter from '@/views/Outter'
import Shop from '@/views/shop'
import Shopmobile from '@/views/shopmobile'
// import dianpumobile from '@/views/dianpumobile'
// import rScroll from '@/views/rScroll'
// import rScroll from '@/components/rScroll'
// import loading from '@/views/loading'
// import Join from '@/views/Join'
import Dianpu from '@/components/dianpu'
// import Page from '@/components/Page'
// import p_all from '@/views/p_all'
// import juh from '@/views/juh'
// import Shopin from '@/views/shopin'

// import shoppingcart from '@/views/shoppingcart'
// import pay from '@/views/pay'
// import goodsdetail from '@/views/goodsdetail'
// import payfailed from '@/views/payfailed'
// import paysuccess from '@/views/paysuccess'
// import Index1 from '@/views/Index1'

// import List from '@/views/List'
// Vue.use(Router)
import axios from 'axios'
import qs from 'qs'

import newVue from '../main'
import { resolve } from 'path';


const  router = new VueRouter({       //module.expotrs={}

  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/page',
      name: 'Page',
      // component: Page
      component: resolve=> require(['@/components/Page'],resolve)
    },
    {
      path: '/outter',
      name: 'Outter',
      // component: Outter,
      component: resolve=> require(['@/views/Outter'],resolve),
      children:[
        {
          path: 'login',
          name: 'Login',
          // component: Login
          component: resolve=> require(['@/views/Login'],resolve)
        },
        {
          path: 'zhuce',
          name: 'Zhuce',
          // component: Zhuce
          component: resolve=> require(['@/views/Zhuce'],resolve)
        },
        {
          path: 'forget',
          name: 'Forget',
          // component: Forget
          component: resolve=> require(['@/views/Forget'],resolve)
        }
      ]
    },

    {
      path: '/header',
      name: 'Header',
      alias: '/',         //起一个别名
      // component: Header,
      component: resolve=> require(['@/components/Header'],resolve),
      children: [
        {
        path: 'aap',
        name: 'aap',
        // component: aap
        component: resolve=> require(['@/views/aap'],resolve),
        },
        {
          path: 'p_all',
          name: 'p_all',
          // component: p_all
          component: resolve=> require(['@/views/p_all'],resolve),
        },
        {
          path: 'join',
          name: 'Join',
          // component: Join
          component: resolve=> require(['@/views/Join'],resolve),
        },
        {
          path: 'shop',
          name: 'Shop',
          component: Shop,
          // component: resolve=> require(['@/views/Shop'],resolve),
        },
        {
          path: 'shopmobile',
          name: 'Shopmobile',
          component: Shopmobile,
          // component: resolve=> require(['@/views/Shopmobile'],resolve),
        },
        {
          path: 'dianpumobile',
          name: 'dianpumobile',
          // component: dianpumobile,
          component: resolve=> require(['@/views/dianpumobile'],resolve),
        },

        {
          path: 'dianpu',
          name: 'Dianpu',
          component: Dianpu
          // component: resolve=> require(['@/components/Dianpu'],resolve),
        },
        {
          path: 'list',
          name: 'List',
          // component: List
          component: resolve=> require(['@/views/List'],resolve),
        },
        {
          path: 'production',
          name: 'production',
          // component: production
          component: resolve=> require(['@/views/production'],resolve),
        },
        {
          path: 'register',
          name: 'register',
          // component: register
          component: resolve=> require(['@/views/register'],resolve),
        },
        {
          path: 'index1',
          name: 'Index1',
          // component: Index1,
          component: resolve=> require(['@/views/Index1'],resolve),
          alias: '',           //别名
        },
        {
          path: 'shoppingcart',
          name: 'shoppingcart',
          // component: shoppingcart
          component: resolve=> require(['@/views/shoppingcart'],resolve),
        },
        {
          path: 'pay',
          name: 'pay',
          // component: pay,

          component: resolve=> require(['@/views/pay'],resolve),
          beforeEnter: (to, from, next) => {
            if(from.name==="shoppingcart"){
              next();
            }else if(from.name==="payfailed"){
              next();
            }else if(from.name==="Memberorder"){
              next();
            }else{next({path:"/"})}
          }
        },
        {
          path: 'payfailed',
          name: 'payfailed',
          // component: payfailed
          component: resolve=> require(['@/views/payfailed'],resolve),
          beforeEnter: (to, from, next) => {
            if(from.name==="pay"){
              next();
            }else{next({path:"/"})}
          }
        },
        {
          path: 'paysuccess',
          name: 'paysuccess',
          // component: paysuccess
          component: resolve=> require(['@/views/paysuccess'],resolve),
          beforeEnter: (to, from, next) => {
            if(from.name==="pay"){
              next();
            }else{next({path:"/"})}
          }
        },
        {
          path: 'goodsdetail',
          name: 'goodsdetail',
          // component: goodsdetail
          component: resolve=> require(['@/views/goodsdetail'],resolve),
        },
        {
          path: 'member',
          name: 'Member',
          // component: Member,
          component: resolve=> require(['@/views/Member'],resolve),
          children:[
            {
              path: 'memberorder',
              name: 'Memberorder',
              // component: Memberorder
              component: resolve=> require(['@/views/Memberorder'],resolve),
            },
            {
              path: 'orderphone',
              name: 'orderphone',
              component: Orderphone
            },
            {
              path: 'memberassess',
              name: 'Memberassess',
              // component: Memberassess
              component: resolve=> require(['@/views/Memberassess'],resolve),
            },
            {
              path: 'memberinstall',
              name: 'Memberinstall',
              // component: Memberinstall
              component: resolve=> require(['@/views/Memberinstall'],resolve),
            },
          ]
        },
        // {
        //   path: '/rScroll',
        //   name: 'rScroll',
        //   component: rScroll,
        // },
        {
          path: '/loading',
          name: 'loading',
          // component: loading,
          component: resolve=> require(['@/views/loading'],resolve),
        },
        {
          path: '/memberindex',
          name: 'Memberindex',
          // component: Memberindex,
          component: resolve=> require(['@/views/Memberindex'],resolve),
        },
        {
          path: '/quit',
          name: 'Quit',
          // component: Quit
          component: resolve=> require(['@/views/Quit'],resolve),
        },
      ]
    },
    {
      path: '/tests',
      name: 'Tests',
      // component: Tests
      component: resolve=> require(['@/views/Tests'],resolve),
    },
    {
      path: '/juh',
      name: 'juh',
      // component: juh
      component: resolve=> require(['@/views/juh'],resolve),
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


// 全局路由守卫
router.beforeEach((to, from, next) => {
  const nextRoute = ['shoppingcart',  'Memberorder','pay', 'payfailed', 'paysuccess',  'Memberinstall', 'Memberindex', 'Memberassess', 'orderphone'];
  // const nextRoute1= [];
 
  axios.post(
    "/xinda-api/sso/login-info",
    qs.stringify({})
  ).then(function (data) {
    if (data.data.status == 0) {
      if (nextRoute.indexOf(to.name) >= 0) {
        next({ name: 'Login', query:{pan:123}, });
      } 
      // else if(nextRoute1.indexOf(to.name) >= 0){
      //   next({path:'/'});
      // }
      else{
        next();
      }
    } 
    else if (data.data.status == 1 && to.name =='Login') {
      next({ path: '/' });
    }
    else{next()}
  })
});


export default router;
