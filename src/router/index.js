// import Vue from 'vue'
// import Router from 'vue-router'
// import NotFoundComponent from '@/components/NotFoundComponent'    //@ => ..
import Login from '@/views/Login'    //@ => ..
import Zhuce from '@/views/Zhuce'    //@ => ..
import Forget from '@/views/Forget'
import Quit from '@/views/Quit'
import Tests from '@/views/Tests'
import Member from '@/views/Member'
import Memberindex from '@/views/Memberindex'
import Memberorder from '@/views/Memberorder'
import Orderphone from '@/views/orderphone'
import Memberassess from '@/views/Memberassess'
import Memberinstall from '@/views/Memberinstall'
import Header from '@/components/Header'
import aap from '@/views/aap'
import production from '@/views/production'
import register from '@/views/register'
import Outter from '@/views/Outter'
import Datang from '@/views/datang'
import Chanpinx from '@/views/chanpinx'
import Shop from '@/views/shop'
import Shopmobile from '@/views/shopmobile'
import dianpumobile from '@/views/dianpumobile'
// import rScroll from '@/views/rScroll'
// import rScroll from '@/components/rScroll'
import loading from '@/views/loading'
import Join from '@/views/Join'
import Dianpu from '@/components/dianpu'
import Page from '@/components/Page'
import p_all from '@/views/p_all'
import juh from '@/views/juh'
// import Shopin from '@/views/shopin'

import shoppingcart from '@/views/shoppingcart'
import pay from '@/views/pay'
import goodsdetail from '@/views/goodsdetail'
import payfailed from '@/views/payfailed'
import paysuccess from '@/views/paysuccess'
import Index1 from '@/views/Index1'

import List from '@/views/List'
// Vue.use(Router)
import axios from 'axios'
import qs from 'qs'

import newVue from '../main'


const  router = new VueRouter({       //module.expotrs={}

  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/datang',
      name: 'Datang',
      component: Datang
    },
    {
      path: '/aap',
      name: 'aap',
      component: aap
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
              component: Memberassess
            },
            {
              path: 'memberinstall',
              name: 'Memberinstall',
              component: Memberinstall
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
          component: Quit
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
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  // console.log('navigation-guards');

  const nextRoute = ['Header', 'shoppingcart', 'pay'];

   // 判断是否登陆
   axios.post(
    "/xinda-api/sso/login-info",
    qs.stringify({})
    ).then(function(data){
    console.log(data,to.name,nextRoute.indexOf(to.name) >= 0);
    // 未登录状态；当路由到nextRoute指定页时，跳转至login
    if(data.data.status!=1 && nextRoute.indexOf(to.name) >= 0){
        newVue.$alert('您还未登录,点击 确定 跳转到登录页', '提示', {
          confirmButtonText: '确定',
        }).then(()=>{
          router.push({name:'Login'});

        }).catch(()=>{
          router.push({name:'Header'});
        });

        // var s = setTimeout(function(){
        //   num--;
        //   if(num == 0){
        //     that.a.app.$router.push({name:'Header'});
        //     clearInterval()
        //   }
        // },1000);

    }else if(data.data.status==1&&to.name === 'Login'){ // 已登录状态；当路由到login时，跳转至home
        router.push({ name: 'Header' });
    }

})
  next();
});


// function open() {
//   this.a.app.$alert('您还未登陆！', '提示', {
//     confirmButtonText: '确定',
//     callback: action => {

//     }
//   });
// }
export default router;
