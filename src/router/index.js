import Vue from 'vue'
import Router from 'vue-router'
import Public from '@/components/Public'    //@ => ..
import Test from '@/components/Test'    //@ => ..
import Login from '@/views/Login'    //@ => ..
import Zhuce from '@/views/Zhuce'    //@ => ..
import Forget from '@/views/Forget'
import Quit from '@/views/Quit'
import Tests from '@/views/Tests'
import Member from '@/views/Member'
import Memberindex from '@/views/Memberindex'
import Memberorder from '@/views/Memberorder'
import Memberassess from '@/views/Memberassess'
import Memberinstall from '@/views/Memberinstall'
import Header from '@/components/Header'
import production from '@/views/production'
import register from '@/views/register'
import Outter from '@/views/Outter'
<<<<<<< HEAD
import shoppingcart from '@/views/shoppingcart'
import pay from '@/views/pay'

=======
import Index1 from '@/views/Index1'
import League from '@/views/League'
>>>>>>> add42605ab35b8895633db6261284044ddade4e5

Vue.use(Router)

export default new Router({       //module.expotrs={}
  routes: [
    {
      path: '/test',
      name: 'Test',
      component: Test
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
<<<<<<< HEAD
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
    {
      path: '/tests',
      name: 'Tests',
      component: Tests
    }
=======
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: register
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

>>>>>>> b3b0f9062b17b1de40fcc3a4bd1cef2cccff8276
  ]
})
