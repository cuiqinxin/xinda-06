// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'         //var Vue = require('./Vue')
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';


Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.ajax = axios;
Vue.prototype.qs = qs;

// router.afterEach((to,from,next) => {
//   window.scrollTo(0,0);
// })

/* eslint-disable no-new */
 new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data : {

  }
})

