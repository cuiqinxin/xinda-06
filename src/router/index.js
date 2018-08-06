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
  ]
})
