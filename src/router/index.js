// import Vue from 'vue'
// import Router from 'vue-router'
const Page = ()=>import('@/components/Page');
const Outter = ()=>import('@/views/Outter');
const Login = ()=>import('@/views/Login');
const Zhuce = ()=>import('@/views/Zhuce');
const Forget = ()=>import('@/views/Forget');
const Header = ()=>import('@/components/Header');
const aap = ()=>import('@/views/aap');
const p_all = ()=>import('@/views/p_all');
const Join = ()=>import('@/views/Join');
const dianpumobile = ()=>import('@/views/dianpumobile');
const List = ()=>import('@/views/List');
const production = ()=>import('@/views/production');
const register = ()=>import('@/views/register');
const Index1 = ()=>import('@/views/Index1');
const shoppingcart = ()=>import('@/views/shoppingcart');
const pay = ()=>import('@/views/pay');
const payfailed = ()=>import('@/views/payfailed');
const paysuccess = ()=>import('@/views/paysuccess');
const goodsdetail = ()=>import('@/views/goodsdetail');
const Member = ()=>import('@/views/Member');
const Memberorder = ()=>import('@/views/Memberorder');
const Memberassess = ()=>import('@/views/Memberassess');
const Memberinstall = ()=>import('@/views/Memberinstall');
const loading = ()=>import('@/views/loading');
const Memberindex = ()=>import('@/views/Memberindex');
const Quit = ()=>import('@/views/Quit');
const Tests = ()=>import('@/views/Tests');
const juh = ()=>import('@/views/juh');
const NotFoundComponent = ()=>import('@/components/NotFoundComponent');
// import NotFoundComponent from '@/components/NotFoundComponent'    //@ => ..

import Orderphone from '@/views/orderphone'
import Shop from '@/views/shop'
import Shopmobile from '@/views/shopmobile'

import Dianpu from '@/components/dianpu'


// Vue.use(Router)
import axios from 'axios'
import qs from 'qs'

// import newVue from '../main'
// import { resolve } from 'path';


const  router = new VueRouter({       //module.expotrs={}

  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/page',
      name: 'Page',
      component: Page
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
          path: 'aap',
          name: 'aap',
          component: aap
        },
        {
          path: 'p_all',
          name: 'p_all',
          component: p_all
        },
        {
          path: 'join',
          name: 'Join',
          component: Join
        },
        {
          path: 'shop',
          name: 'Shop',
          component: Shop,
        },
        {
          path: 'shopmobile',
          name: 'Shopmobile',
          component: Shopmobile,
        },
        {
          path: 'dianpumobile',
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
          component: pay,
        },
        {
          path: 'payfailed',
          name: 'payfailed',
          component: payfailed
        },
        {
          path: 'paysuccess',
          name: 'paysuccess',
          component: paysuccess
        },
        {
          path: 'goodsdetail',
          name: 'goodsdetail',
          component: goodsdetail
        },
        {
          path: 'member',
          name: 'Member',
          component: Member,
          children:[
            {
              path: 'memberorder',
              name: 'Memberorder',
              component: Memberorder
            },
            {
              path: 'orderphone',
              name: 'orderphone',
              component: Orderphone
            },
            {
              path: 'memberassess',
              name: 'Memberassess',
              component: Memberassess,
            },
            {
              path: 'memberinstall',
              name: 'Memberinstall',
              component: Memberinstall
            },
          ]
        },
        {
          path: '/loading',
          name: 'loading',
          component: loading,
        },
        {
          path: '/memberindex',
          name: 'Memberindex',
          component: Memberindex,
        },
        {
          path: '/quit',
          name: 'Quit',
          component: Quit,
        },
      ]
    },
    {
      path: '/tests',
      name: 'Tests',
      component: Tests
    },
    {
      path: '/juh',
      name: 'juh',
      component: juh
    },
  ]
})



// 全局路由守卫
router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  console.log('navigation-guards');
  const nextRoute = ['Index1', 'shoppingcart', 'pay','payfailed','paysuccess','Memberorder','Memberinstall','Memberindex','Memberassess','orderphone'
];

   // 判断是否登陆
   axios.post(
    "/xinda-api/sso/login-info",
    qs.stringify({})
    ).then(function(data){
    // console.log(data,to.name,nextRoute.indexOf(to.name) >= 0);
    // 未登录状态；当路由到nextRoute指定页时，跳转至login
    if(data.data.status==0){
      // console.log(111,nextRoute.indexOf(to.name),to.name)
      if(nextRoute.indexOf(to.name) >= 0){
        // console.log(222)
        router.push({name:'Login' ,query:{pan:Math.random()+1}});
        // console.log(333)
        // next();
      } else{
        // console.log(11111)
        // next();

      }

    }else if(data.data.status==1&&to.name === 'Login'){ // 已登录状态；当路由到login时，跳转至home
        router.push({ name: 'Index1' });
        // next();
    }
    // else if(data.data.status!=1&&to.name === 'Login'){
    //     router.push({ name: 'Login' });
    // }
    next();
})
// next();
});

export default router;
