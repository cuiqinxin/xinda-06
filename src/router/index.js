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
import Datang from '@/views/datang'
import Chanpinx from '@/views/chanpinx'
import Shop from '@/views/shop'
import Join from '@/views/Join'
import Dianpu from '@/components/dianpu'
import Page from '@/components/Page'

// import Shopin from '@/views/shopin'


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
          alias: '',           //别名
          component: production
        },
        {
          path: 'register',
          name: 'register',
          component: register
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
  ]
})
