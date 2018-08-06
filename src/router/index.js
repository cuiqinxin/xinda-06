import Vue from 'vue'
import Router from 'vue-router'
import Public from '@/components/Public'    //@ => ..
import Test from '@/components/Test'    //@ => ..
import Login from '@/views/Login'    //@ => ..
import Zhuce from '@/views/Zhuce'    //@ => ..
import Header from '@/components/Header'
import production from '@/views/production'
import register from '@/views/register'
import Outter from '@/views/Outter'
<<<<<<< HEAD
import Datang from '@/views/datang'
import Chanpinx from '@/views/chanpinx'
import Shop from '@/views/shop'
import Join from '@/views/Join'
import Dianpu from '@/components/dianpu'
import Page from '@/components/Page'

// import Shopin from '@/views/shopin'

=======
<<<<<<< HEAD
import shoppingcart from '@/views/shoppingcart'
import pay from '@/views/pay'

=======
import Index1 from '@/views/Index1'
import League from '@/views/League'
>>>>>>> add42605ab35b8895633db6261284044ddade4e5
>>>>>>> b3b0f9062b17b1de40fcc3a4bd1cef2cccff8276

Vue.use(Router)

export default new Router({       //module.expotrs={}
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
      path: '/join',
      name: 'Join',
      component: Join
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop,
      // children:[
      //   {
      //     path: 'shopin',
      //     name: 'shopin',
      //     component: Shopin
      //   },
      // ]
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
      ]
    },

    {
      path: '/header',
      name: 'Header',
      alias: '/',         //起一个别名
      component: Header,
      children: [
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
          path: 'league',
          name: 'League',
          component: League
        }
      ]
    },
    // {
    //   path:'/dianpu/:id',
    //   name:Dianpu,
    //   // component:requre('../componnents/B')
    // }
  
    // {
    //   path: '/dianpu',
    //   name: Dianpu,
    //   component: dianpu
    // }

    {
      path: '/shoppingcart',
      name: '/shoppingcart',
      component: shoppingcart
    },
    {
      path: '/pay',
      name: '/pay',
      component: pay
    }

  ]
})
